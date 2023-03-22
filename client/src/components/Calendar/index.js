import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
} from "@material-ui/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";

import SideNav from "../CustomAppBar/sideNav";

const serverURL = "http://localhost:3000/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [creator, setCreator] = useState("");
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currUser) => {
    setUser(currUser);
  });

  useEffect(() => {
    if (user) {
      setCreator(user.displayName);
      viewEvents();
    }
  }, [user]);

  // update this component by retriving date from the database
  // View Events
  var initialEvents = {
    events: [
      {
        title: "event1",
        start: "2023-03-09T05:00:00.000Z",
      },
      {
        title: "event2",
        start: "2023-03-05",
        end: "2023-03-07",
      },
      {
        title: "event3",
        start: "2023-03-09T12:30:00",
        allDay: false, // will make the time show
      },
      {title: 't', start: '2023-03-21T15:00:00.000Z', end: '2023-03-21T19:30:00.000Z'}
    ],
  };

  const viewEvents = () => {
    callAPIViewEvent().then((res) => {
      var parsed = JSON.parse(res.express);
      console.log(parsed);
      setCurrentEvents(parsed);
    });
  };

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
    console.log(selected);
    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}-${user.uid}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
        creator,
      });

      callAPIAddEvent(title, selected.startStr, selected.endStr, selected.allDay);

      console.log("Start " + selected.startStr);
      console.log("End " + selected.endStr);
      console.log("All Day" + selected.allDay);
    }
  };

  const handleHover = (selected) => {
    const title = selected.event.title;
    const tooltip = `Created by ${creator}`;
    selected.el.setAttribute("title", tooltip);
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
      // callAPIDeleteEvent(selected.id);
    }
  };

  const callAPIAddEvent = async (title, start, end, allDay) => {
    // console.log("getExpenseReport called");
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
        start: start,
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

  // const callAPIDeleteEvent = async () => {
  //   // console.log("getExpenseReport called");
  //   const url = serverURL + "/api/deleteEvent";
  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       //authorization: `Bearer ${this.state.token}`
  //     },
  //     body: JSON.stringify({
  //       eventID: 1,
  //     }),
  //   });
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);
  //   // console.log("User settings: ", body);
  //   return body;
  // };

  // const callAPIEditEvent = async () => {
  //   // console.log("getExpenseReport called");
  //   const url = serverURL + "/api/editEvent";
  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       //authorization: `Bearer ${this.state.token}`
  //     },
  //     body: JSON.stringify({
  //       firebaseUID: user.uid,,
  //       title,
  //       start,
  //       end,
  //       tag,
  //       description,
  //       consequence,
  //       allDay,
  //       eventID,
  //     }),
  //   });
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);
  //   // console.log("User settings: ", body);
  //   return body;
  // };

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
      <SideNav />
      <Container class="container">
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Paper class="paper">
            <Box sx={{ flexGrow: 1 }}>
            {user ?  
            <>
            <FullCalendar
                height="85vh"
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
                headerToolbar={{
                  left: "prev next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                select={handleDateClick}
                eventClick={handleEventClick}
                eventsSet={(events) => setCurrentEvents(events)}
                eventMouseEnter={handleHover}
                initialEvents={currentEvents}
              />
            </>
            : null}
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default Calendar;
