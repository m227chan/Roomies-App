import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import history from "../Navigation/history";

import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "./SignIn.css";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import Divider from "@mui/material/Divider";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitClicked, setSubmitClicked] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  const onSubmit = async () => {
    console.log("email: " + email + " | " + "password: " + password);
    setSubmitClicked(true);

    try {
      setErrorStatus(false);
      const user = await signInWithEmailAndPassword(auth, email, password);

      history.push("/Room");
    } catch (e) {
      console.log(e.message);
      setErrorStatus(true);
    }
  };

  const mainMessage = (
    <Box sx={{ flexGrow: 1 }}>
      <Grid className="mainContainer">
        <Grid class="topBanner" item>
          <Grid class="title" item>
            <Typography variant="h2">Roomies</Typography>
          </Grid>
          <Grid class="divider" item>
            <Divider style={{ background: "#000000" }} />
          </Grid>
        </Grid>
        <Grid class="messageBox" item>
          <Typography variant="p">To continue, log in or sign up</Typography>
        </Grid>
        <Grid item>
          {" "}
          <Button class="signUpBottom" color="inherit" variant="contained">
            <Link
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={() => history.push("/SignUp")}
            >
              <Typography>Sign Up</Typography>
            </Link>
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="h5"> OR</Typography>
        </Grid>
        <Grid item>
          <Container maxWidth="xs">
            <form noValidate onSubmit={onSubmit}>
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
                    ? "Please enter email."
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
                    ? "Please enter password."
                    : ""
                }
              />
              <Button variant="contained" onClick={onSubmit}>
                Login
              </Button>
              <Typography>
                {errorStatus === true ? "Invalid email or password." : ""}
              </Typography>
            </form>

            <br />
          </Container>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <MuiThemeProvider>
      <div className="root">
        <CssBaseline />
        <Paper className="paper">{mainMessage}</Paper>
      </div>
    </MuiThemeProvider>
  );
};

export default SignIn;
