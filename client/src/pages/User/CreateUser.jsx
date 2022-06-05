import React, { useEffect, useState } from "react";

import Input from "../../components/Input";
import useFetch from "../../hooks/useFetch";
import TEST_ID from "./CreateUser.testid";
import "./CreateUser.css";

const CreateUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
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
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/create",
    onSuccess
  );

  useEffect(() => {
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
    statusComponent = (
      <div data-testid={TEST_ID.loadingContainer}>Creating user....</div>
    );
  }

  return (
    <div data-testid={TEST_ID.container} className="create-user-container">
      <h2 className="create-user-header">Join NlLink</h2>
      <p> Password must contain at least:</p>
      <ul>
        <li>Be 6 characters or longer</li>
        <li>1 lowercase alphabetical character</li>
        <li>1 uppercase alphabetical character</li>
        <li>1 numeric character</li>
        <li>1 special character(!@#$%^&)</li>
      </ul>

      <form onSubmit={handleSubmit} className="create-user-form">
        <div className="create-user-input-field first-name-wrapper">
          <label>First Name</label>
          <Input
            name="firstName"
            value={firstName}
            onChange={(value) => setFirstName(value)}
            data-testid={TEST_ID.firstNameInput}
          />
        </div>
        <div className="create-user-input-field last-name-wrapper">
          <label>Last Name</label>
          <Input
            name="lastName"
            value={lastName}
            onChange={(value) => setLastName(value)}
            data-testid={TEST_ID.lastNameInput}
          />
        </div>
        <div className="create-user-input-field">
          <label>Username</label>
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
        </div>
        <div className="create-user-input-field">
          <label>Email</label>
          <Input
            name="email"
            type="email"
            value={email}
            onChange={(value) => setEmail(value)}
            data-testid={TEST_ID.emailInput}
          />
        </div>
        <div className="create-user-input-field">
          <label>User Type</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="NewComer">NewComer</option>
            <option value="Local">Local</option>
          </select>
        </div>

        <div className="create-user-input-field">
          <label>Birth Day</label>
          <Input
            name="birthDay"
            type="date"
            value={birthDay}
            onChange={(value) => setBirthDay(value)}
            data-testid={TEST_ID.birthDayInput}
          />
        </div>
        <div className="create-user-input-field">
          <label>Phone Number</label>
          <Input
            name="phoneNumber"
            value={phoneNumber}
            onChange={(value) => setPhoneNumber(value)}
            data-testid={TEST_ID.phoneNumberInput}
          />
        </div>
        <div className="create-user-input-field">
          <label>
            Password
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
          </label>
          <label>
            Confirm Password
            <Input
              name="confirmPassword"
              value={confirmPassword}
              type="password"
              onChange={(value) => setConfirmPassword(value)}
              data-testid={TEST_ID.passwordInput}
            />
          </label>
        </div>
        <label>
          {" "}
          <span>Show password</span>
          <input type="checkbox" onClick={() => showPassword()} />
        </label>
        <button
          type="submit"
          className="btn-link navbar-link create-user-submit-btn"
          data-testid={TEST_ID.submitButton}
        >
          Submit
        </button>
      </form>
      {statusComponent}
      {passError && <h2>{passError.toString()}</h2>}
      {userError && <h2>{userError.toString()}</h2>}
    </div>
  );
};

export default CreateUser;
