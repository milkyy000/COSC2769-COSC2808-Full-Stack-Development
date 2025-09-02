// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049
import React from "react";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "About | VeloCart";
  }, []);
  return (
    <div className="container mt-4">
      <h1>About Us</h1>
      <p>
        VeloCart is a simplified e-commerce platform developed for learning
        purposes in the Full Stack Development course at RMIT University Vietnam.
      </p>
      <p>
        Inspired by Lazada’s structure, this project demonstrates customer,
        vendor, and shipper workflows. It is not a Lazada clone, but a learning
        project.
      </p>
    </div>
  );
};

export default About;