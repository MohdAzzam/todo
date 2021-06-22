import React from "react";
import { Route, Switch } from "react-router-dom";
import Todo from "./screens/todo/todo";

export default function Main() {
  return (
    <Switch>
      <Route exact component={Todo} path="/" />
      <Route exact component={Todo} path='/api' />
    </Switch>
  );
}