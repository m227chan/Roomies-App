import * as React from "react";
import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";
import "./SignIn.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/firebase";

// ForgotPasswordDialog component
const ForgotPasswordDialog = ({ open, handleClose }) => {

    const [submitClicked, setSubmitClicked] = useState(false);

    const [email, setEmail] = useState('')
    // const auth = getAuth();

    const handlePasswordReset = async () => {
        try {
            setSubmitClicked(true);
            await sendPasswordResetEmail(auth, email);
            console.log("Password reset email sent to " + email);
            handleClose();
            setEmail('');
        } catch (error) {
            console.log(error.code + " " + error.message);
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Please Enter your Email</DialogTitle>
            <DialogContent>

                <TextField
                    autoFocus
                    margin="dense"
                    id="spender"
                    label="Email"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={email === "" && submitClicked === true}
                    helperText={(email === "" && submitClicked === true) ?
                        "Please enter an Email." : ""}
                />

                <br />
                <br />

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handlePasswordReset}>Send Email</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default ForgotPasswordDialog;