import React from "react";
import { Route, Switch } from "react-router-dom";
import Todo from "./screens/todo/todo";
import Login from './screens/auth/login';
import Register from "./screens/auth/register";
import PrivateRoute from "./components/PrivateRoute";
import GuestRoute from "./components/GuestRoute";
import NotFound from "./screens/NotFound";

export default function Main() {
  return (
    <Switch>
      <PrivateRoute exact component={Todo} path="/" />
      <GuestRoute exact component={Login} path='/login' />
      <GuestRoute exact component={Register} path='/register' />
      <Route component={NotFound} />
    </Switch>
  );
}