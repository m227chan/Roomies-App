import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import "./Grocery.css";
import CustomAppBar from '../CustomAppBar';
import AddGroceryItemDialog from './AddGroceryItemDialog';
import UserGroceryList from './UserGroceryList';
import RoomGroceryList from './RoomGroceryList';

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const Grocery = () => {

  const [userGroceryList, setUserGroceryList] = useState([]);
  const [roomGroceryList, setRoomGroceryList] = useState([]);

  const [user, setUser] = useState({});
  const [submit, setSubmit] = useState(false);

  onAuthStateChanged(auth, (currUser) => {
    setUser(currUser);
  });

  useEffect(() => {

    callViewGrocery()
      .then(res => {
        // console.log("callApiViewGrocery returned: ", res)
        var parsed = JSON.parse(res.express);
        // console.log("callApiviewGrocery parsed: ", parsed);
        setUserGroceryList(parsed);
        setSubmit(false);
        // console.log(viewGroup);
      })

    callViewGroupGrocery()
      .then(res => {
        // console.log("callApiViewGroupGrocery returned: ", res)
        var parsed = JSON.parse(res.express);
        // console.log("callApiviewGroupGrocery parsed: ", parsed);
        setRoomGroceryList(parsed);
        setSubmit(false);
      })

  }, [submit, user]);

  const callViewGrocery = async () => {
    const url = serverURL + "/api/viewGrocery";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        idRoomate: user.uid
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  }

  const callViewGroupGrocery = async () => {
    const url = serverURL + "/api/viewGroupGrocery";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        idRoomate: user.uid
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Paper class="paper">
        <Box sx={{ flexGrow: 1 }}>

          <CustomAppBar />

          <Grid
            container
            spacing={3}
            columns={16}
            justifyContent="center"
            style={{ minHeight: "100vh" }}
            className="mainMessageContainer"
          >

            <Grid item xs={6} md={7.5}>

              <Typography
                variant={"h3"}
              >
                My Grocery Items
              </Typography>

              <UserGroceryList
                userGroceryList={userGroceryList}
                setSubmit={setSubmit}
              />

              <Button
                variant="contained"
                onClick={handleClickOpen}
              >
                Add Grocery Item
              </Button>

              <AddGroceryItemDialog
                user={user}
                setSubmit={setSubmit}
                open={open}
                handleClose={handleClose}
              />

            </Grid>

            <Grid item xs={6} md={7.5}>

              <Typography
                variant={"h3"}
              >
                Room Grocery List
              </Typography>

              <RoomGroceryList
                user={user}
                roomGroceryList={roomGroceryList}
                setSubmit={setSubmit}
              />

            </Grid>

          </Grid>

        </Box>
      </Paper>
    </div>
  );
}

export default Grocery;