import React from "react";
import { Typography, Card, Grid, CardContent, Button } from "@material-ui/core";
import history from "../Navigation/history";

const UpcomingEvents = ({ upcomingEvents }) => {
  // console.log(upcomingEvents);

  const formatDate = (startDate, endDate, allDay) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (allDay) {
      const startMonth = start.toLocaleString("default", { month: "short" });
      const endMonth = end.toLocaleString("default", { month: "short" });
      const startDateStr = `${startMonth}. ${start.getDate()}th, ${start.getFullYear()}`;
      const endDateStr = `${endMonth}. ${end.getDate()}th, ${end.getFullYear()}`;
      return `${startDateStr} - ${endDateStr}`;
    } else {
      const startStr = `${start.toLocaleString("default", {
        month: "short",
      })}. ${start.getDate()}th, ${start.getFullYear()}`;
      const startTimeStr = start.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const endTimeStr = end.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      return `${startStr}; ${startTimeStr} - ${endTimeStr}`;
    }
  };

  return (
    <div>
      <Card class="card">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                onClick={() => history.push("/Calendar")}
                style={{ cursor: "pointer" }}
              >
                <Typography variant="h6">
                  <b style={{ textTransform: "none", color: "#02473B" }}>
                    {"Upcoming Events >"}
                  </b>
                </Typography>
              </Button>
            </Grid>
            {upcomingEvents.map((event, index) => (
              <Grid item xs={12} key={index}>
                <Card class="calendar-card">
                  <CardContent>
                    <Typography variant={"h5"}>
                      <b>{event.title}</b>
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant={"h6"}>
                          For: {event.creator}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant={"h6"} align="right">
                          {formatDate(event.start, event.end, event.allDay)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpcomingEvents;
