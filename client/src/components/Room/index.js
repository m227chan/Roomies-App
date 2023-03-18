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
import Wallet from "./Wallet";

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

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const Room = () => {
  const [user, setUser] = useState({});
  const [roomateData, setRoomateData] = useState([]);

  onAuthStateChanged(auth, (currUser) => {
    setUser(currUser);
  });

  useEffect(() => {
    callApiGetRoomPageInfo().then((res) => {
      var parsed = JSON.parse(res.express);
      console.log(parsed);
      setRoomateData(parsed);
    });
  }, [user]);

  const callApiGetRoomPageInfo = async () => {
    const url = serverURL + "/api/getRoomPageInfo";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        firebaseUID: user.uid
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  }

  return (
    <div>
      <CustomAppBar />
      
      <Box sx={{ flexGrow: 1, margin: "50px" }}>

        <Container class="container">
          <Grid container spacing={2} style={{ margin: "0px" }}>

            <Grid item xs={6} md={7}>
              <WelcomeMessage roomateData={roomateData} user={user}/>
              <br/>
              <UpcomingEvents roommateCalendar={roommateCalendar} />
            </Grid>

            <Grid item xs={6} md={5}>
              <DisplayRoomates roomateData={roomateData} />
              <br/>
              <Wallet roomateData={roomateData} user={user}/>
              <br/>
              <DisplayTopGroceryList roommateGrocery={roommateGrocery} />
            </Grid>

          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Room;
