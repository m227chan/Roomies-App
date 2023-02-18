import React, { useState } from "react";

const Landing = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [submitClicked, setSubmitClicked] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);

    const [user, setUser] = useState({});

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

export default withStyles(styles)(Landing);