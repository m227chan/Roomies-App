import React, { useState } from "react";
import "./expense.css";
import {
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Radio,
    RadioGroup,
} from "@mui/material";

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const PayerFormControl = ({ payer, setPayer, roomates }) => {

    const [changeStatus, setChangeStatus] = useState(false);

    const handlePayerChange = (event) => {
        setChangeStatus(true);
        const selectedPayer = event.target.value;
        setPayer(selectedPayer);
    };

    return (
        <FormControl
            required
            error={!payer && changeStatus === true}
            component="fieldset"
            sx={{ m: 3 }}
            variant="standard"
        >
            <FormLabel component="legend">Paid By</FormLabel>
            <RadioGroup value={payer} onChange={handlePayerChange}>
                {roomates.map((roommate) => (
                    <FormControlLabel
                        key={roommate.id}
                        value={roommate.firebaseUID}
                        control={<Radio />}
                        label={roommate.Roomate}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default PayerFormControl;