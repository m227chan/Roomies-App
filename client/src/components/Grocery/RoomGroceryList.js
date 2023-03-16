import React from 'react';
import {
    Typography,
    Paper,
    Button,
} from "@mui/material";
import "./Grocery.css";

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const RoomGroceryList = ({ roomGroceryList, setSubmit, user }) => {

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

    const onClickPurchase = async (item) => {
        setSubmit(true);
        callApiPurchase(item)
        callApiDeleteItemRoomList(item);
    }

    const today = async () => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return `${yyyy}-${mm}-${dd}`;
    }

    const callApiPurchase = async (item) => {
        console.log(item);
        const url = serverURL + "/api/addExpenseGrocery";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                amount: item.price,
                spender: user.uid,
                debtor: item.idRoomate,
                tag: "Grocery",
                comment: item.brand + " " + item.item + " from " + item.store,
                date: await today()
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        // console.log("User settings: ", body);
        return body;
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
                id: item.id
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
                            <Button onClick={() => {onClickPurchase(item)}}>Purchased</Button>
                        </Paper>
                    </div>
                )
            })}
        </div>
    );
}

export default RoomGroceryList;

