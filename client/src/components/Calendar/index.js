import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import CustomAppBar from "../CustomAppBar";
import { Box } from "@mui/material";
import { blueGrey } from "@material-ui/core/colors";

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);

  //update this component by retriving date from the database
  var initialEvents = {
    events: [
      {
        title: "event1",
        start: "2023-03-01",
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
    ],
  };

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const creator = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
        creator,
      });

      console.log("Start " + selected.startStr);
      console.log("End " + selected.endStr);
      console.log("All Day" + selected.allDay);
    }
  };

  const handleHover = (selected) => {
    const creator = selected.event.extendedProps.creator;
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
    }
  };

  return (
    <>
      <CustomAppBar />
      <Box m="20px">
        <Box display="flex" justifyContent="space-between">
          <Box flex="1 1 100%" ml="15px">
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
              initialEvents={initialEvents}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Calendar;
