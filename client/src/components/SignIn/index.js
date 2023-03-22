import * as React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@material-ui/core/Paper";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Divider from "@material-ui/core/Divider";
import "./SignIn.css";

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

const SignIn = ({ history }) => {
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
      <Grid class="messageBox" item>
        <Typography variant="p">To continue, sign up or log in</Typography>
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
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Button
            className="newButton"
            variant="contained"
            onClick={() => history.push("/SignUp")}
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
              Sign Up for Roomies!
            </Typography>
          </Button>
          <Grid container class="orSectionGrid">
            <Grid item xs={5}>
              <Divider style={{ background: "#000000" }} />
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h5" class="orDivider">
                OR
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Divider style={{ background: "#000000" }} />
            </Grid>
          </Grid>

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

            <Typography>
              {errorStatus === true ? "Invalid email or password." : ""}
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid
                item
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                xs
              >
                <Button
                  variant="contained"
                  onClick={onSubmit}
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: "#02473B",
                    borderRadius: "50px",
                    paddingLeft: "15%",
                    paddingRight: "15%",
                    "&:hover": {
                      cursor: "pointer",
                      bgcolor: "#448E5E",
                      //   color: "#68B984",
                    },
                  }}
                >
                  <Typography variant="p"> Sign In</Typography>
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper className="paper">{mainMessage}</Paper>
    </ThemeProvider>
  );
};

export default SignIn;
