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
import TextField from '@material-ui/core/TextField';

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

const PasswordChange = (props) => {

    const [currPassword, setCurrPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");

    const { classes } = props;

    const mainMessage = (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>

                    <Button color="inherit">
                        <Link
                            color="inherit"
                            style={{ cursor: "pointer" }}
                            onClick={() => history.push('/Settings')}
                        >
                            <Typography variant="h6" color="inherit">
                                Back
                            </Typography>
                        </Link>
                    </Button>

                </Toolbar>
            </AppBar>

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="flex-start"
                style={{ minHeight: '100vh' }}
                className={classes.mainMessageContainer}
            >
                <Grid item>
                    <Typography
                        variant={"h3"}
                        className={classes.mainMessage}
                        align="flex-start"
                    >
                        Change Password
                    </Typography>

                    <TextField
                        label="Current Password"
                        multiline
                        inputProps={{ maxLength: 50 }}
                        value={props.value}
                        error={currPassword === ""}
                        helperText={(props.value === "") ?
                            "Please enter current password." : ""}
                        // onChange={handleChange}
                    />

                    <TextField
                        label="New Password"
                        multiline
                        inputProps={{ maxLength: 50 }}
                        value={props.value}
                        error={newPassword1 === ""}
                        helperText={(newPassword2 === "") ?
                            "Please enter a new password." : ""}
                        // onChange={handleChange}
                    />

                    <TextField
                        label="Re-enter New Password"
                        multiline
                        inputProps={{ maxLength: 50 }}
                        value={props.value}
                        error={newPassword2 === ""}
                        helperText={(newPassword2 === "") ?
                            "Please enter a new password." : ""}
                        // onChange={handleChange}
                    />

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

export default withStyles(styles)(PasswordChange);