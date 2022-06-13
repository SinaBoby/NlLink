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
import Error from "../../components/Error/Error";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PasswordHint = () => {
  return (
    <div className="hint password-hint">
      <h3> Password Requirements:</h3>
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
    <div className="hint userName-hint">
      <h3> Username Requirements:</h3>
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
  const [isValidUsername, setIsValidUserName] = useState(false);
  const [userError, setUserError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isValidEmail, setIsValidEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isValidPhone, setIsValidPhone] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [userType, setUserType] = useState("NewComer");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [isValidAge, setIsValidAge] = useState("");
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_@#$%^&*])(?=.{6,64})"
  );
  const USER_REGEX = new RegExp("^[a-zA-Z][a-zA-Z0-9-_@.]{2,64}$");
  const emailRegex = new RegExp(
    "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
  );
  const phoneRegex = /[+|00][0-9]{7,15}/;
  const onSuccess = () => {
    clearForm();
    navigate("/login");
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/create",
    onSuccess
  );
  const userNameValidation = () => {
    isValidUsername
      ? setUserError("")
      : setUserError("Please check the username pattern again.");
  };
  const passwordValidation = () => {
    isValidPassword
      ? setPassError("")
      : setPassError("Please check the password pattern again.");
  };
  const emailValidation = () => {
    isValidEmail
      ? setEmailError("")
      : setEmailError("Please enter a valid Email address.");
  };
  const phoneValidation = () => {
    isValidPhone
      ? setPhoneError("")
      : setPhoneError("Please enter a valid Phone number.");
  };
  const ageValidation = () => {
    isValidAge
      ? setAgeError("")
      : setAgeError("You need to be above 18 in order to sign up.");
  };
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
    if (emailError) {
      setTimeout(() => setEmailError(null), 3000);
    }
    if (phoneError) {
      setTimeout(() => setPhoneError(""), 3000);
    }
    if (ageError) {
      setTimeout(() => setAgeError(""), 3000);
    }
  }, [passError, userError, emailError, phoneError, ageError]);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      password !== confirmPassword &&
      !strongRegex.test(password) &&
      !isValidUsername &&
      getAge(birthDay) >= 18
    ) {
      setPassError(
        "Passwords you entered are not same & outside the pattern please try again"
      );
      setUserError("Please check the userName pattern again");
    } else if (password !== confirmPassword) {
      setPassError("Password you entered are not same please try again");
    } else if (!strongRegex.test(password)) {
      setPassError("Please check the password pattern again");
    } else if (getAge(birthDay) < 18) {
      setAgeError("You need to be above 18 in order to sign up");
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
      <Error data-testid={TEST_ID.errorContainer}>
        Error while trying to create user: {error}
      </Error>
    );
  } else if (isLoading) {
    statusComponent = <Spinner data-testid={TEST_ID.loadingContainer} />;
  }

  return (
    <Form onSubmit={handleSubmit} title="Join NlLink">
      <InputFieldContainer className="first-name-wrapper">
        <Label>
          First Name <span className="required-star">*</span>
        </Label>
        <Input
          name="firstName"
          value={firstName}
          placeholder="First Name"
          maxLength="100"
          title="Required field"
          onChange={(value) => setFirstName(value)}
          data-testid={TEST_ID.firstNameInput}
          required
        />
      </InputFieldContainer>
      <InputFieldContainer className="last-name-wrapper">
        <Label>
          Last Name <span className="required-star">*</span>
        </Label>
        <Input
          name="lastName"
          value={lastName}
          maxLength="100"
          placeholder="Last Name"
          title="Required field"
          onChange={(value) => setLastName(value)}
          data-testid={TEST_ID.lastNameInput}
          required
        />
      </InputFieldContainer>
      <InputFieldContainer className="username-wrapper">
        <Label>
          Username <span className="required-star">* </span>{" "}
          <span
            className="hint-sign"
            onMouseEnter={() => setUserHint(true)}
            onMouseLeave={() => setUserHint(false)}
          >
            {" "}
            ?
          </span>
          <span>
            {userError &&
              toast.error(userError, {
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })}
          </span>
        </Label>
        <Input
          name="userName"
          value={userName}
          minLength="3"
          maxLength="64"
          pattern="^[a-zA-Z][a-zA-Z0-9-_@.]{2,64}$"
          placeholder="Username, should not be used before."
          title="Required field, should not be used before"
          onChange={(value) => {
            setUserName(value);
            USER_REGEX.test(value)
              ? setIsValidUserName(true)
              : setIsValidUserName(false);
          }}
          onBlur={userNameValidation}
          data-testid={TEST_ID.userNameInput}
          style={{
            background: isValidUsername ? "lightGreen" : "white",
          }}
          required
        />
        {userHint && <UserHint />}
      </InputFieldContainer>
      <InputFieldContainer className="email-input-wrapper">
        <Label>
          Email address <span className="required-star">*</span>{" "}
          <span>{emailError && <Error>{emailError}</Error>}</span>
        </Label>
        <Input
          name="email"
          type="email"
          minLength="3"
          maxLength="250"
          title="Required field, please enter a valid email address"
          value={email}
          pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
          placeholder="foo@domain.com"
          onChange={(value) => {
            setEmail(value);
            emailRegex.test(value)
              ? setIsValidEmail(true)
              : setIsValidEmail(false);
          }}
          onBlur={emailValidation}
          style={{
            background: isValidEmail ? "lightGreen" : "white",
          }}
          data-testid={TEST_ID.emailInput}
          required
        />
      </InputFieldContainer>
      <InputFieldContainer className="phone-input-wrapper">
        <Label>
          Mobile Number <span className="required-star">*</span>{" "}
          <span>
            {phoneError &&
              toast.error(phoneError, {
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })}
          </span>
        </Label>
        <PhoneInput
          name="phoneNumber"
          value={phoneNumber}
          defaultCountry="NL"
          minLength="8"
          maxLength="16"
          title="Required field, please enter a valid mobile number"
          placeholder="First select the country."
          onChange={(value) => {
            setPhoneNumber(value);

            phoneRegex.test(phoneNumber)
              ? setIsValidPhone(true)
              : setIsValidPhone(false);
          }}
          onBlur={phoneValidation}
          style={{
            background: isValidPhone ? "lightGreen" : "white",
          }}
          data-testid={TEST_ID.phoneNumberInput}
          required
        />
      </InputFieldContainer>
      <InputFieldContainer className="userType-input-wrapper">
        <Label>
          User type <span className="required-star">*</span>{" "}
        </Label>
        <Select
          value={userType}
          title="Required field"
          onChange={(value) => setUserType(value)}
          options={[
            { value: "Newcomer", text: "Newcomer" },
            { value: "Local", text: "Local" },
          ]}
          required
        />
      </InputFieldContainer>
      <InputFieldContainer className="birthDay-input-wrapper">
        <Label>
          Date of birth <span className="required-star">*</span>{" "}
          <span>
            {ageError &&
              toast.error(ageError, {
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })}
          </span>
        </Label>
        <Input
          name="birthDay"
          title="Required field, You need to be above 18!"
          type="date"
          value={birthDay}
          onChange={(value) => {
            setBirthDay(value);
            getAge(birthDay) >= 18 ? setIsValidAge(true) : setIsValidAge(false);
          }}
          onBlur={ageValidation}
          style={{
            background: isValidAge ? "lightGreen" : "white",
          }}
          data-testid={TEST_ID.birthDayInput}
          required
        />
      </InputFieldContainer>

      <InputFieldContainer className="password-wrapper">
        <Label>
          Password <span className="required-star">*</span>{" "}
          <span
            className="hint-sign"
            onMouseEnter={() => setIsHint(true)}
            onMouseLeave={() => setIsHint(false)}
          >
            ?{isHint && <PasswordHint />}
          </span>
          <span>
            {passError &&
              toast.error(passError, {
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })}
          </span>
        </Label>
        <Input
          name="password"
          title="Required field"
          value={password}
          type="password"
          minLength="6"
          maxLength="64"
          onChange={(value) => {
            setPassword(value);
            strongRegex.test(value)
              ? setIsValidPassword(true)
              : setIsValidPassword(false);
          }}
          onBlur={passwordValidation}
          data-testid={TEST_ID.passwordInput}
          id="passwordInput"
          style={{
            background: isValidPassword ? "lightGreen" : "white",
          }}
          required
        />
      </InputFieldContainer>
      <InputFieldContainer className="confirm-password-wrapper">
        <Label>
          Confirm password <span className="required-star">*</span>{" "}
        </Label>
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
      {statusComponent && statusComponent}
    </Form>
  );
};

export default CreateUser;
