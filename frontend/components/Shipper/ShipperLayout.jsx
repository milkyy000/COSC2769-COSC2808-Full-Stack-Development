// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Pham Chau Tan Dat
// ID: s4069488

import React from "react";
import Header from "./Header";
import FooterForAllRoles from "../FooterForAllRoles";
const ShipperLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 container my-4">{children}</main>
      <FooterForAllRoles />
    </div>
  );
};

export default ShipperLayout;