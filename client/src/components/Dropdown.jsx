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
      <DropdownLink onClick={() => navigate("/contact")}>
        Contact us
      </DropdownLink>
      <Divider />
      <DropdownLink onClick={() => navigate("/login")}>Login</DropdownLink>
      <DropdownLink onClick={() => navigate("/user/create")}>
        Register
      </DropdownLink>
    </div>
  );
};

export default Dropdown;
