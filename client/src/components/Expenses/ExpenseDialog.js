import React, { useState } from "react";
import "./expense.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import PayeeFormControl from "./PayeeFormControl";
import PayerFormControl from "./PayerFormControl";

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

// ExpenseDialog component
const ExpenseDialog = ({ open, handleClose }) => {
    const [item, setItem] = useState("");
    const [amount, setAmount] = useState("");
    const [payer, setPayer] = useState("");
    const [payeeList, setPayeeList] = useState([]);
    const [tag, setTag] = useState("");
    const [comments, setComments] = useState("");
    const [date, setDate] = useState("");
  
    const handleAddExpense = () => {
      for (let i = 0; i < payeeList.length; i++) {
        const newAmount = amount / payeeList.length;
        const newExpense = {
          item: item,
          amount: newAmount,
          payer: payer,
          payee: payeeList[i],
          comments: comments,
          date: date,
          tag: tag,
        };
        callApiAddExpense(newExpense);
      }
    };
  
    const callApiAddExpense = async (newExpense) => {
      const url = serverURL + "/api/addExpense";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //authorization: `Bearer ${this.state.token}`
        },
        body: JSON.stringify({
          amount: newExpense.amount,
          spender: newExpense.payer,
          debtor: newExpense.payee,
          tag: newExpense.tag,
          comment: newExpense.comments,
          date: newExpense.date,
        })
      });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      // console.log("User settings: ", body);
      return body;
    }
  
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Expense</DialogTitle>
        <DialogContent>
  
          <TextField
            autoFocus
            margin="dense"
            id="item"
            label="Item Description"
            type="text"
            fullWidth
            variant="standard"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
  
          <TextField
            label="Enter Amount"
            name="numberformat"
            id="spender"
            type="number"
            fullWidth
            variant="standard"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
  
          <PayerFormControl payer={payer} setPayer={setPayer} />
          <PayeeFormControl payeeList={payeeList} setPayeeList={setPayeeList} />
  
          <TextField
            name="numberformat"
            id="date"
            type="date"
            fullWidth
            variant="standard"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="tag">Tag</InputLabel>
            <Select
              labelId="tag"
              id="tag"
              value={tag}
              label="Tag"
              onChange={(e) => setTag(e.target.value)}
            >
              <MenuItem value="Grocery">Grocery</MenuItem>
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Consequences">Consequences</MenuItem>
              <MenuItem value="Activity">Activity</MenuItem>
            </Select>
          </FormControl>
  
          <TextField
            autoFocus
            margin="dense"
            id="spender"
            label="Comments"
            type="text"
            fullWidth
            variant="standard"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddExpense}>Add</Button>
        </DialogActions>
      </Dialog>
    );
  };

  export default ExpenseDialog;