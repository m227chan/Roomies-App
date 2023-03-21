import * as React from "react";
import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import history from "../Navigation/history";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Divider from "@material-ui/core/Divider";
import "./SignIn.css";
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/firebase";

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

// ForgotPasswordDialog component
const ForgotPasswordDialog = ({ open, handleClose }) => {

    const firebaseConfig = {
        apiKey: "AIzaSyBVTZUlpllWu2AaX6gddWn8kUu0L38LkZo",
        authDomain: "msci245-d3-7a81c.firebaseapp.com",
        databaseURL: "https://msci245-d3-7a81c-default-rtdb.firebaseio.com",
        projectId: "msci245-d3-7a81c",
        storageBucket: "msci245-d3-7a81c.appspot.com",
        messagingSenderId: "592846380585",
        appId: "1:592846380585:web:a1b6ee383e2f7cfc0a8638",
        measurementId: "G-5L2LC1BHQV",
      };
      
    const app = initializeApp(firebaseConfig);

    const [errorStatus, setErrorStatus] = useState(false);
    const [submitClicked, setSubmitClicked] = useState(false);

    const [email, setEmail] = useState('')
    const auth = getAuth(app);

    const handlePasswordReset = async () => {
        setSubmitClicked(true);
        //await sendPasswordResetEmail(auth, email);
        console.log(email);
        await sendPasswordResetEmail(auth, email)
            .then(() => {
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

        });
        console.log("Password reset email sent");
        handleClose();
    }

    const handleCancel = () => {
        handleClose();
    };

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
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handlePasswordReset}>Send Email</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default ForgotPasswordDialog;