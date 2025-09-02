// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049
import React from "react";
import { useEffect } from "react";
const Feedback = () => {
  useEffect(() => {
    document.title = "Feedback | VeloCart";
  }, []);
  return (
    <div className="container mt-4">
      <h1>User Feedback</h1>
      <p>
        Please take a moment to share your thoughts with us. Your feedback helps
        improve the platform.
      </p>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSfobLAXtArlCuWobc8SOFeD66ESCOD7DXPWyJ2Q_m-RLO2DWg/viewform?usp=dialog"
        width="100%"
        height="800"
        title="Feedback Form"
      >
        Loading…
      </iframe>
    </div>
  );
};

export default Feedback;
