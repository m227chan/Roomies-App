import React from "react";
import {
    Typography,
    Card,
    Box,
    Grid,
} from "@material-ui/core";

const WelcomeMessage = ({ roomateData, user }) => {

    let idRoom = "";
    let roomName ="";
    let name = "";

    if (roomateData.length !== 0) {
        const index = roomateData.findIndex((roommate) => roommate.firebaseUID === user.uid);
        const row = roomateData[index];
        idRoom = row.idRoom;
        roomName = row.roomName;
        name = row.firstName + " " + row.lastName;
    }

    return (
        <div>
            <Card class='welcome-message-card'>
                <Grid container>
                    <Grid item xs={7} align='left'>
                        <Box width="100%" p={4}>
                            <Typography variant={"h4"}>Hello, {name}!</Typography>
                            <br/>
                            <Typography variant={"h5"}>Welcome to {roomName}!</Typography>
                            <Typography variant={"h6"}>The Room ID for {roomName} is {idRoom}.</Typography>
                            <Typography variant={"h6"}>Organize all your roommate needs all in one place. Remember to keep everything up-to-date!</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={5} align='right'>
                        <Box
                            component="img"
                            sx={{ width: "100%", height: "100%" }}
                            alt="image goes here"
                            src="../friendly-handshake-rafiki.png"
                            p={2}
                        />
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};

export default WelcomeMessage;
