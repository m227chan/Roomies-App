import React, { useState } from "react";
import "./Expense.css";
import { Button, Paper, Box, Grid, Typography } from "@mui/material";
import SideNav from "../CustomAppBar/sideNav";
import { Container } from "@material-ui/core";
import ExpenseTable from "./ExpenseTable.js";
import ExpenseDialog from "./AddExpenseDialog";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
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
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <SideNav />
      <Container class="container">
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
                <Button variant="outlined" onClick={handleClickOpen}>
                  Add Expense
                </Button>
                <ExpenseDialog open={open} handleClose={handleClose} />
              </Grid>
              <Grid item>
                <ExpenseTable open={open} />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Expenses;
