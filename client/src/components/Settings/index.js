import React, { useState } from "react";
import "./Settings.css";

import {
  Button,
  Paper,
  Box,
  Grid,
  Typography,
  Container,
  Link,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import history from "../Navigation/history";
import SideNav from "../CustomAppBar/sideNav";

import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";

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

const Settings = (props) => {
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);

  const { classes } = props;

  onAuthStateChanged(auth, (currUser) => {
    setUser(currUser);
  });

  const onClickLogOut = async () => {
    await signOut(auth);
    history.push("/SignIn");
  };

  return (
    <>
      <Grid>
        <SideNav />
      </Grid>
      <ThemeProvider theme={theme}>
        <Container class="container">
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              direction="column"
              justifyContent="space-evenly"
              alignItems="stretch"
              spacing={3}
              style={{
                marginTop: "10%",
                marginLeft: "5%",
                marginRight: "10%",
              }}
            >
              <Grid item>
                <Typography variant={"h3"}>Settings</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => history.push("/JoinCreateRoom")}
                  class="leave-room-btn"
                >
                  <Typography variant="p">Leave Room</Typography>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={onClickLogOut}
                  class="leave-room-btn"
                >
                  <Typography variant="p"> Sign Out</Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Settings;
