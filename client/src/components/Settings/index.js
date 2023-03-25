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

                {/* <Button>
<Link
onClick={() => history.push('/SignIn')}
>
<Typography variant="h6">
Change Password *not implemented*
</Typography>
</Link>
</Button> */}

                <br />

                <Button>
                  <Link onClick={onClickLogOut}>
                    <Typography variant="h6">Sign Out</Typography>
                  </Link>
                </Button>

                <br />

                {/* <Button>
<Link
onClick={() => { setOpen(true) }}
>
<Typography variant="h6">
Delete Account *not implemented*
</Typography>
</Link>
</Button> */}

                {/* <Dialog
open={open}
onClose={() => { setOpen(false) }}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">
{"Are you sure you want to delete your account?"}
</DialogTitle>
<DialogContent>
<DialogContentText id="alert-dialog-description">
Deleting will permanently remove your account and all of its data from Roomies App.
</DialogContentText>
</DialogContent>
<DialogActions>
<Button onClick={() => { setOpen(false) }}>No</Button>
<Button onClick={handleDelete}>Yes</Button>
</DialogActions>
</Dialog> */}
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Settings;
