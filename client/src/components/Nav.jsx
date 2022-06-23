import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";
import burgerIcon from "../images/icon-hamburger.svg";
import "./Nav.css";
import { AuthContext } from "../AuthContext";
import TEST_ID from "./Nav.testid";
import Dropdown from "./Dropdown";
import useUserDetails from "./../hooks/useUserDetails";
import { useWindowSize } from "./../hooks/useWindowSize";

const Nav = () => {
  const [isDropdown, setDropdown] = useState();
  const { isAuthenticated } = useContext(AuthContext);
  const { userDetails } = useUserDetails();
  const [width] = useWindowSize();
  const toggleDropdown = () => setDropdown((prev) => !prev);

  return (
    <>
      <div className="navbar">
        <Link to={"/"} className="logo" data-testid={TEST_ID.linkToHome}>
          <img src={logo} />
        </Link>
        <div className="navbar-right">
          <div className="collapse">
            {isAuthenticated && (
              <Link to="/news" className="navbar-link">
                News
              </Link>
            )}
            {isAuthenticated && (
              <Link to="/activities" className="navbar-link">
                Activities
              </Link>
            )}
            {userDetails && isAuthenticated && (
              <Link to="connect" className="navbar-link">
                {userDetails.userType === "NewComer"
                  ? "Connect to Locals"
                  : "Connect to New Comers"}
              </Link>
            )}
            <Link to="/about" className="navbar-link">
              About
            </Link>
            <Link to="/contact" className="navbar-link">
              Contact us
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="navbar-link"
                  data-testid={TEST_ID.linkToUsers}
                >
                  Dashboard
                </Link>
                <Link to="/logout" className="navbar-link  btn-link">
                  Sign out
                </Link>
              </>
            ) : (
              <Link to="/login" className="navbar-link  btn-link">
                Sign in
              </Link>
            )}
          </div>
          <button onClick={toggleDropdown} className="btn-menu mobile">
            <img src={burgerIcon} alt={"burger menu icon"} />
          </button>
        </div>
        {isDropdown && width < 1080 && (
          <Dropdown closeDropdown={() => setDropdown(false)} />
        )}
      </div>
    </>
  );
};

export default Nav;
