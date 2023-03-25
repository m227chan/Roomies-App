import React, { useState, useEffect } from "react";
import { Box, Container, Grid } from "@material-ui/core";
import SideNav from "../CustomAppBar/sideNav";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";

import DeleteEventDialog from "./DeleteEventDialog"
import AddEventDialog from "./AddEventDialog"

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [creator, setCreator] = useState("");
  const [user, setUser] = useState({});
  const [eventsLoaded, setEventsLoaded] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [eventDelete, setEventDelete] = useState({});
  const [selectedAdd, setSelectedAdd] = useState({});
  const [title, setTitle] = useState("");

  onAuthStateChanged(auth, (currUser) => {
    setUser(currUser);
  });

  useEffect(() => {
    if (user) {
      setCreator(user.displayName);
      viewEvents();
    } else {
      onAuthStateChanged(auth, (currUser) => {
        setUser(currUser);
      });
    }
  }, [user]);

  const viewEvents = () => {
    callAPIViewEvent().then((res) => {
      var parsed = JSON.parse(res.express);
      setCurrentEvents(parsed);
      setEventsLoaded(true);
    });
  };

  const handleDateClick = (selected) => {
    setSelectedAdd(selected);
    setOpenAdd(true);
  };

  const handleHover = (selected) => {
    // console.log(selected);
    const title = selected.event.title;
    const tooltip = `Created by ${selected.event.extendedProps.creator}`;
    selected.el.setAttribute("title", tooltip);
  };

  const handleEventClick = (selected) => {
    setTitle(selected.event.title);
    setEventDelete(selected.event);
    setOpenDelete(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDelete(false);
  };

  const handleCloseAddDialog = () => {
    setOpenAdd(false);
  };

  const callAPIViewEvent = async () => {
    // console.log("getExpenseReport called");
    const url = serverURL + "/api/viewEvent";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        firebaseUID: user.uid,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  };

  return (
    <>
      <Grid>
        <SideNav />
      </Grid>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container class="container">
          <Box sx={{ flexGrow: 1 }}>
            {eventsLoaded && (
              <FullCalendar
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                events={currentEvents}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
                select={handleDateClick}
                eventClick={handleEventClick}
                eventMouseEnter={handleHover}
                eventMouseLeave={handleHover}
              />
            )}
          </Box>
        </Container>
      </Box>

      <DeleteEventDialog
        open={openDelete}
        handleClose={handleCloseDeleteDialog}
        event={eventDelete}
        title={title}
      />

      <AddEventDialog
        open={openAdd}
        handleClose={handleCloseAddDialog}
        selected={selectedAdd}
        user={user}
        creator={creator}
      />
    </>
  );
};

export default Calendar;
