// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

import React from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const FooterForAllRoles = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <Container className="text-center">
        <p>© 2025 VeloCart</p>
        <div>
          <NavLink to="/about" className="text-decoration-none text-light mx-2">
            About
          </NavLink>
          <NavLink to="/privacy" className="text-decoration-none text-light mx-2">
            Privacy
          </NavLink>
          <NavLink to="/help" className="text-decoration-none text-light mx-2">
            Help
          </NavLink>
          <NavLink to="/feedback" className="text-decoration-none text-light mx-2">
            Feedback
          </NavLink>
        </div>
      </Container>
    </footer>
  );
};

export default FooterForAllRoles;
