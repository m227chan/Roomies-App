// Importing react and files
import * as React from "react";
import "./sideNav.css";
import history from "../Navigation/history";

// Importing material
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { grey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Importing icons
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

// Sets the width
const drawerWidth = 240;

// Sets the theme for the file
const theme = createTheme({
  typography: {
    fontFamily: "Tajawal",
    subtitle1: {
      fontSize: 18,
    },
  },
});

// Component for the top of the Nav
const NavProfile = () => {
  return (
    <Grid item class="navAvatar">
      {" "}
      <Avatar
        sx={{
          bgcolor: grey[200],
          color: "#02473B",
          width: 60,
          height: 60,
        }}
      >
        <Typography variant="h4">Z</Typography>
      </Avatar>
      <Typography
        style={{ paddingTop: "10%", fontWeight: "bold" }}
        variant="h6"
      >
        {" "}
        Zach Zammit
      </Typography>
    </Grid>
  );
};
// Component for the middle of the Nav
const NavMenu = () => {
  return (
    <Grid item class="navMiddle">
      <Grid class="navHeader">
        <Grid item xs={4}>
          <Typography variant="p" sx={{ fontWeight: "light" }}>
            Home{" "}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Divider style={{ background: "#FFFFFF" }} />
        </Grid>
      </Grid>
      <List sx={{ margin: "5% 0%" }}>
        {["Room"].map((text, index) => (
          <ListItem key={text}>
            <ListItemButton>
              <ListItemIcon style={{ minWidth: "40px" }}>
                <HomeWorkIcon sx={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "regular" }}
                onClick={() => history.push("/Room")}
              >
                {text}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Grid class="navHeader">
        <Grid item xs={4}>
          <Typography variant="p" sx={{ fontWeight: "light" }}>
            Spending{" "}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Divider style={{ marginLeft: "12%", background: "#FFFFFF" }} />
        </Grid>
      </Grid>
      <List sx={{ margin: "5% 0%" }}>
        {["Expenses", "Grocery"].map((text, index) => (
          <ListItem key={text}>
            <ListItemButton>
              <ListItemIcon style={{ minWidth: "40px" }}>
                {index % 2 === 0 ? (
                  <CurrencyExchangeIcon sx={{ color: "#FFFFFF" }} />
                ) : (
                  <ShoppingCartIcon sx={{ color: "#FFFFFF" }} />
                )}
              </ListItemIcon>
              <Typography
                variant="subtitle1"
                onClick={() => history.push("/" + text)}
              >
                {text}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Grid class="navHeader">
        <Grid item xs={4}>
          <Typography variant="p" sx={{ fontWeight: "light" }}>
            Events
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Divider style={{ background: "#FFFFFF" }} />
        </Grid>
      </Grid>
      <List sx={{ margin: "5% 0%" }}>
        {["Calendar"].map((text, index) => (
          <ListItem key={text}>
            <ListItemButton>
              <ListItemIcon style={{ minWidth: "40px" }}>
                <CalendarMonthIcon sx={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <Typography
                variant="subtitle1"
                onClick={() => history.push("/Calendar")}
              >
                {text}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};
// Component for the bottom of the Nav
const NavBottom = () => {
  return (
    <Grid item class="navBottom">
      <SettingsIcon
        onClick={() => history.push("/Settings")}
        sx={{
          "&:hover": {
            cursor: "pointer",
            color: "#D2EADA",
          },
        }}
      />
      <Typography sx={{ fontWeight: "bold" }}>|</Typography>
      <LogoutIcon
        onClick={() => history.push("/Settings")}
        sx={{
          "&:hover": {
            cursor: "pointer",
            color: "#D2EADA",
          },
        }}
      />
    </Grid>
  );
};

export default function SideNav() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Grid class="navGrid">
            <NavProfile />
            <NavMenu />
            <NavBottom />
          </Grid>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
