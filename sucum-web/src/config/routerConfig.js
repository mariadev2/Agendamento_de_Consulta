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
import ConsultaView from "../screens/consulta/consulta";
import SignUpConsulta from "../screens/singUpConsulta/cadConsulta";

export default  createBrowserRouter([
    {
      path: "/home",
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
      path: "/consulta/:id",
      element: <ProtectedRoute><ConsultaView/></ProtectedRoute>,
    },
    {
      path: "/agendar",
      element: <ProtectedRoute><SignUpConsulta/></ProtectedRoute>,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "/",
      element: <ProtectedRoute><Login /></ProtectedRoute>,
    },
    {
      path: "/signUp",
      element: <SignUp />,
    }
]);