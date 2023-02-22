import React, { useState } from 'react';
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
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import CustomAppBar from '../CustomAppBar';

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

const Grocery = (props) => {

  const { classes } = props;
  const user = auth.currentUser;
  const [item, setItem] = useState("");
  const [brand, setBrand] = useState("");
  const [store, setStore] = useState("");
  const [price, setPrice] = useState("");
  
  const [viewMine, setViewMine] = useState([]);

  const callApiAddGroceryItem = async () => {
    const url = serverURL + "/api/addGroceryItem";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        item: item,
        brand: brand,
        store: store,
        price: price,
        idRoomate: user.uid
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  }
  
  const onClickGroceryItem = async () => {
    callApiAddGroceryItem();
  }

  const callViewGrocery = async () => {
    const url = serverURL + "/api/viewGrocery";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        idRoomate: user.uid
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  }

  const onClickViewGrocery = async () => {
    console.log(user.uid);
    callViewGrocery()
        .then(res => {
            console.log("callApiGetSearchMovie returned: ", res)
            var parsed = JSON.parse(res.express);
            console.log("callApiGetSearchMovie parsed: ", parsed);
            setViewMine(parsed);
    })
  } 

  const mainMessage = (
    <Box sx={{ flexGrow: 1 }}>

      <CustomAppBar />

      <Grid
        container
        spacing={0}
        direction="column"
        justify="flex-start"
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
            Add Grocery Items
          </Typography>
          <TextField
            variant="outlined"
            label="Item"
            onChange={(event) => {
              setItem(event.target.value)
            }} />
          <h3 />
          <TextField
            variant="outlined"
            label="Brand"
            onChange={(event) => {
              setBrand(event.target.value)
            }} />
          <h3 />
          <TextField
            variant="outlined"
            label="Store"
            onChange={(event) => {
              setStore(event.target.value)
            }} />
          <h3 />
          <TextField
            variant="outlined"
            label="Price"
            onChange={(event) => {
              setPrice(event.target.value)
            }} />
          <h3 />
          <Button>
            <Link
              onClick={onClickGroceryItem}
            >
              <Typography variant="h6">
                Add
              </Typography>
            </Link>
          </Button>
          <Typography
            variant={"h3"}
            className={classes.mainMessage}
            align="flex-start"
          >
            My Grocery Items
          </Typography>
          <Button>
            <Link
              onClick={onClickViewGrocery}
            >
              <Typography variant="h6">
                Refresh
              </Typography>
            </Link>
          </Button>
          
        </Grid>
        <h1>---</h1>
        <Grid item>
          <Typography
            variant={"h3"}
            className={classes.mainMessage}
            align="flex-start"
          >
            Grocery 2
          </Typography>

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

export default withStyles(styles)(Grocery);