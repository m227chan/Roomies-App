import React, { useState } from "react";
import "./expense.css";
import {
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";

const PayerFormControl = ({ payer, setPayer, roomates }) => {

    const [changeStatus, setChangeStatus] = useState(false);

    const handlePayerChange = (event) => {
        setChangeStatus(true);
        const selectedPayer = event.target.value;
        setPayer(selectedPayer);
    };

    return (
        <div>
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
        </div>
    );
};

export default PayerFormControl;