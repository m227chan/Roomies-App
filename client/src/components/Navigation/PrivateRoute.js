import React from "react";
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
import Landing from '../Landing';

export default function PrivateRoute({}) {

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/SignIn" exact component={SignIn} />
        <Route path="/SignUp" exact component={SignUp} />
        <Route path="/JoinCreateRoom" exact component={JoinCreateRoom} />
        <Route path="/PasswordChange" exact component={PasswordChange} />
        <Route path="/Room" exact component={Room} />
        <Route path="/Expenses" exact component={Expenses} />
        <Route path="/Grocery" exact component={Grocery} />
        <Route path="/Calendar" exact component={Calendar} />
        <Route path="/Settings" exact component={Settings} />
        <Route path="/Landing" exact component={Landing} />
      </Switch>
    </Router>
  );
}

// import React from "react";
// import { Router, Switch, Route } from "react-router-dom";
// import Room from '../Room';
// import Expenses from '../Expenses';
// import Grocery from '../Grocery';
// import Calendar from '../Calendar';
// import Settings from '../Settings';
// import SignIn from '../SignIn';
// import SignUp from '../SignUp';
// import PasswordChange from '../PasswordChange';
// import JoinCreateRoom from '../JoinCreateRoom';
// import history from './history';

// export default function PrivateRoute({
//   authenticated,
//   ...rest
// }) {
//   return (
//     <Router history={history}>
//       <Switch>
//         <Route
//           path="/" exact
//           {...rest}
//           render={props =>
//             authenticated === true ? (
//               <Room {...props} {...rest} />
//             ) : (
//               <SignIn {...props} {...rest} />
//             )
//           }
//         />
//         <Route path="/SignIn" component={SignIn} />
//         <Route path="/SignUp" component={SignUp} />
//       </Switch>
//     </Router>
//   );
// }