import React, { useState } from "react";
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
              <ExpenseTable />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default Expenses;