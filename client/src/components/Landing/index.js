import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import history from "../Navigation/history";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

const opacityValue = 0.9;

const theme = createTheme({
  palette: {
    type: "light",
    background: {
      default: "#000000",
    },
    primary: {
      main: "#7a1a06",
    },
    secondary: {
      main: "#ffcb52",
    },
  },
});

const styles = (theme) => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "15vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },
});

function Landing(props) {
  const { classes } = props;

  const mainMessage = (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="flex-start"
        style={{ minHeight: "100vh" }}
        className={classes.mainMessageContainer}
      >
        <Grid item>
          <Container maxWidth="xs">
            <Typography variant="h4" color="primary">
              Welcome to the Roomies App!
            </Typography>
            <br />
            <Button color="inherit" variant="contained">
              <Link
                color="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/SignIn")}
              >
                <Typography>Sign In</Typography>
              </Link>
            </Button>
            <br />
            <br />
            <Button color="inherit" variant="contained">
              <Link
                color="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/SignUp")}
              >
                <Typography>Sign Up</Typography>
              </Link>
            </Button>
            <Box
              component="img"
              direction="column"
              alignItems="center"
              justify="center"
              sx={{
                height: 400,
                width: 700,
              }}
              alt="image goes here"
              src="../Roomates.png"
            />
            <br />
            <Typography variant="h6" color="inherit" noWrap>
              Image Source:
              <a
                href={
                  "https://liv.rent/blog/2020/02/roommate-living-keeping-it-real-feat-happy-roommates/"
                }
              >
                {
                  "https://liv.rent/blog/2020/02/roommate-living-keeping-it-real-feat-happy-roommates/"
                }
              </a>
            </Typography>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Paper className={classes.paper}>{mainMessage}</Paper>
      </div>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(Landing);
