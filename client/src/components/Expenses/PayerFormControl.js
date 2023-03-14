import React, { useState } from "react";
import "./expense.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper,
  Box,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CustomAppBar from "../CustomAppBar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const PayerFormControl = ({ payer, setPayer }) => {
    const [roomates, setRoomates] = React.useState([]);
    const [user, setUser] = React.useState({});
  
    React.useEffect(() => {
      onAuthStateChanged(auth, (currUser) => {
        setUser(currUser);
      });
    }, []);
  
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
  
    const getRoomateList = React.useCallback(() => {
      callAPIGetRoomates().then((res) => {
        var parsed = JSON.parse(res.express);
        setRoomates(parsed);
      });
    }, [callAPIGetRoomates]);
  
    // Create a state for the checked roomates
    const [checkedPayer, setCheckedPayer] = React.useState({});
  
    const handlePayerChange = (event) => {
      const selectedPayer = event.target.name; // use event.target.name instead of event.target.Roomate
      setCheckedPayer({
        ...checkedPayer,
        [selectedPayer]: event.target.checked,
      });
      if (event.target.checked) {
        setPayer(selectedPayer);
      }
    };
  
    const error = Object.values(checkedPayer).filter((v) => v).length !== 1;
  
    React.useEffect(() => {
      getRoomateList();
    }, [user]);
  
    // console.log(roomates);
  
    return (
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">Paid By</FormLabel>
        <FormGroup>
          {roomates.map((payer) => (
            <FormControlLabel
              key={payer.id}
              control={
                <Checkbox
                  checked={checkedPayer[payer.firebaseUID] || false}
                  onChange={handlePayerChange}
                  name={payer.firebaseUID}
                />
              }
              label={payer.Roomate}
            />
          ))}
        </FormGroup>
      </FormControl>
    );
  };

  export default PayerFormControl;