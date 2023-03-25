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

import history from "../Navigation/history";
import SideNav from "../CustomAppBar/sideNav";

import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";

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
      <Container class="container">
        <Paper class="paper">
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={0}
              direction="column"
              style={{ minHeight: "100vh" }}
              class="mainMessageContainer"
            >
              <Grid item>
                <Typography variant={"h3"}>Settings</Typography>

                <Button>
                  <Link onClick={() => history.push("/JoinCreateRoom")}>
                    <Typography variant="h6">Leave Room</Typography>
                  </Link>
                </Button>

                <br />

                <Button>
                  <Link onClick={onClickLogOut}>
                    <Typography variant="h6">Sign Out</Typography>
                  </Link>
                </Button>

              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Settings;
