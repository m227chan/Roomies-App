import React, { useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Room from '../Room';
import Expenses from '../Expenses';
import Grocery from '../Grocery';
import Calendar from '../Calendar';
import Settings from '../Settings';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import history from './history';
import PasswordChange from '../PasswordChange';
import JoinCreateRoom from '../JoinCreateRoom';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";

export default function PrivateRoute({}) {

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currUser) => {
    setUser(currUser);
  });

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/SignIn" exact component={SignIn} />
        <Route path="/SignUp" exact component={SignUp} />
        <Route path="/JoinCreateRoom" exact component={JoinCreateRoom} />
        <Route path="/PasswordChange" exact component={PasswordChange} />
        <Route path="/Room" exact component={Room} />
        <Route path="/Expenses" exact component={Expenses} />
        <Route path="/Grocery" exact component={Grocery} />
        <Route path="/Calendar" exact component={Calendar} />
        <Route path="/Settings" exact component={Settings} />
      </Switch>
    </Router>
  );
}