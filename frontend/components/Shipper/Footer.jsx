// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <Container className="text-center">
        <p>© 2025 Vendor Portal</p>
        <div>
          <a href="#" className="text-decoration-none text-light mx-2">About</a>
          <a href="#" className="text-decoration-none text-light mx-2">Privacy</a>
          <a href="#" className="text-decoration-none text-light mx-2">Help</a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
