import {createBrowserRouter} from "react-router-dom";
import React from 'react';
import Login from "../screens/login/login";
import Home from "../screens/home/home";

import {ProtectedRoute} from "./ProtectedRoute";
import SignUp from "../screens/signUp/signUp";
import PreSignUpMed from "../screens/preSignUpMed/preSignUpMed";
import SignUpMed from "../screens/signUpMed/signUpMed";

export default  createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Home/></ProtectedRoute>,
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
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signUp",
      element: <SignUp />,
    }
]);