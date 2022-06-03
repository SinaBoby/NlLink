import React, { useEffect, useState } from "react";

import Input from "../../components/Input";
import useFetch from "../../hooks/useFetch";
import TEST_ID from "./CreateUser.testid";
import "./CreateUser.css";

const CreateUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [userType, setUserType] = useState("NewComer");

  const onSuccess = () => {
    setFirstName("");
    setLastName("");
    setUserName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setBirthDay("");
    setUserType("NewComer");
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/create",
    onSuccess
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <div data-testid={TEST_ID.loadingContainer}>Creating user....</div>
    );
  }

  return (
    <div data-testid={TEST_ID.container} className="create-user-container">
      <h2 className="create-user-header">Join NlLink</h2>
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
            onChange={(value) => setUserName(value)}
            data-testid={TEST_ID.userNameInput}
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
          <label>Password</label>
          <Input
            name="password"
            value={password}
            type="password"
            onChange={(value) => setPassword(value)}
            data-testid={TEST_ID.passwordInput}
          />
        </div>

        <button
          type="submit"
          className="btn-link navbar-link create-user-submit-btn"
          data-testid={TEST_ID.submitButton}
        >
          Submit
        </button>
      </form>
      {statusComponent}
    </div>
  );
};

export default CreateUser;
