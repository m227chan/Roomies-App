import React, { useState } from "react";
import "./expense.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Paper,
  Box,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import CustomAppBar from "../CustomAppBar";
import { getAdditionalUserInfo, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import GetRoomates from "../Session/index.js";
import ExpenseTable from "./expenseTable.js";

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const PayerFormControl = ({ payer, setPayer }) => {
  const [roomates, setRoomates] = React.useState([]);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    });
  }, []);

  const callAPIGetRoomates = async () => {
    const url = serverURL + "/api/getRoomates";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        user: user.uid,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  };

  const getRoomateList = React.useCallback(() => {
    callAPIGetRoomates().then((res) => {
      var parsed = JSON.parse(res.express);
      setRoomates(parsed);
    });
  }, [callAPIGetRoomates]);

  // Create a state for the checked roomates
  const [checkedPayer, setCheckedPayer] = React.useState({});

  const handlePayerChange = (event) => {
    const selectedPayer = event.target.name; // use event.target.name instead of event.target.Roomate
    setCheckedPayer({
      ...checkedPayer,
      [selectedPayer]: event.target.checked,
    });
    if (event.target.checked) {
      setPayer(selectedPayer);
    }
  };

  const error = Object.values(checkedPayer).filter((v) => v).length !== 1;

  React.useEffect(() => {
    getRoomateList();
  }, [user]);

  console.log(roomates);

  return (
    <FormControl
      required
      error={error}
      component="fieldset"
      sx={{ m: 3 }}
      variant="standard"
    >
      <FormLabel component="legend">Paid By</FormLabel>
      <FormGroup>
        {roomates.map((payer) => (
          <FormControlLabel
            key={payer.id}
            control={
              <Checkbox
                checked={checkedPayer[payer.firebaseUID] || false}
                onChange={handlePayerChange}
                name={payer.firebaseUID}
              />
            }
            label={payer.Roomate}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

// Payee Variable Component
const PayeeFormControl = ({ payee, setPayee }) => {
  const [roomates, setRoomates] = React.useState([]);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    });
  }, []);

  const callAPIGetRoomates = async () => {
    const url = serverURL + "/api/getRoomates";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        user: user.uid,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  };

  const getRoomateList = React.useCallback(() => {
    callAPIGetRoomates().then((res) => {
      var parsed = JSON.parse(res.express);
      setRoomates(parsed);
    });
  }, [callAPIGetRoomates]);

  const [checkedPayee, setCheckedPayee] = React.useState({});

  const handlePayeeChange = (event) => {
    const selectedPayee = event.target.name;
    setCheckedPayee({
      ...checkedPayee,
      [selectedPayee]: event.target.checked,
    });
    if (event.target.checked) {
      setPayee(selectedPayee);
    }
  };

  const error = Object.values(checkedPayee).filter((v) => v).length < 1;

  React.useEffect(() => {
    getRoomateList();
  }, [user]);

  console.log(roomates);
  return (
    <FormControl
      required
      error={error}
      component="fieldset"
      sx={{ m: 3 }}
      variant="standard"
    >
      <FormLabel component="legend">Paid To</FormLabel>
      <FormGroup>
        {roomates.map((payee) => (
          <FormControlLabel
            key={payee.id}
            control={
              <Checkbox
                checked={checkedPayee[payee.firebaseUID] || false}
                onChange={handlePayeeChange}
                name={payee.firebaseUID}
              />
            }
            label={payee.Roomate}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

// ExpenseDialog component
const ExpenseDialog = ({ open, handleClose }) => {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [payer, setPayer] = useState("");
  const [payee, setPayee] = useState("");
  const [tag, setTag] = useState("");
  const [comments, setComments] = useState("");
  const [date, setDate] = useState("");

  const handleAddExpense = () => {
    const newExpense = {
      item: item,
      amount: amount,
      payer: payer,
      payee: payee,
      comments: comments,
      date: date,
      tag: tag,
    };
    console.log(newExpense);

    fetch("/api/addExpense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: newExpense.amount,
        spender: newExpense.payer,
        debtor: newExpense.payee,
        tag: newExpense.tag,
        comment: newExpense.comments,
        date: newExpense.date,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    handleClose();
  };

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
        <PayeeFormControl payee={payee} setPayee={setPayee} />
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

// Expenses component
const Expenses = (props) => {
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
              <Typography variant={"h4"} align="flex-start">
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
