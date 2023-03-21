import React, { useState, useEffect } from "react";
import "./Expense.css";
import {
  Button,
  Paper,
  Box,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import SideNav from "../CustomAppBar/sideNav";
import ExpenseTable from "./ExpenseTable.js";
import ExpenseDialog from "./AddExpenseDialog";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import ShortExchange from "./ShortExchange"

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

// Expenses component
const Expenses = () => {
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [shortExchangeList, setShortExchangeList] = useState([]);

  onAuthStateChanged(auth, (currUser) => {
    setUser(currUser);
  });


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getExpenseReport();
    getShortExchange();
  }, [open, user]);

  const getExpenseReport = () => {
    callAPIGetExpenseReport().then((res) => {
      var parsed = JSON.parse(res.express);
      setExpenses(parsed[4]);
    });
  };

  const getShortExchange = () => {
    callAPIShortExchange().then((res) => {
      var parsed = JSON.parse(res.express);
      setShortExchangeList(parsed[1]);
    });
  };

  const callAPIGetExpenseReport = async () => {
    // console.log("getExpenseReport called");
    const url = serverURL + "/api/getExpenseReport";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        firebaseUID: user.uid,
        justUser: false,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  };

  const callAPIShortExchange = async () => {
    const url = serverURL + "/api/shortExchange";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        firebaseUID: user.uid,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  };

  return (
    <>
      <SideNav />
      <Container class="container">
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Paper class="paper">
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={0}
                style={{ minHeight: "100vh" }}
                class="mainMessageContainer"
              >
                <Grid item>
                  <Typography variant={"h4"} align="left">
                    Expenses
                  </Typography>
                </Grid>

                <Grid item>
                  <ExpenseTable open={open} expenses={expenses} getExpenseReport={getExpenseReport}/>
                </Grid>

                <Grid item>
                  <Button variant="contained" onClick={handleClickOpen}>
                    Add Expense
                  </Button>
                  <ExpenseDialog open={open} handleClose={handleClose} />
                </Grid>

                <ShortExchange shortExchangeList={shortExchangeList}/>

              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default Expenses;
