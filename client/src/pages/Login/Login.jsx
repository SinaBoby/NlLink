import React, { useState, useEffect, useContext } from "react";
import Input from "../../components/Input";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import TEST_ID from "../User/CreateUser.testid";
import "./Login.css";
import { AuthContext } from "../../AuthContext";
//import { logInfo } from "../../../../server/src/util/logging.js";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const onSuccess = () => {
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
    //logInfo(email, password);
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userName,
        password,
      }),
    });
    setAuth(true);
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
      <h2 className="login-user-header">
        Enter your email and password to login
      </h2>
      <form onSubmit={handleSubmit}>
        <label>
          UserName
          <Input
            name="userName"
            type="userName"
            value={userName}
            onChange={(value) => setUserName(value)}
            className="login-input"
            data-testid={TEST_ID.userNameInput}
          />
        </label>
        <label>
          Password
          <Input
            name="password"
            value={password}
            type="password"
            onChange={(value) => setPassword(value)}
            className="login-input"
            data-testid={TEST_ID.passwordInput}
          />
        </label>
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
        <Link to="/user/passwordForgot" className="navbar-link  btn-link">
          Forgot My password
        </Link>
      </div>
      {statusComponent}
    </div>
  );
};

export default Login;
