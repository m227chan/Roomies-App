import React from 'react';
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

import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase";

const opacityValue = 0.9;

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

const Settings = (props) => {

  const { classes } = props;

  const onClickLogOut = async () => {
    await signOut(auth);
    history.push('/SignIn');
  }

  const mainMessage = (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Button color="inherit">
            <Link
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={() => history.push('/Room')}
            >
              <Typography variant="h6" color="inherit">
                Room
              </Typography>
            </Link>
          </Button>

          <Button color="inherit">
            <Link
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={() => history.push('/Calendar')}
            >
              <Typography variant="h6" color="inherit">
                Calendar
              </Typography>
            </Link>
          </Button>

          <Button color="inherit">
            <Link
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={() => history.push('/Expenses')}
            >
              <Typography variant="h6" color="inherit">
                Expenses
              </Typography>
            </Link>
          </Button>

          <Button color="inherit">
            <Link
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={() => history.push('/Grocery')}
            >
              <Typography variant="h6" color="inherit">
                Grocery
              </Typography>
            </Link>
          </Button>

        </Toolbar>
      </AppBar>

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
            Settings
          </Typography>

          <Button>
            <Link
              onClick={() => history.push('/SignIn')}
            >
              <Typography variant="h6">
                Leave Room *not implemented*
              </Typography>
            </Link>
          </Button>

          <br/>

          <Button>
            <Link
              onClick={() => history.push('/SignIn')}
            >
              <Typography variant="h6">
                Change Password *not implemented*
              </Typography>
            </Link>
          </Button>

          <br/>

          <Button>
            <Link
              onClick={onClickLogOut}
            >
              <Typography variant="h6">
                Sign Out
              </Typography>
            </Link>
          </Button>
          
          <br/>

          <Button>
            <Link
              onClick={() => history.push('/SignIn')}
            >
              <Typography variant="h6">
                Delete Account *not implemented*
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

export default withStyles(styles)(Settings);