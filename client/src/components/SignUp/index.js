import React, { useState } from 'react';
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import history from '../Navigation/history';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

import {
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";

const opacityValue = 0.9;

const theme = createTheme({
    palette: {
        type: 'light',
        background: {
            default: "#000000"
        },
        primary: {
            main: "#7a1a06",
        },
        secondary: {
            main: "#ffcb52",
        },
    },
});

const styles = theme => ({
    root: {
        body: {
            backgroundColor: "#000000",
            opacity: opacityValue,
            overflow: "hidden",
        },
    },
    mainMessage: {
        opacity: opacityValue,
    },

    mainMessageContainer: {
        marginTop: "15vh",
        marginLeft: theme.spacing(20),
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(4),
        },
    },
    paper: {
        overflow: "hidden",
    },
    message: {
        opacity: opacityValue,
        maxWidth: 250,
        paddingBottom: theme.spacing(2),
    },

});

const SignUp = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [submitClicked, setSubmitClicked] = useState(false);
    const [message, setMessage] = useState("");

    const { classes } = props;

    const onSubmit = async () => {
        console.log("email: " + email + " | " + "password: " + password);
        setSubmitClicked(true);
        try {
<<<<<<< HEAD

=======
>>>>>>> 4388d3d195de75b504127b86fda778656b3dc7de
            setMessage("");
            const user = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            setMessage("An account has been created.");

            history.push('/JoinCreateRoom');
        } catch (e) {
            console.log(e.message);
            setMessage(e.message.replace("Firebase: ", ""));
        }
    };

    const mainMessage = (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="flex-start"
                style={{ minHeight: '100vh' }}
                className={classes.mainMessageContainer}
            >
                <Grid item>
                    <Container maxWidth="xs">
                        <form
                            noValidate
                            onSubmit={onSubmit}
                        >
                            <Typography variant="h4" color="primary">
                                Create an Account
                            </Typography>

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                InputLabelProps={{ shrink: true }}
                                error={email === "" && submitClicked === true}
                                helperText={(email === "" && submitClicked === true) ?
                                    "Please enter an email." : ""}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                                label="Create Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                InputLabelProps={{ shrink: true }}
                                error={password === "" && submitClicked === true}
                                helperText={(password === "" && submitClicked === true) ?
                                    "Please enter a password." : ""}
                            />

                            <Button
                                variant="contained"
                                onClick={onSubmit}
                            >
                                Register
                            </Button>

                            <Typography>{(message !== "") ?
                                message : ""}</Typography>
                        </form>

                        <br />

                        <Button
                            color="inherit"
                            variant="contained"
                        >
                            <Link
                                color="inherit"
                                style={{ cursor: "pointer" }}
                                onClick={() => history.push('/SignIn')}
                            >
                                <Typography>Sign In</Typography>
                            </Link>
                        </Button>
                    </Container>
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    {mainMessage}
                </Paper>
            </div>
        </MuiThemeProvider>
    );
}

export default withStyles(styles)(SignUp);