import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const ExpenseTable = ({ open }) => {
  const [user, setUser] = useState({});
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    });
  }, []);

  useEffect(() => {
    getExpenseReport();
  }, [open, user]);

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
    callAPIDeleteExpense(expense.id);
    console.log(expense.id);
    setTimeout(() => {
      getExpenseReport();
    }, 500);
  };

  const callAPIDeleteExpense = async (expenseID) => {
    console.log("getExpenseReport called");
    const url = serverURL + "/api/deleteExpense";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        ExpenseID: expenseID,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  };

  const columns = [
    {
      field: 'Spender',
      headerName: 'Payer',
      headerAlign: 'left',
      headerClassName: 'tableHeader',
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontSize: '18px' }}>
          <b>{params.value}</b>
        </div>
      ),
    },
    {
      field: 'Debtor',
      headerName: 'Payee',
      headerAlign: 'left',
      headerClassName: 'tableHeader',
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontSize: '18px' }}>
          <b>{params.value}</b>
        </div>
      ),
    },
    {
      field: 'amount',
      headerName: 'Amount',
      headerAlign: 'left',
      headerClassName: 'tableHeader',
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontSize: '18px' }}>{params.value}</div>
      ),
    },
    {
      field: 'tag',
      headerName: 'Tag',
      headerAlign: 'left',
      headerClassName: 'tableHeader',
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontSize: '18px' }}>{params.value}</div>
      ),
    },
    {
      field: 'comments',
      headerName: 'Description',
      headerAlign: 'left',
      headerClassName: 'tableHeader',
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontSize: '18px' }}>{params.value}</div>
      ),
    },
    {
      field: 'tDate',
      headerName: 'Date',
      headerAlign: 'left',
      headerClassName: 'tableHeader',
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontSize: '18px' }}>
          {params.value.substring(0, params.value.indexOf('T'))}
        </div>
      ),
    },
    {
      field: 'Edit',
      headerName: '',
      headerAlign: 'left',
      headerClassName: 'tableHeader',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="outlined"
          onClick={() => handleEditClick(params.row)}
        >
          Edit
        </Button>
      ),
    },
    {
      field: 'Delete',
      headerName: '',
      headerAlign: 'left',
      headerClassName: 'tableHeader',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="outlined"
          onClick={() => handleDeleteClick(params.row)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 650, width: '100%' }}>
      <Paper style={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={expenses}
        columns={columns}
        pageSize={10}
      />
      </Paper>
    </div>
  );
};

export default ExpenseTable;

