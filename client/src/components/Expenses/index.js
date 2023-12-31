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
import ShortExchange from "./ShortExchange";
import DisplayRoomates from "../Room/DisplayRoomates";

const serverURL = "https://roomies-app.netlify.app"; //enable for dev mode

// Expenses component
const Expenses = () => {
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [shortExchangeList, setShortExchangeList] = useState([]);
  const [roomateData, setRoomateData] = useState([]);

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
    if (user) {
      getExpenseReport();
      getShortExchange();
      getRoomPageInfo();
    } else {
      onAuthStateChanged(auth, (currUser) => {
        setUser(currUser);
      });
    }
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
      console.log(parsed[1]);
      setShortExchangeList(parsed[1]);
    });
  };

  const getRoomPageInfo = () => {
    callApiGetRoomPageInfo().then((res) => {
      var parsed = JSON.parse(res.express);
      setRoomateData(parsed);
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

  const callApiGetRoomPageInfo = async () => {
    const url = serverURL + "/api/getRoomPageInfo";
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
      <Grid>
        <SideNav />
      </Grid>
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
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  item
                >
                  <Typography variant={"h4"} align="left">
                    Expenses
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    class="leave-room-btn"
                  >
                    <Typography variant="p">Add an expense</Typography>
                  </Button>
                </Grid>
                <br />
                <ShortExchange
                  roomateData={roomateData}
                  shortExchangeList={shortExchangeList}
                />
                <br />
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  item
                >
                  {/* <Button variant="contained" onClick={handleClickOpen}>
                    Add Expense
                  </Button> */}
                  <ExpenseDialog open={open} handleClose={handleClose} />
                </Grid>
                <br />
                <Grid item>
                  <ExpenseTable
                    open={open}
                    expenses={expenses}
                    getExpenseReport={getExpenseReport}
                    getShortExchange={getShortExchange}
                    getRoomPageInfo={getRoomPageInfo}
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default Expenses;
