import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditExpenseDialog from "./EditExpenseDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Paper, Card, Button } from "@material-ui/core";

const serverURL = "https://roomies-app.netlify.app"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const ExpenseTable = ({ open, expenses, getExpenseReport, getShortExchange, getRoomPageInfo }) => {
  const [currExpense, setCurrExpense] = useState({});
  const [openEdit, setOpenEdit] = useState(false);

  // console.log(currExpense);

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setTimeout(() => {
      getExpenseReport();
      getShortExchange();
      getRoomPageInfo();
    }, 500);
  };

  const handleEditClick = (expense) => {
    setCurrExpense(expense);
    setOpenEdit(true);
  };

  const handleDeleteClick = (expense) => {
    callAPIDeleteExpense(expense.id);
    setTimeout(() => {
      getExpenseReport();
      getShortExchange();
      getRoomPageInfo();
    }, 500);
  };

  const callAPIDeleteExpense = async (expenseID) => {
    // console.log("getExpenseReport called");
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
      field: "tDate",
      type: "Date",
      headerName: "Date",
      headerAlign: "left",
      headerClassName: "tableHeader",
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontSize: "18px" }}>
          {params.value.substring(0, params.value.indexOf("T"))}
        </div>
      ),
    },
    {
      field: "Debtor",
      headerName: "Payee",
      headerAlign: "left",
      headerClassName: "tableHeader",
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontSize: "18px" }}>{params.value}</div>
      ),
    },
    {
      field: "Spender",
      headerName: "Payer",
      headerAlign: "left",
      headerClassName: "tableHeader",
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontSize: "18px" }}>{params.value}</div>
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      headerAlign: "left",
      headerClassName: "tableHeader",
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontSize: "18px" }}>{params.value}</div>
      ),
    },
    {
      field: "tag",
      headerName: "Tag",
      headerAlign: "left",
      headerClassName: "tableHeader",
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontSize: "18px" }}>{params.value}</div>
      ),
    },
    {
      field: "comments",
      headerName: "Description",
      headerAlign: "left",
      headerClassName: "tableHeader",
      flex: 2,
      renderCell: (params) => (
        <div style={{ fontSize: "18px" }}>{params.value}</div>
      ),
    },
    {
      headerName: "Actions",
      headerAlign: "left",
      headerClassName: "tableHeader",
      flex: 1,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEditClick(params.row)}>
            <EditIcon />
          </Button>
          <Button onClick={() => handleDeleteClick(params.row)}>
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 650, width: "100%" }}>
      <Card class="card" style={{ height: 650, width: "100%" }}>
        <DataGrid rows={expenses} columns={columns} pageSize={10} />
      </Card>

      <EditExpenseDialog
        openEdit={openEdit}
        handleCloseEdit={handleCloseEdit}
        currExpense={currExpense}
      />
    </div>
  );
};

export default ExpenseTable;
