import React from "react";
import "./index.css";
import {
    Typography,
    Card,
    CardContent,
    Grid,
    Box,
    Button,
} from "@material-ui/core";
import {
    Chart,
    PieSeries,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import history from "../Navigation/history";

const Wallet = ({ roomateData, user }) => {

    let message = "You are owed $0";

    if (roomateData.length !== 0) {
        const index = roomateData.findIndex((roommate) => roommate.firebaseUID === user.uid);
        const row = roomateData[index];
        const amount = row.owed;
        if (amount > 0) {
            message = "You owe a total of $" + amount + ".";
        } else {
            message = "You are owed a total of $" + amount * -1 + ".";
        }
    }

    return (
        <div>
            <Card class="card" style={{ height: "100%" }}>
                <CardContent style={{ height: "100%" }}>
                    <Grid container>
                        <Grid item xs={12}>

                            <Button
                                onClick={() => history.push("/Expenses")}
                                style={{ cursor: "pointer" }}
                            >
                                <Typography variant="h6"><b>{"Expenses>"}</b></Typography>
                            </Button>

                            <Box display="flex" justifyContent="flex-start" width="100%" p={1}>
                                <Typography variant={"h5"}>{message}</Typography>
                            </Box>

                            <Box  justifyContent="flex-start" style={{ width: "100%" }} p={1}>
                                <Chart
                                    data={roomateData}
                                    style={{ maxHeight: 250, width: "100%" }}
                                >
                                    <PieSeries
                                        valueField="owed"
                                        argumentField="firstName"
                                        innerRadius={0.75}
                                    />
                                    <Legend position="left"/>
                                    <Animation />
                                </Chart>
                            </Box>

                        </Grid>

                    </Grid>

                </CardContent>
            </Card>
        </div>
    );
};

export default Wallet;
