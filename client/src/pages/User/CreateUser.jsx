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
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { logInfo } from "../../../../server/src/util/logging";

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
const UserHint = () => {
  return (
    <div className="password-hint">
      <h3> Username should follow this pattern:</h3>
      <ul>
        <li>Minimum 3 and maximum 23 characters </li>
        <li>First character should be alphabetical</li>
        <li>Allowed special characters: [-_@.]</li>
        <li>Only numeric, alphabetical or mentioned special characters</li>
        <li>Has not used before</li>
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
  const [userHint, setUserHint] = useState(false);
  const [validUsername, setValidUserName] = useState(false);
  const [userError, setUserError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [userType, setUserType] = useState("NewComer");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [ageError, setAgeError] = useState("");
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,64})"
  );
  const USER_REGEX = new RegExp("^[a-zA-Z][a-zA-Z0-9-_@.]{3,64}$");
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
      navigate("/");
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
  function getAge(birthDay) {
    var today = new Date();
    var birthDate = new Date(birthDay);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  useEffect(() => {
    logInfo(getAge(birthDay));
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      password !== confirmPassword &&
      !strongRegex.test(password) &&
      !validUsername &&
      getAge(birthDay) >= 18
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
    } else if (getAge(birthDay) < 18) {
      setAgeError(new Error("You need to be above 18 in order to sign up"));
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
        Error while trying to create user: {error}
      </div>
    );
  } else if (isLoading) {
    statusComponent = <Spinner data-testid={TEST_ID.loadingContainer} />;
  }

  return (
    <Form onSubmit={handleSubmit} title="Join NlLink">
      <InputFieldContainer className="first-name-wrapper">
        <Label>First Name</Label>
        <Input
          name="firstName"
          value={firstName}
          placeholder="Required"
          maxLength="100"
          title="Required field"
          onChange={(value) => setFirstName(value)}
          data-testid={TEST_ID.firstNameInput}
          required
        />
      </InputFieldContainer>
      <InputFieldContainer className="last-name-wrapper">
        <Label>Last Name</Label>
        <Input
          name="lastName"
          value={lastName}
          maxLength="100"
          placeholder="Required"
          title="Required field"
          onChange={(value) => setLastName(value)}
          data-testid={TEST_ID.lastNameInput}
          required
        />
      </InputFieldContainer>
      <InputFieldContainer
        className="username-wrapper"
        onMouseEnter={() => setUserHint(true)}
        onMouseLeave={() => setUserHint(false)}
      >
        <Label>Username</Label>
        <Input
          name="userName"
          value={userName}
          minLength="3"
          maxLength="64"
          pattern="^[a-zA-Z][a-zA-Z0-9-_@.]{3,64}$"
          placeholder="Required, should not be used before"
          title="Required field, should not be used before"
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
          required
        />
        {userHint && <UserHint />}
      </InputFieldContainer>
      <InputFieldContainer className="email-input-wrapper">
        <Label>Email Address</Label>
        <Input
          name="email"
          type="email"
          minLength="3"
          maxLength="250"
          title="Required field, please enter a valid email address"
          value={email}
          pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
          placeholder="Required, foo@domain.com"
          onChange={(value) => setEmail(value)}
          data-testid={TEST_ID.emailInput}
          required
        />
      </InputFieldContainer>
      <InputFieldContainer className="phone-input-wrapper">
        <Label>Phone Number</Label>
        <PhoneInput
          name="phoneNumber"
          value={phoneNumber}
          defaultCountry="NL"
          minLength="8"
          maxLength="16"
          title="Required field, please enter a valid mobile phone number"
          placeholder="select the country & enter your phone number"
          onChange={(value) => setPhoneNumber(value)}
          data-testid={TEST_ID.phoneNumberInput}
          className="input"
          style={{ padding: "0 0 0 0.8rem" }}
          required
        />
      </InputFieldContainer>
      <InputFieldContainer className="userType-input-wrapper">
        <Label>User Type</Label>
        <Select
          value={userType}
          title="Required field"
          onChange={(value) => setUserType(value)}
          options={[
            { value: "New comer", text: "New comer" },
            { value: "Local", text: "Local" },
          ]}
          required
        />
      </InputFieldContainer>
      <InputFieldContainer className="birthDay-input-wrapper">
        <Label>Birth Day</Label>
        <Input
          name="birthDay"
          title="Required field, You need to be above 18!"
          type="date"
          value={birthDay}
          onChange={(value) => setBirthDay(value)}
          data-testid={TEST_ID.birthDayInput}
          required
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
          title="Required field"
          value={password}
          type="password"
          minLength="6"
          maxLength="64"
          onChange={(value) => setPassword(value)}
          data-testid={TEST_ID.passwordInput}
          id="passwordInput"
          style={{
            background: strongRegex.test(password) ? "lightGreen" : "white",
          }}
          required
        />
        {isHint && <PasswordHint />}
      </InputFieldContainer>
      <InputFieldContainer className="confirm-password-wrapper">
        <Label>Confirm Password</Label>
        <Input
          name="confirmPassword"
          value={confirmPassword}
          title="Required field, must match the password you entered"
          type="password"
          minLength="6"
          maxLength="64"
          onChange={(value) => setConfirmPassword(value)}
          data-testid={TEST_ID.passwordInput}
          required
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
      {statusComponent}
      {passError && <h2>{passError.toString()}</h2>}
      {userError && <h2>{userError.toString()}</h2>}
      {ageError && <h2>{ageError.toString()}</h2>}
    </Form>
  );
};

export default CreateUser;
