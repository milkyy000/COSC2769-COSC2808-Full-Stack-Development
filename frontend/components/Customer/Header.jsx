// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

import React from "react";
import axios from "axios";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutSuccess } from "../../src/redux/authSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ create dispatch

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });

      dispatch(logoutSuccess()); // ✅ clears Redux user state

      navigate("/"); // ✅ back to login
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
  const handleCartView = async () => {

  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/customerProductView">🌐 Customer Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/shopping-cart">
              Shopping Cart
            </Nav.Link>
            <Nav.Link as={NavLink} to="/my-account">
              My Account
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
