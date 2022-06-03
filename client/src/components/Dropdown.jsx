import React from "react";
import "./Dropdown.css";
import { useNavigate } from "react-router-dom";
import Divider from "./Divider";
import DropdownLink from "./DropdownLink";

const Dropdown = () => {
  const navigate = useNavigate();

  return (
    <div className="dropdown">
      <DropdownLink>News</DropdownLink>
      <DropdownLink onClick={() => navigate("/about")}>About</DropdownLink>
      <DropdownLink>Contact us</DropdownLink>
      <Divider />
      <DropdownLink>Login</DropdownLink>
      <DropdownLink>Register</DropdownLink>
    </div>
  );
};

export default Dropdown;
