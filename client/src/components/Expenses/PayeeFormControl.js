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

// Payee Variable Component
const PayeeFormControl = ({ payeeList, setPayeeList, roomates }) => {

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