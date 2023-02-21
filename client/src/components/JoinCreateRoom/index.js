import React, { useState, useEffect } from 'react';
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import history from '../Navigation/history';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

import { auth } from "../Firebase/firebase";

const opacityValue = 0.9;

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

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

const JoinCreateRoom = (props) => {

    const [roomID, setRoomID] = useState("");
    const [roomName, setRoomName] = useState("");
    const [submit1, setSubmit1] = useState(false);
    const [submit2, setSubmit2] = useState(false);

    const [check, setCheck] = useState(0);

    useEffect(() => {
        checkIfRoomExists();
        setSubmit1(false);
    }, [roomID]);

    const user = auth.currentUser;

    const { classes } = props;

    const callAPICheckIfRoomExists = async () => {
        const url = serverURL + "/api/checkIfRoomExists";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                idRoom: roomID
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        // console.log("User settings: ", body);
        return body;
    }

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
                firebaseUID: user.uid
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        // console.log("User settings: ", body);
        return body;
    }

    const callApiAddUserToNewRoom = async () => {
        const url = serverURL + "/api/addUserToNewRoom";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                firebaseUID: user.uid
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        // console.log("User settings: ", body);
        return body;
    }

    const callApiAddRoom = async () => {
        const url = serverURL + "/api/addRoom";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                roomName: roomName
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        // console.log("User settings: ", body);
        return body;
    }

    const checkIfRoomExists = () => {
        callAPICheckIfRoomExists()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setCheck(parsed[0].value);
            })
    }

    const onClickJoinRoom = async () => {
        checkIfRoomExists();
        setSubmit1(true);
        console.log(check);
        if (roomID !== "" && check === 1) {
            callApiAddUserToExistingRoom();
            history.push('/Room');
        }
    }

    const onClickCreateRoom = async () => {
        setSubmit2(true);
        if (roomName !== "") {
            callApiAddRoom();
            callApiAddUserToNewRoom();
            history.push('/Room');
        }
    }

    const mainMessage = (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="flex-start"
                style={{ minHeight: '100vh' }}
                className={classes.mainMessageContainer}
            >
                <Grid item>
                    <Container maxWidth="xs">

                        <Typography variant="h4" color="primary">
                            Join or Create a Room
                        </Typography>

                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="roomID"
                            value={roomID}
                            onChange={(event) => {
                                setRoomID(event.target.value)
                            }}
                            label="Input the ID of the room you would like to join"
                            name="roomID"
                            autoComplete="roomID"
                            autoFocus
                            InputLabelProps={{ shrink: true }}
                            error={(roomID === "" || check !== 1) && submit1 === true}
                            helperText={((roomID === "" || check !== 1) && submit1 === true) ?
                                "Please enter an existing Room ID." : ""}
                        />

                        <Button>
                            <Link
                                onClick={onClickJoinRoom}
                            >
                                <Typography variant="h6">
                                    Join an existing Room
                                </Typography>
                            </Link>
                        </Button>

                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="roomName"
                            value={roomName}
                            onChange={(event) => {
                                setRoomName(event.target.value)
                            }}
                            label="Input the name of the room you would like to create"
                            name="roomName"
                            autoComplete="roomName"
                            autoFocus
                            InputLabelProps={{ shrink: true }}
                            error={roomName === "" && submit2 === true}
                            helperText={(roomName === "" && submit2 === true) ?
                                "Please enter a name for your new room." : ""}
                        />

                        <Button>
                            <Link
                                onClick={onClickCreateRoom}
                            >
                                <Typography variant="h6">
                                    create a new room
                                </Typography>
                            </Link>
                        </Button>

                    </Container>
                </Grid>
            </Grid>
        </Box >
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

export default withStyles(styles)(JoinCreateRoom);