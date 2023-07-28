import * as React from "react";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@material-ui/core/Paper";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CheckIfRoomExists from "./CheckIfRoomExists";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Divider from "@material-ui/core/Divider";
import "./JoinCreateRoom.css";
import { ElevatorOutlined } from "@mui/icons-material";

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
  },
});

const JoinCreateRoom = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitClicked, setSubmitClicked] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  const onSubmit = async () => {
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

  const [roomID, setRoomID] = useState("");
  const [roomName, setRoomName] = useState("");
  const [submit1, setSubmit1] = useState(false);
  const [submit2, setSubmit2] = useState(false);

  const [check, setCheck] = useState(0);

  useEffect(() => {
    CheckIfRoomExists(roomID)
      .then((value) => setCheck(value))
      .catch((error) => console.error(error));
    setSubmit1(false);
  }, [roomID]);

  const user = auth.currentUser;

  const callApiAddUserToExistingRoom = async () => {
    const url = serverURL + "/api/addUserToExistingRoom";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        idRoom: roomID,
        firebaseUID: user.uid,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  };

  const callApiAddUserToNewRoom = async () => {
    const url = serverURL + "/api/addUserToNewRoom";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        firebaseUID: user.uid,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  };

  const callApiAddRoom = async () => {
    const url = serverURL + "/api/addRoom";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        roomName: roomName,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  };

  const onClickJoinRoom = async () => {
    CheckIfRoomExists(roomID).then((value) => setCheck(value));

    setSubmit1(true);
    console.log(check);
    if (roomID !== "" && roomID !== "-1" && check === 1) {
      callApiAddUserToExistingRoom();
      history.push("/Room");
    }
  };

  const onClickCreateRoom = async () => {
    setSubmit2(true);
    if (roomName !== "") {
      callApiAddRoom();
      callApiAddUserToNewRoom();
      history.push("/Room");
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
      <Container component="main" maxWidth="sm">
        <Grid class="messageBox" item>
          <Typography variant="p">
            Welcome to Roomies! Create a new room or join an existing room
          </Typography>
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
            <form noValidate onSubmit={onSubmit}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  item
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    inputProps={{ maxLength: 50 }}
                    fullWidth
                    id="roomName"
                    value={roomName}
                    onChange={(event) => {
                      setRoomName(event.target.value);
                    }}
                    label="Input new room name"
                    name="roomName"
                    autoComplete="roomName"
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                    error={roomName === "" && submit2 === true}
                    helperText={
                      roomName === "" && submit2 === true
                        ? "Please enter a name for your new room."
                        : ""
                    }
                  />
                  <Button
                    variant="contained"
                    onClick={onClickCreateRoom}
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
                    <Typography variant="p">New Room</Typography>
                  </Button>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ m: "1.5rem 0rem" }}
                  item
                >
                  <Grid item xs={5}>
                    <Divider style={{ background: "#000000" }} />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h5" class="newDivider">
                      OR
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Divider style={{ background: "#000000" }} />
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    inputProps={{ maxLength: 20 }}
                    fullWidth
                    id="roomID"
                    value={roomID}
                    onChange={(event) => {
                      setRoomID(event.target.value);
                    }}
                    label="Insert existing room ID"
                    name="roomID"
                    autoComplete="roomID"
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                    error={
                      (roomID === "" || roomID === "-1" || check !== 1) &&
                      submit1 === true
                    }
                    helperText={
                      (roomID === "" || roomID === "-1" || check !== 1) &&
                      submit1 === true
                        ? "Please enter a valid Room ID (This Room ID may be full or may not exist)."
                        : ""
                    }
                  />
                  <Button
                    variant="contained"
                    onClick={onClickJoinRoom}
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
                    <Typography variant="p">Join Room</Typography>
                  </Button>
                </Grid>
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

export default JoinCreateRoom;
