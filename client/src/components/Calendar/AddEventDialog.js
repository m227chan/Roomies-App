import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";

const serverURL = "https://roomies-app.netlify.app/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const AddEventDialog = ({ open, handleClose, selected, user, creator }) => {

    const [title, setTitle] = useState("");
    const [submitClicked, setSubmitClicked] = useState(false);

    const handleAddEvent = () => {
        setSubmitClicked(true);
        if (title) {
            const calendarApi = selected.view.calendar;
            calendarApi.unselect();
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay,
                creator,
            });

            console.log(selected.endStr);

            callAPIAddEvent(
                title,
                selected.startStr,
                selected.endStr,
                selected.allDay
            );

            // console.log("Start " + selected.startStr);
            // console.log("End " + selected.endStr);
            // console.log("All Day" + selected.allDay);
            handleClose();
        }
    };

    const callAPIAddEvent = async (title, start, end, allDay) => {
        const url = serverURL + "/api/addEvent";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                firebaseUID: user.uid,
                title: title,
                allDay: allDay,
                start: start,
                start: start,
                allDay: allDay,
                end: end,
                end: end,
                tag: "",
                description: "",
                consequence: 0,
                allDay: allDay,
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
                <DialogTitle>Add Event</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Add Event Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        error={title === "" && submitClicked === true}
                        helperText={(title === "" && submitClicked === true) ?
                            "Please enter a title." : ""}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddEvent}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddEventDialog;