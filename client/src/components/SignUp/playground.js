import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import history from "../Navigation/history";

import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";

const serverURL = "https://roomies-app.netlify.app"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const opacityValue = 0.9;

const theme = createTheme({
  palette: {
    type: "light",
    background: {
      default: "#000000",
    },
    primary: {
      main: "#7a1a06",
    },
    secondary: {
      main: "#ffcb52",
    },
  },
});

const styles = (theme) => ({
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
    [theme.breakpoints.down("xs")]: {
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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [submitClicked, setSubmitClicked] = useState(false);
  const [message, setMessage] = useState("");

  const { classes } = props;

  const onSubmit = async () => {
    // console.log("email: " + email + " | " + "password: " + password);
    setSubmitClicked(true);
    try {
      setMessage("");
      await createUserWithEmailAndPassword(auth, email, password);

      await signInWithEmailAndPassword(auth, email, password);

      setMessage("An account has been created.");
      callApiAddUser();
      history.push("/JoinCreateRoom");
    } catch (e) {
      console.log(e.message);
      setMessage(e.message.replace("Firebase: ", ""));
    }
  };

  const callApiAddUser = async () => {
    const user = auth.currentUser;
    // console.log(user.uid);

    const url = serverURL + "/api/addUser";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        firebaseUID: user.uid,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  };

  const mainMessage = (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="flex-start"
        style={{ minHeight: "100vh" }}
        className={classes.mainMessageContainer}
      >
        <Grid item>
          <Container maxWidth="xs">
            <form noValidate onSubmit={onSubmit}>
              <Typography variant="h4" color="primary">
                Create an Account
              </Typography>

              <TextField
                variant="outlined"
                margin="normal"
                inputProps={{ maxLength: 50 }}
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
                helperText={
                  email === "" && submitClicked === true
                    ? "Please enter an email."
                    : ""
                }
              />

              <TextField
                variant="outlined"
                margin="normal"
                inputProps={{ maxLength: 50 }}
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
                helperText={
                  password === "" && submitClicked === true
                    ? "Please enter a password."
                    : ""
                }
              />

              <TextField
                variant="outlined"
                margin="normal"
                inputProps={{ maxLength: 20 }}
                required
                fullWidth
                name="firstName"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
                label="First Name"
                type="firstName"
                id="firstName"
                autoComplete="firstName"
                InputLabelProps={{ shrink: true }}
                error={firstName === "" && submitClicked === true}
                helperText={
                  firstName === "" && submitClicked === true
                    ? "Please enter your first name."
                    : ""
                }
              />

              <TextField
                variant="outlined"
                margin="normal"
                inputProps={{ maxLength: 20 }}
                required
                fullWidth
                name="lastName"
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                label="Last Name"
                type="lastName"
                id="lastName"
                autoComplete="lastName"
                InputLabelProps={{ shrink: true }}
                error={lastName === "" && submitClicked === true}
                helperText={
                  lastName === "" && submitClicked === true
                    ? "Please enter your last name."
                    : ""
                }
              />

              <Button variant="contained" onClick={onSubmit}>
                Register
              </Button>

              <Typography>{message !== "" ? message : ""}</Typography>
            </form>

            <br />

            <Button color="inherit" variant="contained">
              <Link
                color="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/SignIn")}
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
        <Paper className={classes.paper}>{mainMessage}</Paper>
      </div>
    </MuiThemeProvider>
  );
};

export default withStyles(styles)(SignUp);
