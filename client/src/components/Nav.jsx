import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";
import burgerIcon from "../images/icon-hamburger.svg";
import "./Nav.css";

import TEST_ID from "./Nav.testid";
import Dropdown from "./Dropdown";

const Nav = () => {
  const [isDropdown, setDropdown] = useState();

  const toggleDropdown = () => setDropdown((prev) => !prev);

  return (
    <div className="navbar">
      <Link to={"/"} className="logo" data-testid={TEST_ID.linkToHome}>
        <img src={logo} />
      </Link>
      <div className="navbar-right">
        <div className="collapse">
          <Link to="/news" className="navbar-link">
            News
          </Link>
          <Link to="/contact" className="navbar-link">
            Contact us
          </Link>
          <Link to="/about" className="navbar-link">
            About
          </Link>
          <Link
            to="/user"
            className="navbar-link"
            data-testid={TEST_ID.linkToUsers}
          >
            User
          </Link>
          <Link to="/login" className="navbar-link  btn-link">
            Login/Sign up
          </Link>
        </div>
        <button onClick={toggleDropdown} className="btn-menu mobile">
          <img src={burgerIcon} alt={"burger menu icon"} />
        </button>
      </div>
      {isDropdown && <Dropdown />}
    </div>
  );
};

export default Nav;
