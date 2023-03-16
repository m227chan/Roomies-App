import React, { useState, useEffect } from "react";
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
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

// ExpenseDialog component
const EditExpenseDialog = ({ openEdit, handleCloseEdit, currExpense }) => {
    const [amount, setAmount] = useState("");
    const [payer, setPayer] = useState("");
    const [payee, setPayee] = useState("");
    const [expenseID, setExpenseID] = useState("");
    const [tag, setTag] = useState("");
    const [comments, setComments] = useState("");
    const [date, setDate] = useState("");

    const [errorStatus, setErrorStatus] = useState(false);
    const [submitClicked, setSubmitClicked] = useState(false);

    const [roomates, setRoomates] = React.useState([]);
    const [user, setUser] = React.useState({});

    useEffect(() => {
        setAmount(currExpense.amount);
        setTag(currExpense.tag);
        setExpenseID(currExpense.id)
        setComments(currExpense.comments);
        if (currExpense.tDate != null) {
            setDate(currExpense.tDate.split("T")[0]);
        }
    }, [currExpense]);

    const handleSubmitEditExpense = () => {
        if (payee === payer) {
            setErrorStatus(true);
        }

        if (payee != payer) {
            setErrorStatus(false);
        }

        if (payee != payer &&
            comments != "" &&
            tag != "" &&
            date != "" &&
            amount != "") {
            callApiEditExpense();
            handleCloseEdit();
        };
    }

    const handleCancel = () => {
        console.log(currExpense);
        handleCloseEdit();
    };

    const callApiEditExpense = async () => {
        console.log("editExpense called");
        const url = serverURL + "/api/editExpense";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                expenseID: expenseID,
                amount: amount,
                spender: payer,
                debtor: payee,
                tag: tag,
                comment: comments,
                date: date,
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        // console.log("User settings: ", body);
        return body;
    };

    useEffect(() => {
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

    const [changeStatusPayer, setChangeStatusPayer] = useState(false);

    const handlePayerChange = (event) => {
        setChangeStatusPayer(true);
        const selectedPayer = event.target.value;
        setPayer(selectedPayer);
    };

    const [changeStatusPayee, setChangeStatusPayee] = useState(false);

    const handlePayeeChange = (event) => {
        setChangeStatusPayee(true);
        const selectedPayee = event.target.value;
        setPayee(selectedPayee);
    };

    return (
        <Dialog open={openEdit} onClose={handleCloseEdit}>
            <DialogTitle>Edit an Expense</DialogTitle>
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

                <FormControl
                    required
                    error={!payer && changeStatusPayer === true}
                    component="fieldset"
                    sx={{ m: 3 }}
                    variant="standard"
                >
                    <FormLabel component="legend">Paid By</FormLabel>
                    <RadioGroup value={payer} onChange={handlePayerChange}>
                        {roomates.map((roommate) => (
                            <FormControlLabel
                                key={roommate.id}
                                value={roommate.firebaseUID}
                                control={<Radio />}
                                label={roommate.Roomate}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>

                <FormControl
                    required
                    error={!payee && changeStatusPayee === true}
                    component="fieldset"
                    sx={{ m: 3 }}
                    variant="standard"
                >
                    <FormLabel component="legend">Paid To</FormLabel>
                    <RadioGroup value={payee} onChange={handlePayeeChange}> 
                        {roomates.map((roommate) => (
                            <FormControlLabel
                                key={roommate.id}
                                value={roommate.firebaseUID}
                                control={<Radio />}
                                label={roommate.Roomate}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>

                <Typography align="left" color="red">{(errorStatus === true) ?
                    "Error: Must select payer and payee. Cannot be the same Person." : ""}
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
                    <Button onClick={handleSubmitEditExpense}>Change</Button>
                </DialogActions>

            </DialogContent>

        </Dialog>
    );
};

export default EditExpenseDialog;