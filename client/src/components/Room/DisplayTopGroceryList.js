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

const DisplayTopGroceryList = ({ roomTopGrocery }) => {
    return (
        <div>
            <Card class="card">
                <CardContent>

                    <Button
                        onClick={() => history.push("/Grocery")}
                        style={{ cursor: "pointer" }}
                    >
                        <Typography variant="h6"><b>{"Grocery List>"}</b></Typography>
                    </Button>

                    <Grid container spacing={2}>
                        {roomTopGrocery.map((grocery, index) => (
                            <Grid item xs={12} key={index}>
                                <Card class="grocery-card">
                                    <CardContent>
                                        <Grid
                                            container
                                            rowspacing={1}
                                            columnspacing={{ xs: 1, sm: 2, md: 3 }}
                                        >
                                            <Grid item xs={4}>
                                                <Typography key={index} variant={"body1"}>
                                                    <b>{grocery.item}</b>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography key={index} variant={"body1"}>
                                                    Quantity: x{grocery.Quantity}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography key={index} variant={"body1"}>
                                                    ${grocery.price}
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
