import React from 'react';
import { Route, Switch } from 'react-router';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const AuthRouter = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  );
};

export default AuthRouter;
