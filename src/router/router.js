import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

const routeConfig = [
    {
        path: '/',
        component: Home
    },
    {
        path: "/login",
        component: Login
    }
]

class RouterMap extends React.Component {
    render() {
        return (
            <Router routes={routeConfig}></Router>
        )
    }
}

export default RouterMap;