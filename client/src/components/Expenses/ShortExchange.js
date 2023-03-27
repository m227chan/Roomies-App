import React, { useEffect, useState } from "react";
import "./Expense.css";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Avatar,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";
const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const ShortExchange = () => {
  const [user, setUser] = useState({});
  const [expenses, setExpenses] = useState([]);
  const [shortExchangeList, setShortExchangeList] = useState([]);
  const [roomateData, setRoomateData] = useState([]);
  const [onHoverAvatar, setOnHoverAvatar] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sumArray = [];
  const avatarStyle = {
    backgroundColor: "#FF8700",
    justifyContent: "center",
    alignItems: "center",
  };

  onAuthStateChanged(auth, (currUser) => {
    setUser(currUser);
  });

  const callApiGetRoomPageInfo = async () => {
    const url = serverURL + "/api/getRoomPageInfo";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        firebaseUID: user.uid,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  };

  const callAPIShortExchange = async () => {
    const url = serverURL + "/api/shortExchange";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        firebaseUID: user.uid,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  };

  const getShortExchange = () => {
    if (shortExchangeList.length === 0) {
      callAPIShortExchange().then((res) => {
        var parsed = JSON.parse(res.express);
        setShortExchangeList(parsed[1]);
      });
    }
  };

  useEffect(() => {
    console.log("yes");
    if (user) {
      getShortExchange();
      callApiGetRoomPageInfo().then((res) => {
        var parsed = JSON.parse(res.express);
        // console.log(parsed);
        setRoomateData(parsed);
      });
    }
  }, [user]);

  return (
    <div>
      <Card class="card">
        <CardContent
          onMouseMove={(event) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            {roomateData.map((roomate, index) => (
              <Grid key={index}>
                <Box width="100%" p={2}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    item
                  >
                    <Avatar
                      style={avatarStyle}
                      onMouseEnter={() => {
                        setIsHovering(true);
                        setOnHoverAvatar(roomate.id);
                      }}
                      onMouseLeave={() => {
                        setIsHovering(false);
                        setOnHoverAvatar(null);
                      }}
                    >
                      {roomate.firstName[0]}
                    </Avatar>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    item
                  >
                    <Typography variant={"body1"} align="center">
                      <b>{roomate.firstName + " " + roomate.lastName}</b>
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      {isHovering && (
        <Card
          className="card"
          style={{
            position: "absolute",
            zIndex: 9999,
            left: `${mousePosition.x + 10}px`,
            top: `${mousePosition.y + 10}px`,
            backgroundColor: "#68B984",
            padding: "1rem",
            color: "#FFFFFF",
          }}
        >
          {shortExchangeList
            .filter((expense) => expense.id === onHoverAvatar)
            .map((expense, index) => (
              <Typography key={index}>{expense.transaction}</Typography>
            ))}
        </Card>
      )}
    </div>
  );
};

export default ShortExchange;
