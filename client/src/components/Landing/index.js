import * as React from "react";
import { useState } from "react";

import { auth } from "../Firebase/firebase";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@material-ui/core/Paper";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Divider from "@material-ui/core/Divider";
import "./landing.css";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const serverURL = "https://roomies-app.netlify.app/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

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
    h2: {
      fontWeight: "bold",
    },
  },
});

const SignUp = ({ history }) => {
  const mainMessage = (
    <>
      <Grid>
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
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            item
            xs={5}
            sx={{
              padding: "2rem 0rem",
              width: "auto",
              fontWeight: "bold",
              color: "#02473B",
            }}
          >
            <Typography variant="h2">All-in-one Roommate App!</Typography>
            <br />
            <Typography variant="p">
              Roomies is the ultimate solution for busy students and roommates! 
              Manage expenses, groceries, and scheduling all in one place. 
              Simplify your life, save time, and eliminate coordination issues 
              with Roomies.
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              sx={{
                mt: "0",
                pt: "0",
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                mt={3}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => history.push("/SignIn")}
                    sx={{
                      mr: 2,
                      bgcolor: "#68B984",
                      borderRadius: "50px",
                      padding: "0.8rem 2rem",
                      "&:hover": {
                        cursor: "pointer",
                        bgcolor: "#448E5E",
                        // color: "#68B984",
                      },
                    }}
                  >
                    <Typography variant="p" sx={{ fontWeight: "bold" }}>
                      {" "}
                      Sign In
                    </Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => history.push("/SignUp")}
                    sx={{
                      mr: 2,
                      bgcolor: "#02473B",
                      borderRadius: "50px",
                      padding: "0.8rem 2rem",
                      "&:hover": {
                        cursor: "pointer",
                        bgcolor: "#448E5E",
                        // color: "#68B984",
                      },
                    }}
                  >
                    <Typography variant="p" sx={{ fontWeight: "bold" }}>
                      {" "}
                      Sign Up
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            item
            xs={7}
          >
            <img
              style={{
                height: "90%",
                width: "90%",
                margin: "auto",
              }}
              alt="Roomies App Logo"
              src="/Hero.png"
            />
          </Grid>
        </Grid>
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
