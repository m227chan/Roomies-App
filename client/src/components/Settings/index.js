import React, { useState } from 'react';
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import history from '../Navigation/history';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";

import CustomAppBar from '../CustomAppBar';

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

const Settings = (props) => {

  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);

  const { classes } = props;

  onAuthStateChanged(auth, (currUser) => {
    setUser(currUser);
  });

  const onClickLogOut = async () => {
    await signOut(auth);
    history.push('/SignIn');
  }

  // const handleDelete = async () => {
  //   // REQUIRES ADMIN ACCESS - TO BE FIXED
  //   console.log(user.uid);
  //   getAuth()
  //     .deleteUser(user.uid)
  //     .then(() => {
  //       console.log('Account deleted');
  //     })
  //     .catch((e) => {
  //       console.log(e.message);
  //     });

  //   history.push('/SignIn');
  // }

  const mainMessage = (
    <Box sx={{ flexGrow: 1 }}>

      <CustomAppBar/>

      <Grid
        container
        spacing={0}
        direction="column"
        style={{ minHeight: '100vh' }}
        className={classes.mainMessageContainer}
      >
        <Grid item>
          <Typography
            variant={"h3"}
            className={classes.mainMessage}
          >
            Settings
          </Typography>

          <Button>
            <Link
              onClick={() => history.push('/JoinCreateRoom')}
            >
              <Typography variant="h6">
                Leave Room
              </Typography>
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
            <Link
              onClick={onClickLogOut}
            >
              <Typography variant="h6">
                Sign Out
              </Typography>
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

export default withStyles(styles)(Settings);