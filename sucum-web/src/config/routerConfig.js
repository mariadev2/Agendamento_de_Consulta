import {createBrowserRouter} from "react-router-dom";
import React from 'react';
import Login from "../screens/login/login";
import Home from "../screens/home/home";

import {ProtectedRoute} from "./ProtectedRoute";
import SignUp from "../screens/signUp/signUp";
import PreSignUpMed from "../screens/preSignUpMed/preSignUpMed";
import SignUpMed from "../screens/signUpMed/signUpMed";
import Profile from "../screens/profile/profile";
import Logout from "../screens/logout/logout";

export default  createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Home/></ProtectedRoute>,
    },
    {
      path: "/profile",
      element: <ProtectedRoute><Profile/></ProtectedRoute>,
    },
    {
      path: "/signUpMed",
      element: <ProtectedRoute><SignUpMed/></ProtectedRoute>,
    },
    {
      path: "/preSignUpMed",
      element: <ProtectedRoute><PreSignUpMed/></ProtectedRoute>,
    },
    {
      path: "/logout",
      element: <Logout />,
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