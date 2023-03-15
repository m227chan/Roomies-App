import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import "firebase/auth";

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

// export const filterExpensesBy = (expenses, filterBy, input) => {
//   if (filterBy === 'tag' && (input === 'Food' || input === 'Loan'
//     || input === 'Groceries' || input === 'Activity'
//     || input === 'Paid Back' || input === 'Other'
//     || input === 'Consequences')) {
//     return expenses.filter(expense => expense.tag === input);
//   } else if (filterBy === 'idSpender') {
//     return expenses.filter(expense => expense.idSpender === input);
//   } else if (filterBy === 'idDebtor') {
//     return expenses.filter(expense => expense.idDebtor === input);
//   } else if (filterBy === 'amount') {
//     return expenses.filter(expense => expense.amount === input);
//   } else {
//     throw new Error("Invalid input");
//   }
// }

const ExpenseTable = ({ open }) => {

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

  const handleEditClick = (expense) => {
    console.log(expense);
    getExpenseReport();
  };

  const handleDeleteClick = (expense) => {
    callAPIDeleteExpense(expense.ExpenseID);
    console.log(expense.ExpenseID);
    setTimeout(() => {
      getExpenseReport();
    }, 500);
  };

  const callAPIDeleteExpense = async (ExpenseID) => {
    console.log("getExpenseReport called");
    const url = serverURL + "/api/deleteExpense";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        ExpenseID: ExpenseID,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">

        <TableHead>
          <TableRow>
            <TableCell
              align="right"
              style={{ fontSize: "18px" }}
            >
              <b>Payer</b>
            </TableCell>

            <TableCell
              align="right"
              style={{ fontSize: "18px" }}
            >
              <b>Payee</b>
            </TableCell>

            <TableCell
              align="right"
              style={{ fontSize: "18px" }}
            >
              <b>Amount</b>
            </TableCell>

            <TableCell
              align="right"
              style={{ fontSize: "18px" }}
            >
              <b>Tag</b>
            </TableCell>

            <TableCell
              align="right"
              style={{ fontSize: "18px" }}
            >
              <b>Description</b>
            </TableCell>

            <TableCell
              align="right"
              style={{ fontSize: "18px" }}
            >
              <b>Date</b>
            </TableCell>

          </TableRow>
        </TableHead>

        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>

              <TableCell align="right">
                {expense.Spender}
              </TableCell>

              <TableCell align="right">
                {expense.Debtor}
              </TableCell>

              <TableCell align="right">
                {expense.amount}
              </TableCell>

              <TableCell align="right">
                {expense.tag}
              </TableCell>

              <TableCell align="right">
                {expense.comments}
              </TableCell>

              <TableCell align="right">
                {expense.tDate.substring(0, expense.tDate.indexOf("T"))}
              </TableCell>

              <TableCell align="right">
                <Button variant="outlined"
                  onClick={() => handleEditClick(expense)}
                >
                  Edit
                </Button>
              </TableCell>

              <TableCell align="right">
                <Button
                  variant="outlined"
                  onClick={() => handleDeleteClick(expense)}
                >
                  Delete
                </Button>
              </TableCell>

            </TableRow>
          ))};
        </TableBody>

      </Table>
    </TableContainer>
  );
};

export default ExpenseTable;
