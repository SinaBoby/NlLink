import React from "react";
import "./SignUp.css";
import Input from "../../components/Input";

const SignUp = () => {
  return (
    <div className="signup-container">
      <form>
        <h2>Sign Up</h2>
        <div className="signup-input-field">
          <label>First Name</label>
          <Input name="firstName" value={name} />
        </div>
        <div className="signup-input-field">
          <label>Last Name</label>
          <Input name="lastName" value={name} />
        </div>
        <div className="signup-input-field">
          <label>Username</label>
          <Input name="userName" value={name} />
        </div>
        <div className="signup-input-field">
          <label>Email</label>
          <Input name="email" value={name} />
        </div>
        <div className="signup-input-field">
          <label>Password</label>
          <Input name="password" value={name} />
        </div>
        <div className="signup-input-field">
          <label>User Type</label>
          <Input name="userType" value={name} />
        </div>
        <div className="signup-input-field">
          <label>Phone Number</label>
          <Input name="phoneNumber" value={name} />
        </div>
        <div className="signup-input-field">
          <label>Birth Day</label>
          <Input name="birthDay" value={name} />
        </div>
        <div className="signup-input-field">
          <label>Interests</label>
          <Input name="Interests" value={name} />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
