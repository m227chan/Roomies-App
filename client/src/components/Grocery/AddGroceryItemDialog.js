import React, { useState } from 'react';
import {
    Button,
    Paper,
    Link,
    Typography,
    TextField,
} from "@mui/material";

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const AddGroceryItemDialog = ({ user, setSubmit }) => {

    const [item, setItem] = useState("");
    const [brand, setBrand] = useState("");
    const [store, setStore] = useState("");
    const [price, setPrice] = useState("");

    const onClickGroceryItem = async () => {
        console.log(user);
        setSubmit(true);
        callApiAddGroceryItem();
    }

    const callApiAddGroceryItem = async () => {
        const url = serverURL + "/api/addGroceryItem";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                item: item,
                brand: brand,
                store: store,
                price: price,
                idRoomate: user.uid
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
                Add a Grocery Item
            </Typography>
            <Paper>
                <TextField
                    variant="outlined"
                    label="Item"
                    onChange={(event) => {
                        setItem(event.target.value)
                    }} />
                <h3 />
                <TextField
                    variant="outlined"
                    label="Brand"
                    onChange={(event) => {
                        setBrand(event.target.value)
                    }} />
                <h3 />
                <TextField
                    variant="outlined"
                    label="Store"
                    onChange={(event) => {
                        setStore(event.target.value)
                    }} />
                <h3 />
                <TextField
                    variant="outlined"
                    label="Price"
                    onChange={(event) => {
                        setPrice(event.target.value)
                    }} />
                <h3 />
                <Button>
                    <Link
                        onClick={onClickGroceryItem}
                    >
                        <Typography variant="h6">
                            Add
                        </Typography>
                    </Link>
                </Button>
            </Paper>
        </div>
    );
}

export default AddGroceryItemDialog;