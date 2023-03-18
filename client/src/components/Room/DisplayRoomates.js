import React from "react";
import "./index.css";
import {
    Typography,
    Card,
    Grid,
    CardContent,
    Avatar,
    Box,
} from "@material-ui/core";

const DisplayRoomates = ({ roomateData }) => {
    const avatarStyle = {
        backgroundColor: '#FF8700',
    };
    return (
        <div>
            <Card class="card">
                <CardContent>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Grid item>
                            <Box width="100%" p={1}>
                                <Typography variant={"h6"}>
                                    <b>ROOMMATES</b>
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        {roomateData.map((roomate, index) => (
                            <Grid item xs={1} key={index}>
                                <Box width="100%" p={1}>
                                <Avatar align='right' style={avatarStyle}>
                                    {roomate.firstName[0]}
                                </Avatar>
                                <Typography
                                    variant={"body1"}
                                    align='center'
                                >
                                    <b>{roomate.firstName + " " + roomate.lastName}</b>
                                </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
};

export default DisplayRoomates;