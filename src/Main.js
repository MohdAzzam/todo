import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from './components/todo/todo'
import ToDo from "./components/todo/todo-connected";
export default function Main(){
    return (
    <Switch>
      <Route exact component={ToDo} path="/"/> 
      <Route exact component={ToDo} path='/api'/>  
    </Switch>
    );
}