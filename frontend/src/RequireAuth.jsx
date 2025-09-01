// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelect } from "../src/redux/authSlice"; 

const RequireAuth = ({ children }) => {
 
  const user = useSelector(authSelect.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;