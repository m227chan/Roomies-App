import React, { useState } from 'react';
import {
    Button,
    TextField,
    Card,
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import "./Grocery.css";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const serverURL = "https://roomies-app.netlify.app"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const UserGroceryList = ({ userGroceryList, setSubmit }) => {

    const [quantity, setQuantity] = useState("");
    const [click, setClick] = useState(false);

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
        callAPIAddItemRoomList(idRoomate, idGroceryItem, quantity);
    }

    const callAPIAddItemRoomList = async (idRoomate, idGroceryItem, quantity) => {
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
                Quantity: quantity,
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        // console.log("User settings: ", body);
        return body;
    }

    const columns = [
        {
            field: 'item',
            headerName: 'Item',
            headerAlign: 'left',
            headerClassName: 'tableHeader',
            flex: 2,
            renderCell: (params) => (
                <div style={{ fontSize: '18px' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'brand',
            headerName: 'Brand',
            headerAlign: 'left',
            headerClassName: 'tableHeader',
            flex: 2,
            renderCell: (params) => (
                <div style={{ fontSize: '18px' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'store',
            headerName: 'Store',
            headerAlign: 'left',
            headerClassName: 'tableHeader',
            flex: 2,
            renderCell: (params) => (
                <div style={{ fontSize: '18px' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'price',
            headerName: 'Price',
            headerAlign: 'left',
            headerClassName: 'tableHeader',
            flex: 1,
            renderCell: (params) => (
                <div style={{ fontSize: '18px' }}>
                    {params.value}
                </div>
            ),
        },
        {
            headerName: 'Actions',
            headerAlign: 'left',
            headerClassName: 'tableHeader',
            flex: 3,
            renderCell: (params) => (
                <>
                    <TextField
                        variant="outlined"
                        label="Quantity"
                        size="small"
                        type="number"
                        onChange={
                            (event) => {
                                setQuantity(event.target.value)
                                setClick(true)
                            }}
                        error={(quantity <= 0 && click === true) }
                        helperText={(quantity <= 0 && click === true) ?
                        "Please enter a positive amount." : ""}
                    />

                    <Button onClick={
                        () => {
                            onClickAddGrocery(
                                params.row.idRoomate,
                                params.row.id,
                                quantity)
                        }}
                    >
                        <AddIcon/>
                    </Button>
                    <Button
                        onClick={
                            () => {
                                onClickDeleteGroceryItem(params.row.id)
                            }}
                    >
                        <DeleteIcon/>
                    </Button>
                </>
            ),
        },
    ]

    return (
        <div style={{ height: 650, width: '100%' }}>
            <Card class="card" style={{ height: 650, width: '100%' }}>
                <DataGrid
                    rows={userGroceryList}
                    columns={columns}
                    pageSize={10}
                />
            </Card>
        </div>
    );
}

export default UserGroceryList;