import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from './components/todo/todo'
export default function Main(){
    return (
    <Switch>
      <Route exact component={Home} path="/"/>  
    </Switch>
    );
}