import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const ShipperLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 container my-4">{children}</main>
      <Footer />
    </div>
  );
};

export default ShipperLayout;