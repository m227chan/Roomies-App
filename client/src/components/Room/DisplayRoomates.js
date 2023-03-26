import React from "react";
import {
  Typography,
  Card,
  Grid,
  CardContent,
  Box,
  Avatar,
} from "@material-ui/core";

const DisplayRoomates = ({ roomateData, user }) => {
  const avatarStyle = {
    backgroundColor: "#FF8700",
    justifyContent: "center",
    alignItems: "center",
  };

  let row = [];

  if (roomateData.length !== 0) {
    const index = roomateData.findIndex(
      (roommate) => roommate.firebaseUID === user.uid
    );
    row = roomateData[index];
  }

  console.log(roomateData);

  return (
    <div>
      <Card class="card">
        <CardContent>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Box width="100%" p={1}>
                <Typography variant={"h6"}>
                  <b>ROOMMATES</b>
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            {roomateData
              .filter((roomate) => roomate !== row)
              .map((roomate, index) => (
                <Grid item key={index}>
                  <Box width="100%" p={2}>
                    <Avatar style={avatarStyle}>{roomate.firstName[0]}</Avatar>

                    <Typography variant={"body1"} align="center">
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
