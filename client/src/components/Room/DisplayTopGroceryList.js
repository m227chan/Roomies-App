import React from "react";
import "./index.css";
import {
    Typography,
    Card,
    Grid,
    CardContent,
} from "@material-ui/core";

const DisplayTopGroceryList = ({ roommateGrocery }) => {

    return (
        <div>
            <Grid container style={{ height: "100%" }} spacing={2}>
                <Grid item xs={12}>
                    <Card class="card">
                        {" "}
                        <CardContent>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                spacing={1}
                            >
                                <Grid item xs={5}>
                                    <Typography variant={"h6"}>You're owed</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography variant={"h4"}>$1000.00</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card class="card">
                        {" "}
                        <CardContent>
                            <Typography variant={"h6"}>
                                Roommate's Grocery List
                            </Typography>
                            <Grid container spacing={2}>
                                {roommateGrocery.map((member) => (
                                    <Grid item xs={12}>
                                        <Card class="grocery-card">
                                            {" "}
                                            <CardContent>
                                                <Grid
                                                    container
                                                    rowspacing={1}
                                                    columnspacing={{ xs: 1, sm: 2, md: 3 }}
                                                >
                                                    <Grid item xs={6}>
                                                        <Typography key={member} variant={"body1"}>
                                                            {member.item}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography key={member} variant={"body1"}>
                                                            {member.name}
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
                </Grid>
            </Grid>
        </div>
    );
};

export default DisplayTopGroceryList;
