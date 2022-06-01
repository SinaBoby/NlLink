import React, { useEffect, useState } from "react";

import Input from "../../components/Input";
import useFetch from "../../hooks/useFetch";
import TEST_ID from "./CreateUser.testid";

const CreateUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDay, setBirthDay] = useState("");

  const onSuccess = () => {
    setFirstName("");
    setLastName("");
    setUserName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setBirthDay("");
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
    <div data-testid={TEST_ID.container}>
      <h1>What should the user be?</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="firstName"
          value={firstName}
          onChange={(value) => setFirstName(value)}
          data-testid={TEST_ID.firstNameInput}
        />
        <Input
          name="lastName"
          value={lastName}
          onChange={(value) => setLastName(value)}
          data-testid={TEST_ID.lastNameInput}
        />
        <Input
          name="userName"
          value={userName}
          onChange={(value) => setUserName(value)}
          data-testid={TEST_ID.userNameInput}
        />
        <Input
          name="email"
          type="email"
          value={email}
          onChange={(value) => setEmail(value)}
          data-testid={TEST_ID.emailInput}
        />
        <Input
          name="birthDay"
          type="date"
          value={lastName}
          onChange={(value) => setBirthDay(value)}
          data-testid={TEST_ID.birthDayInput}
        />
        <Input
          name="phoneNumber"
          value={phoneNumber}
          onChange={(value) => setPhoneNumber(value)}
          data-testid={TEST_ID.phoneNumberInput}
        />
        <Input
          name="password"
          value={password}
          onChange={(value) => setPassword(value)}
          data-testid={TEST_ID.passwordInput}
        />
        <button type="submit" data-testid={TEST_ID.submitButton}>
          Submit
        </button>
      </form>
      {statusComponent}
    </div>
  );
};

export default CreateUser;
