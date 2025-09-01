// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

import React from "react";
import { Container } from "react-bootstrap";

const FooterForAllRoles = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <Container className="text-center">
        <p>© 2025</p>
        <div>
          <a href="/about" className="text-decoration-none text-light mx-2">About</a>
          <a href="/privacy" className="text-decoration-none text-light mx-2">Privacy</a>
          <a href="/help" className="text-decoration-none text-light mx-2">Help</a>
          <a href="/feedback" className="text-decoration-none text-light mx-2">Feedback</a>
        </div>
      </Container>
    </footer>
  );
};

export default FooterForAllRoles;
