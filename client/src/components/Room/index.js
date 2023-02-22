import React, { useState } from "react";
import "./index.css";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Box from "@material-ui/core/Box";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";

import CustomAppBar from "../CustomAppBar";

const Room = (props) => {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currUser) => {
    setUser(currUser);
  });

  const mainMessage = (
    <Box sx={{ flexGrow: 1 }}>
      <CustomAppBar />

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="flex-start"
        style={{ minHeight: "100vh" }}
        class="mainMessageContainer"
      >
        <Grid item>
          <Typography variant={"h3"} className="mainMessage">
            Room
          </Typography>

          <Typography variant="h6" color="inherit">
            Welcome to the Roomies App {user.email}!
          </Typography>
          <Button variant="text">Text</Button>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <MuiThemeProvider>
      <div>
        <CssBaseline />
        <Paper class="paper">{mainMessage}</Paper>
      </div>
    </MuiThemeProvider>
  );
};

export default Room;
