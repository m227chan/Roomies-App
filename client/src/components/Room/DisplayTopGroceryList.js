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
            <Card class="card">
                {" "}
                <CardContent>
                    <Typography variant={"h6"}>
                        Roommate's Grocery List
                    </Typography>
                    <Grid container spacing={2}>
                        {roommateGrocery.map((member, index) => (
                            <Grid item xs={12} key={index}>
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
        </div>
    );
};

export default DisplayTopGroceryList;
