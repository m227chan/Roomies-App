import React, { useState } from "react";
import "./Expense.css";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Avatar,
} from "@mui/material";

const ShortExchange = ({ roomateData, shortExchangeList }) => {
  const [onHoverAvatar, setOnHoverAvatar] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const avatarStyle = {
    backgroundColor: "#FF8700",
    justifyContent: "center",
    alignItems: "center",
  };

  const owedMessage = (amount) => {
    if (amount >= 0) {
      return "owes a cum. total of $" + amount;
    } else {
      return "is owed a cum. total of $" + amount * -1;
    }
  }

  return (
    <div>
      <Card class="card">
        <CardContent
          onMouseMove={(event) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Box width="100%" p={1}>
                <Typography variant={"h6"}>
                  <b>ROOMMATES</b>
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            {roomateData.map((roomate, index) => (
              <Grid item key={index}>
                <Box width="100%" p={2}>
                  <Avatar
                    style={avatarStyle}
                    onMouseEnter={() => {
                      setIsHovering(true);
                      setOnHoverAvatar(roomate.id);
                    }}
                    onMouseLeave={() => {
                      setIsHovering(false);
                      setOnHoverAvatar(null);
                    }}
                  >
                    {roomate.firstName[0]}
                  </Avatar>

                  <Typography variant={"body1"} align="center">
                    <b>{roomate.firstName + " " + roomate.lastName}</b>
                  </Typography>

                  <Typography>{owedMessage(roomate.owed)}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      {isHovering && (
        <Card
          className="card"
          style={{
            position: "absolute",
            zIndex: 9999,
            left: `${mousePosition.x + 10}px`,
            top: `${mousePosition.y + 10}px`,
            backgroundColor: "#68B984",
            padding: "1rem",
            color: "#FFFFFF",
          }}
        >
          {shortExchangeList
            .filter((expense) => expense.id === onHoverAvatar)
            .map((expense, index) => (
              <Typography key={index}>{expense.transaction}</Typography>
            ))}
        </Card>
      )}
    </div>
  );
};

export default ShortExchange;
