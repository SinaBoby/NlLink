import React from "react";
import "./SignUp.css";
import Input from "../../components/Input";
import Button from "../../components/Button";

const SignUp = () => {
  return (
    <div className="signup-container">
      <form onSubmit={() => {}}>
        <h2>Sign Up</h2>
        <div className="signup-input-field">
          <label>First Name</label>
          <Input name="firstName" value={name} required />
        </div>
        <div className="signup-input-field">
          <label>Last Name</label>
          <Input name="lastName" value={name} required />
        </div>
        <div className="signup-input-field">
          <label>Username</label>
          <Input name="userName" value={name} required />
        </div>
        <div className="signup-input-field">
          <label>Email</label>
          <Input name="email" value={name} required />
        </div>
        <div className="signup-input-field">
          <label>Password</label>
          <Input name="password" type="password" value={name} required />
        </div>
        <div className="signup-input-field">
          <label>User Type</label>
          <Input name="userType" value={name} required />
        </div>
        <div className="signup-input-field">
          <label>Phone Number</label>
          <Input name="phoneNumber" value={name} />
        </div>
        <div className="signup-input-field">
          <label>Birth Day</label>
          <Input name="birthDay" value={name} required />
        </div>
        <div className="signup-input-field">
          <label>Interests</label>
          <Input name="Interests" value={name} />
        </div>
        <Button className="btn-link navbar-link">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUp;
