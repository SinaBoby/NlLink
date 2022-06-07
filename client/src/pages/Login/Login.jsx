import React, { useState, useEffect, useContext } from "react";
import Input from "../../components/Forms/Input";
import Label from "../../components/Forms/Label";
import Form from "../../components/Forms/Form";
import Button from "../../components/Button";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import TEST_ID from "../User/CreateUser.testid";
import "./Login.css";
import { AuthContext } from "../../AuthContext";
//import { logInfo } from "../../../../server/src/util/logging.js";
import InputFieldContainer from "./../../components/Forms/InputFieldContainer";
import Spinner from "./../../components/Spinner/Spinner";
import useUserDetails from "../../hooks/useUserRole";
const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { setUserDetails } = useUserDetails();
  const onSuccess = (response) => {
    setUserDetails(response.user);
    login(() => navigate("/dashboard"));
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/authenticate",
    onSuccess
  );
  useEffect(() => {
    /*  if (isAuthenticated) {
      navigate("/");
    } */

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
  };
  let statusComponent = null;
  if (error != null) {
    statusComponent = (
      <div data-testid={TEST_ID.errorContainer}>
        Error while trying to create user: {error.toString()}
      </div>
    );
  } else if (isLoading) {
    statusComponent = <Spinner />;
  }
  return (
    <Form onSubmit={handleSubmit} title="Login with your Username and Password">
      <InputFieldContainer>
        <Label>UserName</Label>
        <Input
          name="userName"
          type="userName"
          value={userName}
          onChange={(value) => setUserName(value)}
          className="login-input"
          data-testid={TEST_ID.userNameInput}
        />
      </InputFieldContainer>
      <InputFieldContainer>
        <Label>Password</Label>
        <Input
          name="password"
          value={password}
          type="password"
          onChange={(value) => setPassword(value)}
          className="login-input"
          data-testid={TEST_ID.passwordInput}
        />
      </InputFieldContainer>
      <Button className="btn btn-block" type={"submit"}>
        Sign in
      </Button>
      <div className="login-signup-wrapper">
        <p>Don&apos;t have an account?</p>
        <Link to="/user/create" className="navbar-link  btn-link">
          Sign up
        </Link>
        &nbsp;&nbsp;
        <p>Forgot your password?</p>
        &nbsp;
        <Button
          type={"button"}
          className="btn btn-inline form-btn-link"
          onClick={() => navigate("/user/ResetPassword")}
        >
          Forgot My password
        </Button>
      </div>
      {statusComponent}
    </Form>
  );
};

export default Login;
