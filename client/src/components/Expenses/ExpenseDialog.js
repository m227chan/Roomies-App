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
    Typography,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import PayeeFormControl from "./PayeeFormControl";
import PayerFormControl from "./PayerFormControl";

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

// ExpenseDialog component
const ExpenseDialog = ({ open, handleClose }) => {
    const [amount, setAmount] = useState("");
    const [payer, setPayer] = useState("");
    const [payeeList, setPayeeList] = useState([]);
    const [payerError, setPayerError] = useState(false);
    const [payeeError, setPayeeError] = useState(false);
    const [tag, setTag] = useState("");
    const [comments, setComments] = useState("");
    const [date, setDate] = useState("");

    const [errorStatus, setErrorStatus] = useState(false);
    const [submitClicked, setSubmitClicked] = useState(false);

    const [roomates, setRoomates] = React.useState([]);
    const [user, setUser] = React.useState({});

    const handleAddExpense = () => {
        setSubmitClicked(true);
        console.log(payeeList);
        console.log(payer);

        if (payeeList.includes(payer)) {
            setErrorStatus(true);
        }

        if (!payeeList.includes(payer)) {
            setErrorStatus(false);
        }

        if ((payeeError === false || payerError === false) &&
            !payeeList.includes(payer) &&
            comments != "" &&
            tag != "" &&
            date != "" &&
            amount != "") {
            for (let i = 0; i < payeeList.length; i++) {
                const newAmount = amount / payeeList.length;
                const newExpense = {
                    amount: newAmount,
                    payer: payer,
                    payee: payeeList[i],
                    comments: comments,
                    date: date,
                    tag: tag,
                };
                callApiAddExpense(newExpense);
            }

            //clear the dialog after new expense made
            setPayeeList([]);
            setPayer("");

            setErrorStatus(false);

            handleClose();
        }
    };

    const handleCancel = () => {
        setPayeeList([]);
        setPayer("");
        handleClose();
    };

    const callApiAddExpense = async (newExpense) => {
        console.log("addExpense called");
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
    };

    React.useEffect(() => {
        onAuthStateChanged(auth, (currUser) => {
            setUser(currUser);
        });
        getRoomateList();
    }, [user]);

    const callAPIGetRoomates = async () => {
        console.log("getRoomates called");
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

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Expense</DialogTitle>
            <DialogContent>

                <TextField
                    autoFocus
                    margin="dense"
                    id="spender"
                    label="Expense Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    error={comments === "" && submitClicked === true}
                    helperText={(comments === "" && submitClicked === true) ?
                        "Please enter an expense description." : ""}
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
                    error={amount === "" && submitClicked === true}
                    helperText={(amount === "" && submitClicked === true) ?
                        "Please enter an amount." : ""}
                />

                <PayerFormControl
                    payer={payer}
                    setPayer={setPayer}
                    roomates={roomates}
                    onError={() => setPayerError(true)}
                />

                <PayeeFormControl
                    payeeList={payeeList}
                    setPayeeList={setPayeeList}
                    roomates={roomates}
                    onError={() => setPayeeError(true)}
                />

                <Typography align="left" color="red">{(errorStatus === true) ?
                    "Error: Cannot select same Payer and Payee." : ""}
                </Typography>

                <TextField
                    name="numberformat"
                    id="date"
                    type="date"
                    fullWidth
                    variant="standard"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    error={date === "" && submitClicked === true}
                    helperText={(date === "" && submitClicked === true) ?
                        "Please enter an date." : ""}
                />

                <br />
                <br />

                <FormControl fullWidth>
                    <InputLabel id="tag">Tag</InputLabel>
                    <Select
                        labelId="tag"
                        id="tag"
                        value={tag}
                        label="Tag"
                        onChange={(e) => setTag(e.target.value)}
                        error={tag === "" && submitClicked === true}
                    >
                        <MenuItem value="Grocery">Grocery</MenuItem>
                        <br />
                        <MenuItem value="Food">Food</MenuItem>
                        <br />
                        <MenuItem value="Consequences">Consequences</MenuItem>
                        <br />
                        <MenuItem value="Activity">Activity</MenuItem>
                    </Select>
                </FormControl>

                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleAddExpense}>Add</Button>
                </DialogActions>

            </DialogContent>

        </Dialog>
    );
};

export default ExpenseDialog;