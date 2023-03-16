import React from 'react';
import {
    Typography,
    Paper,
    Button,
} from "@mui/material";
import "./Grocery.css";

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const RoomGroceryList = ({roomGroceryList, setSubmit}) => {

    const calculateTotal = (price, quantity) => {
        try {
            if (isNaN(price) || isNaN(quantity)) {
                return null;
            }
            const total = (price * quantity).toString();
            return 'Total Cost is $' + total + '.';

        } catch (e) {
            return null;
        }
    }

    const onClickDeleteItemRoomList = async (item) => {
        setSubmit(true);
        callApiDeleteItemRoomList(item);
    }

    const callApiDeleteItemRoomList = async (item) => {
        const url = serverURL + "/api/deleteGrocery";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                id: item
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        // console.log("User settings: ", body);
        return body;
    }

    return (
        <div>
            <Typography
                variant={"h3"}
            >
                Room Grocery List
            </Typography>
            {roomGroceryList.map((item) => {
                return (
                    <div key={item.id}>
                        <Paper>
                            <Typography variant='body1'>Item: {item.item}</Typography>
                            <br />
                            <Typography variant='body1'>Brand: {item.brand}</Typography>
                            <br />
                            <Typography variant='body1'>Store: {item.store}</Typography>
                            <br />
                            <Typography variant='body1'>Price: {item.price}</Typography>
                            <br />
                            <Typography variant='body1'>Quantity: {item.Quantity}</Typography>
                            <br />
                            <Typography variant='body1'>{calculateTotal(item.price, item.Quantity)}</Typography>
                            <br />
                            <Button onClick={() => { onClickDeleteItemRoomList(item.id) }}>Purchased</Button>
                        </Paper>
                    </div>
                )
            })}
        </div>
    );
}

export default RoomGroceryList;

