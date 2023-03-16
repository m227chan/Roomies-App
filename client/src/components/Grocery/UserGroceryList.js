import React, { useState } from 'react';
import {
    Button,
    Typography,
    TextField,
    Paper,
} from "@mui/material";
import "./Grocery.css";

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const UserGroceryList = ({ userGroceryList, setSubmit }) => {

    const [quantity, setQuantity] = useState("");

    const onClickDeleteGroceryItem = async (item) => {
        setSubmit(true);
        callAPIDeleteItemUserList(item);
    }

    const callAPIDeleteItemUserList = async (item) => {
        const url = serverURL + "/api/deleteGroceryItem";
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

    const onClickAddGrocery = async (idRoomate, idGroceryItem, quantity) => {
        setSubmit(true);
        callAPIAddItemUserList(idRoomate, idGroceryItem, quantity);
    }

    const callAPIAddItemUserList = async (idRoomate, idGroceryItem, quantity) => {
        const url = serverURL + "/api/addGrocery";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                idRoomate: idRoomate,
                idGroceryItem: idGroceryItem,
                Quantity: quantity
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
                List of My Grocery Items
            </Typography>
            {userGroceryList.map((item) => {
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
                            <TextField
                                variant="outlined"
                                label="Quantity"
                                size="small"
                                onChange={(event) => {
                                    setQuantity(event.target.value)
                                }} />
                            <Button onClick={() => { onClickAddGrocery(item.idRoomate, item.id, quantity) }}>Add</Button>
                            <Button onClick={() => { onClickDeleteGroceryItem(item.id) }}>Delete</Button>
                            <br />
                        </Paper>
                    </div>
                )
            })}

        </div>
    );
}

export default UserGroceryList;