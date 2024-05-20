import {createBrowserRouter} from "react-router-dom";
import React from 'react';
import Login from "../screens/login/login";
import Home from "../screens/home/home";

import {ProtectedRoute} from "./ProtectedRoute";
import SignUp from "../screens/signUp/signUp";

export default  createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Home/></ProtectedRoute>,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signUp",
      element: <SignUp />,
    }
]);