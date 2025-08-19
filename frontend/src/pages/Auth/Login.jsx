import React from "react";

export default function Login() {
  return (
    <div>
      <h2>Login Page Works!</h2>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}