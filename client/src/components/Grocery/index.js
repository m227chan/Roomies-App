import React, { useState } from 'react';
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import CustomAppBar from '../CustomAppBar';

import { onAuthStateChanged } from "firebase/auth";
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

export const filterGroceryGroupBy = (group, filterBy, input) => {
  if (filterBy === 'item') {
    return group.filter(item => item.item === input);
  } else if (filterBy === 'brand') {
    return group.filter(item => item.brand === input);
  } else if (filterBy === 'store') {
    return group.filter(item => item.store === input);
  } else if (filterBy === 'price') {
    return group.filter(item => item.price === input);
  } else {
    throw new Error("Invalid input");
  }
}

export const calculateTotal = (price, quantity) => {
  try {
    if (isNaN(price) || isNaN(quantity)) {
      return null;
    }
    const total = (price * quantity).toString();
    return 'Total Cost is $' + total + '.';

  } catch (e) {
    return null;
  }
}

const Grocery = (props) => {

  const { classes } = props;
  // const user = auth.currentUser;
  const [item, setItem] = useState("");
  const [brand, setBrand] = useState("");
  const [store, setStore] = useState("");
  const [price, setPrice] = useState("");

  const [viewMine, setViewMine] = useState([]);
  const [quantity, setQuantiy] = useState("");
  const [viewGroup, setGroup] = useState([]);

  const [user, setUser] = useState({});
  const [submit, setSubmit] = useState(false);

  onAuthStateChanged(auth, (currUser) => {
    setUser(currUser);
  });

  React.useEffect(() => {
    callViewGrocery()
      .then(res => {
        console.log("callApiViewGrocery returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiviewGrocery parsed: ", parsed);
        setViewMine(parsed);

        setSubmit(false);
        console.log(viewGroup);
      })
  }, [submit, user]);

  React.useEffect(() => {
    callViewGroupGrocery()
      .then(res => {
        console.log("callApiViewGroupGrocery returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiviewGroupGrocery parsed: ", parsed);
        setGroup(parsed);
        setSubmit(false);
      })
  }, [submit, user]);

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
    setSubmit(true);
    callApiAddGroceryItem();
  }

  const today = async () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth(); 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
      dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 
    return yyyy+'-'+mm+'-'+dd;
  }

  const callApiDeleteGroceryItem = async (i) => {
    const url = serverURL + "/api/deleteGroceryItem";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        id: i
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  }

  const onClickDeleteGroceryItem = async (i) => {
    setSubmit(true);
    callApiDeleteGroceryItem(i);
  }

  const callApiDeleteGrocery = async (i) => {
    const url = serverURL + "/api/deleteGrocery";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        id: i
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  }

  const onClickDeleteGrocery = async (i) => {
    setSubmit(true);
    callApiDeleteGrocery(i);
  }

  const onClickPurchaseGrocery = async (i) => {
    setSubmit(true);
    callApiPurchase(i);
    callApiDeleteGrocery(i.id);
  }

  const callApiPurchase = async (i) => {
    const url = serverURL + "/api/addExpense";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        amount: i.price,
        spender: user.uid,
        debtor: i.idRoomate,
        tag: "Grocery",
        comment: i.brand + " " + i.item + " from " + i.store,
        date: today()
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  }

  const callApiAddGrocery = async (x, y, z) => {
    const url = serverURL + "/api/addGrocery";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        idRoomate: x,
        idGroceryItem: y,
        Quantity: z
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  }

  const onClickAddGrocery = async (x, y, z) => {
    setSubmit(true);
    callApiAddGrocery(x, y, z);
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

  const callViewGroupGrocery = async () => {
    const url = serverURL + "/api/viewGroupGrocery";
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
          >
            Add Grocery Item Preset
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
          >
            My Grocery Items
          </Typography>
          {viewMine.map((i) => {
            return (
              <div>
                <Typography variant='p'>Item: {i.item}</Typography>
                <br />
                <Typography variant='p'>Brand: {i.brand}</Typography>
                <br />
                <Typography variant='p'>Store: {i.store}</Typography>
                <br />
                <Typography variant='p'>Price: {i.price}</Typography>
                <br />
                <TextField
                  variant="outlined"
                  label="Quantity"
                  size="small"
                  onChange={(event) => {
                    setQuantiy(event.target.value)
                  }} />
                <Button onClick={() => { onClickAddGrocery(i.idRoomate, i.id, quantity) }}>Add</Button>
                <Button onClick={() => { onClickDeleteGroceryItem(i.id) }}>Delete</Button>
                <br />
              </div>
            )
          })}
        </Grid>

        <h1>---</h1>

        <Typography
          variant={"h3"}
          className={classes.mainMessage}
        >
          Group Grocery's
        </Typography>
        {viewGroup.map((i) => {
          return (
            <div>
              <Typography variant='p'>Item: {i.item}</Typography>
              <br />
              <Typography variant='p'>Brand: {i.brand}</Typography>
              <br />
              <Typography variant='p'>Store: {i.store}</Typography>
              <br />
              <Typography variant='p'>Price: {i.price}</Typography>
              <br />
              <Typography variant='p'>Quantity: {i.Quantity}</Typography>
              <br />
              <Typography variant='p'>{calculateTotal(i.price, i.Quantity)}</Typography>
              <br />
              <Button onClick={() => { onClickPurchaseGrocery(i) }}>Purchased</Button>
            </div>
          )
        })}
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

