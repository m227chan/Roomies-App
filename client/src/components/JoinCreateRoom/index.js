import React, { useState } from 'react';
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

const JoinCreateRoom = (props) => {

    const [roomID, setRoomID] = useState("");
    const [submit, setSubmit] = useState(false);

    const { classes } = props;

    const onClickJoinRoom = async () => {
        setSubmit(true);
        if (roomID !== "") {
            history.push('/Room')
        }
    }

    const onClickCreateRoom = async () => {
        history.push('/Room')
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
                                    setRoomID(event.target.value);
                                }}
                                label="Input the ID of the room you would like to join"
                                name="roomID"
                                autoComplete="roomID"
                                autoFocus
                                InputLabelProps={{ shrink: true }}
                                error={roomID === "" && submit === true}
                                helperText={(roomID === "" && submit === true) ?
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