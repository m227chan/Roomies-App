import React from "react";
import "./index.css";
import {
    Typography,
    Card,
    Grid,
    CardContent,
} from "@material-ui/core";

const DisplayRoomates = ({ roommateNames }) => {

    return (
        <div>
            <Card class="card">
                {" "}
                <CardContent>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      {" "}
                      <Typography variant={"h6"}>Room 7 Members</Typography>
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center" justifyContent="space-between">
                    {roommateNames.map((member) => (
                      <Grid item xs={6} md={6}>
                        <Typography key={member} variant={"body1"}>
                          {member}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
        </div>
    );
};

export default DisplayRoomates;