import React from "react";
import "./Dropdown.css";
import Divider from "./Divider";
import DropdownLink from "./DropdownLink";

const Dropdown = () => {
  return (
    <div className="dropdown">
      <DropdownLink>News</DropdownLink>
      <DropdownLink>About</DropdownLink>
      <DropdownLink>Contact us</DropdownLink>
      <Divider />
      <DropdownLink>Login</DropdownLink>
      <DropdownLink>Register</DropdownLink>
    </div>
  );
};

export default Dropdown;
