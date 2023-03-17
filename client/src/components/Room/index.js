import React, { useState, useEffect } from "react";
import "./index.css";
import {
  Grid,
  Box,
} from "@material-ui/core";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import CustomAppBar from "../CustomAppBar";
import { Container } from "@material-ui/core";
import WelcomeMessage from "./WelcomeMessage";
import DisplayRoomates from "./DisplayRoomates";
import UpcomingEvents from "./UpcomingEvents";
import DisplayTopGroceryList from "./DisplayTopGroceryList";

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

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <CustomAppBar />
        <Container class="container">
          <Grid container spacing={2} style={{ margin: "0px" }}>

            {/* This is the Welcome Message */}
            <Grid item xs={6} md={8}>
              <WelcomeMessage user={user} />
            </Grid>

            {/*  This shows the user the other roommates in the room */}
            <Grid item xs={6} md={4}>
              <DisplayRoomates roommateNames={roommateNames} />
            </Grid>

            {/* This shows the top three calendar reminders */}
            <Grid item xs={6} md={8}>
              <UpcomingEvents roommateCalendar={roommateCalendar} />
            </Grid>

            {/* The Grid for the right modules */}
            <Grid item xs={6} md={4}>
              <DisplayTopGroceryList roommateGrocery={roommateGrocery} />
            </Grid>

          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Room;
