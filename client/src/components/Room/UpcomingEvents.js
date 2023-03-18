import React from "react";
import "./index.css";
import {
    Typography,
    Card,
    Grid,
    CardContent,
    Button,
} from "@material-ui/core";
import history from "../Navigation/history";

const UpcomingEvents = ({ roommateCalendar }) => {

    return (
        <div>
            <Card class="card">
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>

                            <Button
                                onClick={() => history.push("/Calendar")}
                                style={{ cursor: "pointer" }}
                            >
                                <Typography variant="h6"><b>{"Upcoming Events>"}</b></Typography>
                            </Button>

                            <Card class="calendar-top-card">
                                <CardContent>
                                    <Typography variant={"h5"}>Quiet Hours</Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography variant={"h6"}>
                                                February 10th
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            {" "}
                                            <Typography variant={"h6"}>
                                                3:00PM to 4:00PM
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        {roommateCalendar.map((member, index) => (
                            <Grid item xs={12} key={index}>
                                <Card class="calendar-card">
                                    <CardContent>
                                        <Typography variant={"h5"}> {member.name}</Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Typography variant={"h6"}>
                                                    {member.date}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant={"h6"}>
                                                    {member.time}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpcomingEvents;