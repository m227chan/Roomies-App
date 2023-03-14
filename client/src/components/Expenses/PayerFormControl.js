import React from "react";
import "./expense.css";
import {
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const PayerFormControl = ({ payer, setPayer, roomates }) => {

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