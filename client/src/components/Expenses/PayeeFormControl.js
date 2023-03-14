import React from "react";
import "./expense.css";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

// Payee Variable Component
const PayeeFormControl = ({ payeeList, setPayeeList }) => {
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
  
    const [checkedPayee, setCheckedPayee] = React.useState({});
  
    const handlePayeeChange = (event) => {
      const selectedPayee = event.target.name;
      const tempPayeeList = payeeList;
  
      setCheckedPayee({
        ...checkedPayee,
        [selectedPayee]: event.target.checked,
      });
      if (event.target.checked) {
        tempPayeeList.push(selectedPayee);
        setPayeeList(tempPayeeList);
      }
    };
  
    const error = Object.values(checkedPayee).filter((v) => v).length < 1;
  
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
        <FormLabel component="legend">Paid To</FormLabel>
        <FormGroup>
          {roomates.map((payee) => (
            <FormControlLabel
              key={payee.id}
              control={
                <Checkbox
                  checked={checkedPayee[payee.firebaseUID] || false}
                  onChange={handlePayeeChange}
                  name={payee.firebaseUID}
                />
              }
              label={payee.Roomate}
            />
          ))}
        </FormGroup>
      </FormControl>
    );
  };

  export default PayeeFormControl;