import {createBrowserRouter} from "react-router-dom";
import React from 'react';
import Login from "../screens/login/login";
import Home from "../screens/home/home";

import {ProtectedRoute} from "./ProtectedRoute";

export default  createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Home/></ProtectedRoute>,
    },
    {
      path: "/login",
      element: <Login />,
    }
]);