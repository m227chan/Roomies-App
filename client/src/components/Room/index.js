import React, { useState } from "react";
import "./index.css";
import {
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardActions,
  CardContent,
  Box,
  Link,
} from "@material-ui/core";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { getAdditionalUserInfo, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import CustomAppBar from "../CustomAppBar";
import { Container } from "@material-ui/core";
import history from "../Navigation/history";

const roommateNames = [
  "Matthew Chan",
  "Zack Zammit",
  "Maximilian Horbik",
  "Sunischit Thapa",
];

const roommateGrocery = [
  { name: "Matthew Chan", item: "Chicken" },
  { name: "Maximilian Horbik", item: "Polish Stew" },
  { name: "Zach Zammit", item: "Ice Cap" },
];

const roommateCalendar = [
  {
    name: "Garbage Day",
    date: "February 15th, 2023",
    time: "10:00AM to 1:00PM",
  },
  {
    name: "Happy Birthday",
    date: "February 20th, 2023",
    time: "6:00PM to 9:00PM",
  },
];

const Room = () => {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currUser) => {
    setUser(currUser);
  });

  const mainMessage = (
    <Box sx={{ flexGrow: 1 }}>
      <CustomAppBar />
      <Container class="container">
        <Grid container spacing={2} style={{ margin: "0px" }}>
          {/* This is the Welcome Message */}
          <Grid item xs={6} md={8}>
            <Typography variant={"h4"}>Welcome, {user.email}</Typography>
          </Grid>
          {/*  This shows the user the other roommates in the room */}
          <Grid item xs={6} md={4}>
            <Card class="card">
              {" "}
              <CardContent>
                <Grid container alignItems="center" justify="space-between">
                  <Grid item>
                    {" "}
                    <Typography variant={"h6"}>Room 7 Members</Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center" justify="space-between">
                  {roommateNames.map((member) => (
                    <Grid item xs={6} md={6}>
                      <Typography key={member} variant={"p"}>
                        {member}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* This shows the top three calendar reminders */}
          <Grid item xs={6} md={8}>
            <Card class="card">
              {" "}
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Card class="calendar-top-card">
                      {" "}
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
                  {roommateCalendar.map((member) => (
                    <Grid item xs={12}>
                      <Card class="calendar-card">
                        {" "}
                        <CardContent>
                          <Typography variant={"h5"}> {member.name}</Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant={"h6"}>
                                {member.date}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              {" "}
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
                <Link
                  onClick={() => history.push("/Calendar")}
                  style={{ cursor: "pointer" }}
                >
                  <Typography variant="p">SEE ALL UPCOMING EVENTS</Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
          {/* The Grid for the right modules */}
          <Grid item xs={6} md={4}>
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
                                rowSpacing={1}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                              >
                                <Grid xs={6}>
                                  <Typography key={member} variant={"p"}>
                                    {member.item}
                                  </Typography>
                                </Grid>
                                <Grid xs={6}>
                                  <Typography key={member} variant={"p"}>
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  return (
    <MuiThemeProvider>
      <div>
        <Paper class="paper">{mainMessage}</Paper>
      </div>
    </MuiThemeProvider>
  );
};

export default Room;
