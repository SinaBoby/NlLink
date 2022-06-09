import React, { useEffect, useState, useContext } from "react";
import InputFieldContainer from "../../components/Forms/InputFieldContainer";
import Select from "../../components/Forms/Select";
import Input from "../../components/Forms/Input";
import Label from "../../components/Forms/Label";
import useFetch from "../../hooks/useFetch";
import TEST_ID from "./CreateUser.testid";
import "./CreateUser.css";
import Button from "./../../components/Button";
import Form from "../../components/Forms/Form";
import { useNavigate } from "react-router-dom";
import Spinner from "./../../components/Spinner/Spinner";
import { AuthContext } from "../../AuthContext";

const PasswordHint = () => {
  return (
    <div className="password-hint">
      <h3> Password must contain at least:</h3>
      <ul>
        <li>Be 6 characters or longer</li>
        <li>1 lowercase alphabetical character</li>
        <li>1 uppercase alphabetical character</li>
        <li>1 numeric character</li>
        <li>1 special character(!@#$%^&)</li>
      </ul>
    </div>
  );
};

const CreateUser = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [isHint, setIsHint] = useState(false);
  const [validUsername, setValidUserName] = useState(false);
  const [userError, setUserError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [userType, setUserType] = useState("NewComer");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passError, setPassError] = useState("");
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
  );
  const USER_REGEX = new RegExp("^[a-zA-Z][a-zA-Z0-9-_]{3,23}$");
  const onSuccess = () => {
    clearForm();
    navigate("/login");
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/create",
    onSuccess
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }

    return cancelFetch;
  }, []);
  useEffect(() => {
    if (passError) {
      setTimeout(() => setPassError(null), 3000);
    }
    if (userError) {
      setTimeout(() => setUserError(null), 3000);
    }
  }, [passError, userError]);

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setUserName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setBirthDay("");
    setUserType("NewComer");
    setConfirmPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      password !== confirmPassword &&
      !strongRegex.test(password) &&
      !validUsername
    ) {
      setPassError(
        new Error(
          "Passwords you entered are not same & outside the pattern please try again"
        )
      );
      setUserError(new Error("Please check the userName pattern again"));
    } else if (password !== confirmPassword) {
      setPassError(
        new Error("Password you entered are not same please try again")
      );
    } else if (!strongRegex.test(password)) {
      setPassError(new Error("Please check the password pattern again"));
    } else if (!validUsername) {
      setUserError(new Error("Please check the userName pattern again"));
    } else {
      performFetch({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          user: {
            firstName,
            lastName,
            userName,
            password,
            email,
            birthDay,
            phoneNumber,
            userType,
          },
        }),
      });
    }
  };
  function showPassword() {
    var x = document.getElementById("passwordInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  let statusComponent = null;
  if (error != null) {
    statusComponent = (
      <div data-testid={TEST_ID.errorContainer}>
        Error while trying to create user: {error.toString()}
      </div>
    );
  } else if (isLoading) {
    statusComponent = <Spinner data-testid={TEST_ID.loadingContainer} />;
  }

  return (
    <>
      <Form onSubmit={handleSubmit} title="Join NlLink">
        <InputFieldContainer className="first-name-wrapper">
          <Label>First Name</Label>
          <Input
            name="firstName"
            value={firstName}
            onChange={(value) => setFirstName(value)}
            data-testid={TEST_ID.firstNameInput}
          />
        </InputFieldContainer>
        <InputFieldContainer className="last-name-wrapper">
          <Label>Last Name</Label>
          <Input
            name="lastName"
            value={lastName}
            onChange={(value) => setLastName(value)}
            data-testid={TEST_ID.lastNameInput}
          />
        </InputFieldContainer>
        <InputFieldContainer>
          <Label>Username</Label>
          <Input
            name="userName"
            value={userName}
            onChange={(value) => {
              setUserName(value);
              USER_REGEX.test(value)
                ? setValidUserName(true)
                : setValidUserName(false);
            }}
            data-testid={TEST_ID.userNameInput}
            style={{
              background: validUsername ? "lightGreen" : "white",
            }}
          />
        </InputFieldContainer>
        <InputFieldContainer>
          <Label>Email Address</Label>
          <Input
            name="email"
            type="email"
            value={email}
            onChange={(value) => setEmail(value)}
            data-testid={TEST_ID.emailInput}
          />
        </InputFieldContainer>
        <InputFieldContainer>
          <Label>User Type</Label>
          <Select
            value={userType}
            onChange={(value) => setUserType(value)}
            options={[
              { value: "NewComer", text: "New comer" },
              { value: "Local", text: "Local" },
            ]}
          />
        </InputFieldContainer>
        <InputFieldContainer>
          <Label>Birth Day</Label>
          <Input
            name="birthDay"
            type="date"
            value={birthDay}
            onChange={(value) => setBirthDay(value)}
            data-testid={TEST_ID.birthDayInput}
          />
        </InputFieldContainer>
        <InputFieldContainer>
          <Label>Phone Number</Label>
          <Input
            name="phoneNumber"
            value={phoneNumber}
            onChange={(value) => setPhoneNumber(value)}
            data-testid={TEST_ID.phoneNumberInput}
          />
        </InputFieldContainer>
        <InputFieldContainer
          className="password-wrapper"
          onMouseEnter={() => setIsHint(true)}
          onMouseLeave={() => setIsHint(false)}
        >
          <Label>Password ?</Label>
          <Input
            name="password"
            value={password}
            type="password"
            onChange={(value) => setPassword(value)}
            data-testid={TEST_ID.passwordInput}
            id="passwordInput"
            style={{
              background: strongRegex.test(password) ? "lightGreen" : "white",
            }}
          />
          {isHint && <PasswordHint />}
        </InputFieldContainer>
        <InputFieldContainer className="confirm-password-wrapper">
          <Label>Confirm Password</Label>
          <Input
            name="confirmPassword"
            value={confirmPassword}
            type="password"
            onChange={(value) => setConfirmPassword(value)}
            data-testid={TEST_ID.passwordInput}
          />
        </InputFieldContainer>
        <label className="input-checkbox-container">
          <input
            type="checkbox"
            className="input-checkbox"
            onClick={() => showPassword()}
          />
          Show password
        </label>
        <Button
          className="btn-block"
          data-testid={TEST_ID.submitButton}
          type="submit"
        >
          Create new account
        </Button>
        {passError && <h2>{passError.toString()}</h2>}
        {userError && <h2>{userError.toString()}</h2>}
      </Form>
      {statusComponent}
    </>
  );
};

export default CreateUser;
