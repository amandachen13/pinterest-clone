import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './login_form/login_form_container';
import SignupFormContainer from './signup_form/signup_form_container';
import HomeContainer from './home/home_container';
import BoardShowContainer from './boards/board_show_container';
import PinShowContainer from './pins/pin_show_container';
import ModalContainer from './modal/modal_container';
import UserProfileContainer from './users/user_profile_container';
import UserPinsContainer from './users/user_pins_container';
import { AuthRoute, ProtectedRoute } from './../util/route_util';


const App = () => (
  <div>
    <ModalContainer />
    <Route exact path="/" component={HomeContainer} />
    <AuthRoute path="/login" component={LoginFormContainer} />
    <AuthRoute path="/signup" component={SignupFormContainer} />
    <Switch>
      <ProtectedRoute path="/pin/:id" component={PinShowContainer} />
      <ProtectedRoute exact path="/:username" component={UserProfileContainer} />
      <ProtectedRoute exact path="/:username/boards" component={UserProfileContainer} />
      <ProtectedRoute exact path="/:username/pins" component={UserPinsContainer} />
      <ProtectedRoute path="/:username/board/:id" component={BoardShowContainer} />
    </Switch>
  </div>
);

export default App;
