import * as React from "react";
import { useState } from "react";

import { auth } from "../Firebase/firebase";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Divider from "@material-ui/core/Divider";
import "./SignUp.css";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const serverURL = "http://localhost:3000/"; //enable for dev mode

const theme = createTheme({
  palette: {
    primary: {
      main: "#02473B",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

const SignUp = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [submitClicked, setSubmitClicked] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async () => {
    // console.log("email: " + email + " | " + "password: " + password);
    setSubmitClicked(true);
    try {
      setMessage("");
      await createUserWithEmailAndPassword(auth, email, password);

      const name = firstName + " " + lastName;

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

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
    <>
      <Grid className="mainContainer">
        <Grid class="title" item>
          <Box
            sx={{
              height: "20%",
              width: "20%",
            }}
            component="img"
            alt="Roomies App Logo"
            src="/Logo.png"
          />
        </Grid>
        <Grid class="divider" item>
          {/* <Divider /> */}
        </Grid>
      </Grid>
      <Container component="main" maxWidth="sm">
        <Grid class="messageBox" item>
          <Typography variant="p">Hurry your roommates are waiting!</Typography>
        </Grid>
        <Box
          sx={{
            mt: "0",
            pt: "0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box component="form" noValidate>
            <Button
              variant="contained"
              onClick={() => history.push("/SignIn")}
              fullWidth
              sx={{
                mb: 2,
                bgcolor: "#68B984",
                borderRadius: "50px",
                padding: "0.8rem",
                "&:hover": {
                  cursor: "pointer",
                  bgcolor: "#448E5E",
                  // color: "#68B984",
                },
              }}
            >
              <Typography variant="p" sx={{ fontWeight: "bold" }}>
                {" "}
                Sign in to your Account
              </Typography>
            </Button>
            <Grid container class="orSectionGrid">
              <Grid item xs={4}>
                <Divider style={{ background: "#000000" }} />
              </Grid>
              <Grid item xs={5}>
                <Typography variant="h5" class="orDivider">
                  Create your Account
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Divider style={{ background: "#000000" }} />
              </Grid>
            </Grid>

            <form noValidate onSubmit={onSubmit}>
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
                label="Password"
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

              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                {/* <Button
                  variant="contained"
                  onClick={onSubmit}
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: "#02473B",
                    borderRadius: "50px",
                    paddingLeft: "10%",
                    paddingRight: "10%",
                    "&:hover": {
                      cursor: "pointer",
                      bgcolor: "#448E5E",
                      //   color: "#68B984",
                    },
                  }}
                >
                  <Typography>Register</Typography>
                </Button> */}

                <Typography>{message !== "" ? message : ""}</Typography>

                <Button
                  variant="contained"
                  onClick={onSubmit}
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: "#02473B",
                    borderRadius: "50px",
                    paddingLeft: "10%",
                    paddingRight: "10%",
                    "&:hover": {
                      cursor: "pointer",
                      bgcolor: "#448E5E",
                      //   color: "#68B984",
                    },
                  }}
                >
                  <Typography>Register</Typography>
                </Button>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper class="paper">{mainMessage}</Paper>
    </ThemeProvider>
  );
};

export default SignUp;
