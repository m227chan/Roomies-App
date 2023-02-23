import React, { useState, useEffect } from 'react';
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import history from '../Navigation/history';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import CustomAppBar from '../CustomAppBar';

import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";

const opacityValue = 0.9;

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const theme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: "#000000"
    },
    primary: {
      main: "#7a1a06",
    },
    secondary: {
      main: "#ffcb52",
    },
  },
});

const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "15vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },

});

const Expenses = (props) => {

  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState({});

  const { classes } = props;

  onAuthStateChanged(auth, (currUser) => {
    setUser(currUser);
  });

  const callAPIGetExpenseReport = async () => {
    const url = serverURL + "/api/getExpenseReport";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        user: user.uid,
        sort: '',
        dateStart: '',
        dateStart: '',
        dateEnd: '',
        tag: '',
        spenderID: '',
        debtorID: '',
        justUser: ''
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  }

  const getExpenseReport = () => {
    callAPIGetExpenseReport()
      .then(res => {
        var parsed = JSON.parse(res.express);
        setExpenses(parsed[4]);
      })
  }

  const onClick = async () => {
    getExpenseReport();
    console.log(expenses);
  }

  const mainMessage = (
    <Box sx={{ flexGrow: 1 }}>

      <CustomAppBar />

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="flex-start"
        style={{ minHeight: '100vh' }}
        className={classes.mainMessageContainer}
      >
        <Grid item>
          <Typography
            variant={"h3"}
            className={classes.mainMessage}
            align="flex-start"
          >
            Expenses
          </Typography>

          <Button>
            <Link
              onClick={onClick}
            >
              <Typography variant="h6">
                click
              </Typography>
            </Link>
          </Button>
          
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Paper className={classes.paper}>
          {mainMessage}
        </Paper>
      </div>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(Expenses);