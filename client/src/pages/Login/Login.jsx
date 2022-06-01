import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-page-container">
      Login Enter your email and password
      <input type="text" className="login-input" />
      <input type="text" className="login-input" />
      <div className="login-signup-wrapper">
        <p> Don&apos;t have an account? </p>
        <Link to="/signup" className="navbar-link  btn-link">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
