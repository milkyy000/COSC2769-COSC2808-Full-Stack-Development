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