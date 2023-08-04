import React, { useState } from 'react';
import {
    Button,
    Paper,
    Link,
    Typography,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

const serverURL = "https://roomies-app.netlify.app"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const AddGroceryItemDialog = ({ user, setSubmit, open, handleClose }) => {

    const [item, setItem] = useState("");
    const [brand, setBrand] = useState("");
    const [store, setStore] = useState("");
    const [price, setPrice] = useState("");

    const [click, setClick] = useState(false);

    const [submitDialogClicked, setSubmitDialogClicked] = useState(false);

    React.useEffect(() => {
        setItem("");
        setBrand("");
        setStore("");
        setPrice("");
        setSubmitDialogClicked(false);
        setClick(false);
    
      }, [handleClose]);

    const onClickGroceryItem = async () => {
        setSubmitDialogClicked(true);

        if (item != "" && brand != "" && store != "" && price > 0) {
            // console.log(user);
            setSubmit(true);
            callApiAddGroceryItem();
            handleClose();
            setItem("");
            setBrand("");
            setStore("");
            setPrice("");
            setSubmitDialogClicked(false);
            setClick(false);
        }
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
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add a New Grocery Item</DialogTitle>
            <DialogContent>

                <TextField
                    label="Item"
                    autoFocus
                    margin="dense"
                    fullWidth
                    type="text"
                    value={item}
                    onChange={(event) => {
                        setItem(event.target.value)
                    }}
                    error={item === "" && submitDialogClicked === true}
                    helperText={(item === "" && submitDialogClicked === true) ?
                        "Please enter an item." : ""}
                />

                <TextField
                    label="Brand"
                    autoFocus
                    margin="dense"
                    fullWidth
                    type="text"
                    value={brand}
                    onChange={(event) => {
                        setBrand(event.target.value)
                    }}
                    error={brand === "" && submitDialogClicked === true}
                    helperText={(brand === "" && submitDialogClicked === true) ?
                        "Please enter a brand." : ""}
                />

                <TextField
                    label="Store"
                    autoFocus
                    margin="dense"
                    fullWidth
                    type="text"
                    value={store}
                    onChange={(event) => {
                        setStore(event.target.value)
                    }}
                    error={store === "" && submitDialogClicked === true}
                    helperText={(store === "" && submitDialogClicked === true) ?
                        "Please enter a store." : ""}
                />

                <TextField
                    label="Price"
                    autoFocus
                    margin="dense"
                    fullWidth
                    type="number"
                    value={price}
                    onChange={(event) => {
                        setPrice(event.target.value)
                        setClick(true)
                    }}
                    error={price <= 0 && submitDialogClicked === true}
                    helperText={(price <= 0 && submitDialogClicked === true) ?
                        "Please enter a valid price." : ""}
                />

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={onClickGroceryItem}>Add</Button>
                </DialogActions>

            </DialogContent>
        </Dialog>
    );
}

export default AddGroceryItemDialog;