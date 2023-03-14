import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

export const filterExpensesBy = (expenses, filterBy, input) => {
  if (filterBy === 'tag' && (input === 'Food' || input === 'Loan'
    || input === 'Groceries' || input === 'Activity'
    || input === 'Paid Back' || input === 'Other'
    || input === 'Consequences')) {
    return expenses.filter(expense => expense.tag === input);
  } else if (filterBy === 'idSpender') {
    return expenses.filter(expense => expense.idSpender === input);
  } else if (filterBy === 'idDebtor') {
    return expenses.filter(expense => expense.idDebtor === input);
  } else if (filterBy === 'amount') {
    return expenses.filter(expense => expense.amount === input);
  } else {
    throw new Error("Invalid input");
  }
}

export const deleteExpenses = (expenses, id) => {
  if (id < 0){
    throw new Error("Invalid input");   
  }
  const indexFinder = expenses.findIndex(expense => expense.id === id);

  if (indexFinder === -1){
    throw new Error("Invalid input");
  }
  
  const updatedExpenses = [];
  for(var i = 0; i< expenses.length; i++){
    if (i != indexFinder){
      updatedExpenses.push(expenses[i])
    }
  }

  return updatedExpenses;

}

const ExpenseTable = () => {
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currUser) => {
    setUser(currUser);
  });

  useEffect(() => {
    getExpenseReport();
  }, [user]);

  const callAPIGetExpenseReport = async () => {
    const url = serverURL + "/api/getAllExpenses";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        spenderID: user.uid,
        debtorID: user.uid,
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
      setExpenses(parsed);
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Payer</TableCell>
            <TableCell align="right">Payee</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Tag</TableCell>
            <TableCell align="right">Comments</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell align="right">{expense.idSpender}</TableCell>
              <TableCell align="right">{expense.idDebtor}</TableCell>
              <TableCell align="right">{expense.amount}</TableCell>
              <TableCell align="right">{expense.tag}</TableCell>
              <TableCell align="right">{expense.comments}</TableCell>
              <TableCell align="right">
                {expense.tDate.substring(0, expense.tDate.indexOf("T"))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseTable;
