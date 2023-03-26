import React from 'react';
import {
    Button,
    Card,
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import "./Grocery.css";
import DeleteIcon from '@mui/icons-material/Delete';

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const RoomGroceryList = ({ roomGroceryList, setSubmit, user }) => {

    const onClickPurchase = async (item) => {
        console.log(item);
        setSubmit(true);
        callApiPurchase(item)
        callApiDeleteItemRoomList(item);
    }

    const onClickDelete = async (item) => {
        setSubmit(true);
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
        console.log(user.uid);
        const url = serverURL + "/api/addExpenseGrocery";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                amount: item.price * item.Quantity,
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

    const columns = [
        {
            field: 'item',
            headerName: 'Item',
            headerAlign: 'left',
            headerClassName: 'tableHeader',
            flex: 1.5,
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
            flex: 1.5,
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
            flex: 1.5,
            renderCell: (params) => (
                <div style={{ fontSize: '18px' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'Quantity',
            headerName: 'Quantity',
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
            field: 'price',
            headerName: 'Price Per Item',
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
            flex: 1.5,
            renderCell: (params) => (
                <>
                    <Button onClick={() => { onClickPurchase(params.row) }}>Purchase</Button>
                    <br/>
                    <br/>
                    <Button onClick={() => { onClickDelete(params.row) }}>
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
                    rows={roomGroceryList}
                    columns={columns}
                    pageSize={10}
                />
            </Card>
        </div>
    );
}

export default RoomGroceryList;