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
import InputFieldContainer from "./../../components/Forms/InputFieldContainer";
import Spinner from "./../../components/Spinner/Spinner";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, login } = useContext(AuthContext);

  const onSuccess = (res) => {
    const { user } = res;

    setTimeout(() => {
      login(user, () => navigate("/dashboard"));
    }, 1000);
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/authenticate",
    onSuccess
  );
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }

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
          title="Required field. Should follow the pattern"
          minLength="3"
          maxLength="64"
          pattern="^[a-zA-Z][a-zA-Z0-9-_@.]{3,64}$"
          onChange={(value) => setUserName(value)}
          className="login-input"
          data-testid={TEST_ID.userNameInput}
          required
        />
      </InputFieldContainer>
      <InputFieldContainer>
        <Label>Password</Label>
        <Input
          name="password"
          value={password}
          type="password"
          title="Required field"
          minLength="6"
          maxLength="64"
          onChange={(value) => setPassword(value)}
          className="login-input"
          data-testid={TEST_ID.passwordInput}
          required
        />
      </InputFieldContainer>
      <Button className="btn-block" type={"submit"}>
        Sign in
      </Button>
      <div className="login-extra-actions">
        <div className="create-user">
          <p>Don&apos;t have an account?</p>
          <Link to="/user/create" className="navbar-link  btn-link">
            Sign up
          </Link>
        </div>
        <div className="forgot-password">
          <p>Forgot your password?</p>
          <Button
            type={"button"}
            className="form-btn-link"
            onClick={() => navigate("/user/ResetPassword")}
          >
            Forgot My password
          </Button>
        </div>
      </div>
      {statusComponent}
    </Form>
  );
};

export default Login;
