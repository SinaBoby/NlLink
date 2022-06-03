import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import TEST_ID from "../User/CreateUser.testid";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSuccess = () => {
    // eslint-disable-next-line no-console
    console.log("hi");
    navigate("/");
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/authenticate",
    onSuccess
  );
  useEffect(() => {
    return cancelFetch;
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(email, password);
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
  };
  let statusComponent = null;
  if (error != null) {
    statusComponent = (
      <div data-testid={TEST_ID.errorContainer}>
        Error while trying to create user: {error.toString()}
      </div>
    );
  } else if (isLoading) {
    statusComponent = (
      <div data-testid={TEST_ID.loadingContainer}>Login user....</div>
    );
  }
  return (
    <div className="login-page-container">
      Login Enter your email and password
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          value={email}
          onChange={(value) => setEmail(value)}
          className="login-input"
        />
        <Input
          name="password"
          value={password}
          type="password"
          onChange={(value) => setPassword(value)}
          className="login-input"
        />
        <button
          type="submit"
          className="btn-link navbar-link create-user-submit-btn"
        >
          Submit
        </button>
      </form>
      <div className="login-signup-wrapper">
        <p> Don&apos;t have an account? </p>
        <Link to="/user/create" className="navbar-link  btn-link">
          Sign up
        </Link>
      </div>
      {statusComponent}
    </div>
  );
};

export default Login;
