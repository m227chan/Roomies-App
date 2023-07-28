import React, {useState} from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";

const serverURL = "https://roomies-app.netlify.app/"; //enable for dev mode

const DeleteEventDialog = ({open, handleClose, event, title}) => {

    const handleDelete = () => {
        callAPIDeleteEvent(event.id);
        event.remove();
        handleClose();
    };

    const callAPIDeleteEvent = async (eventID) => {
        // console.log("getExpenseReport called");
        const url = serverURL + "/api/deleteEvent";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                eventID: eventID,
            }),
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        // console.log("User settings: ", body);
        return body;
    };

    return (
        <div>
            <Dialog
                open={open} 
                onClose={handleClose}
            >
                <DialogTitle>Delete Event</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete the event "{title}"?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteEventDialog;