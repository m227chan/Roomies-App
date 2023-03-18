import React, { useState } from "react";
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
                  <ExpenseTable open={open} />
                </Grid>

                <Grid item>
                  <Button variant="contained" onClick={handleClickOpen}>
                    Add Expense
                  </Button>
                  <ExpenseDialog open={open} handleClose={handleClose} />
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
