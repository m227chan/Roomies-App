import React from 'react';
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import history from '../Navigation/history';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const CustomAppBar = () => {

  return (
    <AppBar position="static">
      <Toolbar>

        <Button color="inherit">
          <Link
            color="inherit"
            style={{ cursor: "pointer" }}
            onClick={() => history.push('/Room')}
          >
            <Typography variant="h6" color="inherit">
              Room
            </Typography>
          </Link>
        </Button>

        <Button color="inherit" data-testid = 'Navigation Button to Room'>
          <Link
            color="inherit"
            style={{ cursor: "pointer" }}
            onClick={() => history.push('/Calendar')}
          >
            <Typography variant="h6" color="inherit">
              Calendar
            </Typography>
          </Link>
        </Button>

        <Button color="inherit">
          <Link
            color="inherit"
            style={{ cursor: "pointer" }}
            onClick={() => history.push('/Expenses')}
          >
            <Typography variant="h6" color="inherit">
              Expenses
            </Typography>
          </Link>
        </Button>

        <Button color="inherit">
          <Link
            color="inherit"
            style={{ cursor: "pointer" }}
            onClick={() => history.push('/Grocery')}
          >
            <Typography variant="h6" color="inherit">
              Grocery
            </Typography>
          </Link>
        </Button>

        <Button color="inherit">
          <Link
            color="inherit"
            style={{ cursor: "pointer" }}
            onClick={() => history.push('/Settings')}
          >
            <Typography variant="h6" color="inherit">
              Settings
            </Typography>
          </Link>
        </Button>

      </Toolbar>
    </AppBar>
  );
}

export default CustomAppBar;