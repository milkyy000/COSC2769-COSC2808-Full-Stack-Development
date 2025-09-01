// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

import React from "react";
import { useRouteError, Link } from "react-router-dom";

export default function NotFound() {
  const err = useRouteError();
  console.error(err);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-3 text-danger fw-bold">404</h1>
      <h2 className="mb-3">Oops! Page Not Found</h2>
      <p className="text-muted mb-4">
        The page you are looking for doesn’t exist or an error occurred.
      </p>

      <Link to="/" className="btn btn-primary">
        ⬅ Back to Home
      </Link>
    </div>
  );
}
