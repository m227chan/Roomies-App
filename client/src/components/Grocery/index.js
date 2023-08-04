import React, { useState, useEffect } from "react";
import {
  Button,
  Paper,
  Box,
  Grid,
  Typography,
  Container,
  Link,
} from "@material-ui/core";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import "./Grocery.css";
import SideNav from "../CustomAppBar/sideNav";
import AddGroceryItemDialog from "./AddGroceryItemDialog";
import UserGroceryList from "./UserGroceryList";
import RoomGroceryList from "./RoomGroceryList";

const serverURL = "https://roomies-app.netlify.app"; //enable for dev mode

const Grocery = () => {
  const [userGroceryList, setUserGroceryList] = useState([]);
  const [roomGroceryList, setRoomGroceryList] = useState([]);

  const [user, setUser] = useState({});
  const [submit, setSubmit] = useState(false);

  onAuthStateChanged(auth, (currUser) => {
    setUser(currUser);
  });

  useEffect(() => {
    if (user) {
      callViewGrocery().then((res) => {
        var parsed = JSON.parse(res.express);
        setUserGroceryList(parsed);
        setSubmit(false);
      });

      callViewGroupGrocery().then((res) => {
        var parsed = JSON.parse(res.express);
        setRoomGroceryList(parsed);
        setSubmit(false);
      });
    } else {
      onAuthStateChanged(auth, (currUser) => {
        setUser(currUser);
      });
    }
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
        idRoomate: user.uid,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  };

  const callViewGroupGrocery = async () => {
    const url = serverURL + "/api/viewGroupGrocery";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        idRoomate: user.uid,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid>
        <SideNav />
      </Grid>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container class="container">
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
              columns={16}
              style={{ minHeight: "100vh", marginTop: "10vh" }}
            >
              <Grid item xs={6} md={7.5}>
                <Grid
                  item
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant={"h4"}>My Grocery Items</Typography>
                  <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    class="leave-room-btn"
                  >
                    <Typography variant="p">Add grocery item</Typography>
                  </Button>
                </Grid>
                <br />
                <UserGroceryList
                  userGroceryList={userGroceryList}
                  setSubmit={setSubmit}
                />

                <AddGroceryItemDialog
                  user={user}
                  setSubmit={setSubmit}
                  open={open}
                  handleClose={handleClose}
                />
              </Grid>

              <Grid item xs={6} md={7.5}>
                <Typography variant={"h4"}>Room Grocery List</Typography>
                <br />
                <RoomGroceryList
                  user={user}
                  roomGroceryList={roomGroceryList}
                  setSubmit={setSubmit}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Grocery;
