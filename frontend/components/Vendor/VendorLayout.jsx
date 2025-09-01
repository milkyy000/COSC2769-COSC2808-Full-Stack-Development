// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

import React from "react";
import Header from "./Header";
import FooterForAllRoles from "../FooterForAllRoles";

const VendorLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 container my-4">{children}</main>
      <FooterForAllRoles />
    </div>
  );
};

export default VendorLayout;
