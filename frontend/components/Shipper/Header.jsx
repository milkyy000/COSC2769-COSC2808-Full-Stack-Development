// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

import React, { useContext } from "react";
import axios from "axios";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutSuccess } from "../../src/redux/authSlice";
import { useDispatch } from "react-redux";
import { ThemeContext } from "../../src/ThemeContext";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { theme, toggleTheme, setDark } = useContext(ThemeContext);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      dispatch(logoutSuccess());
      setDark();
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/shipper/orders" className="d-flex align-items-center">
          <img
            src="/Logo.png"
            alt="VeloCart Logo"
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
          />
          VeloCart
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/shipper/orders">Assigned Orders</Nav.Link>
            <Nav.Link as={NavLink} to="/my-account">My Account</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>

            <button
              onClick={toggleTheme}
              className="btn btn-sm ms-3"
              style={{
                background: "transparent",
                border: "1px solid currentColor",
                color: "inherit",
              }}
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
