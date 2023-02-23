import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const GetRoomates = () => {
  const [roomates, setRoomates] = React.useState({});

  const user = auth.currentUser;

  const callAPIGetRoomates = async () => {
    const url = serverURL + "/api/getRoomates";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        user: user.uid,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  };

  const getRoomateList = () => {
    callAPIGetRoomates().then((res) => {
      var parsed = JSON.parse(res.express);
      setRoomates(parsed);
    });
  };

  getRoomateList();

  return roomates;
};

export default GetRoomates;
