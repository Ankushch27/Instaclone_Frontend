import React from 'react';
import { Route, Switch } from 'react-router';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

const HomeRouter = () => {
  return (
    <>
      <Navbar />
      <main className="container home">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/:uid" component={Profile} exact />
        </Switch>
      </main>
    </>
  );
};

export default HomeRouter;
