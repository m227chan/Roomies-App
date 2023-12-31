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

  return (
    <div>
      <Card class="roommates-display">
        <CardContent>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Box width="100%" p={1}>
                <Typography variant={"h6"}>
                  <b>Roommates</b>
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              justifyContent="space-between"
              style={{
                backgroundColor: "#EAEAEA",
                borderRadius: "10px",
                padding: "1rem",
              }}
            >
              {roomateData
                .filter((roomate) => roomate !== row)
                .map((roomate, index) => (
                  <Grid item key={index}>
                    <Box width="100%" p={2}>
                      <Grid
                        item
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Avatar style={avatarStyle}>
                          {roomate.firstName[0]}
                        </Avatar>
                      </Grid>
                      <Grid
                        item
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography variant={"body1"} align="center">
                          <b>{roomate.firstName + " " + roomate.lastName}</b>
                        </Typography>
                      </Grid>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default DisplayRoomates;
