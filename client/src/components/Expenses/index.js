import React, { useState, useEffect } from "react";
import "./expense.css";
import {
  Button,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import CustomAppBar from "../CustomAppBar";
import ExpenseTable from "./ExpenseTable.js";
import ExpenseDialog from "./ExpenseDialog";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

// Expenses component
const Expenses = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [user, setUser] = useState({});
  const [expenses, setExpenses] = useState([]);

  onAuthStateChanged(auth, (currUser) => {
    setUser(currUser);
  });

  useEffect(() => {
    getExpenseReport();
  }, [user, open]);

  const callAPIGetExpenseReport = async () => {
    console.log("getExpenseReport called");
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

  const getExpenseReport = () => {
    callAPIGetExpenseReport().then((res) => {
      var parsed = JSON.parse(res.express);
      setExpenses(parsed[4]);
    });
  };

  return (
    <div>
      <Paper class="paper">
        <Box sx={{ flexGrow: 1 }}>
          <CustomAppBar />
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
              <Button variant="outlined" onClick={handleClickOpen}>
                Add Expense
              </Button>
              <ExpenseDialog open={open} handleClose={handleClose} />
            </Grid>
            <Grid item>
              <ExpenseTable expenses={expenses} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default Expenses;