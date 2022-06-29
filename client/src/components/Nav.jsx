import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";
//import burgerIcon from "../images/icon-hamburger.svg";
import "./Nav.css";
import { AuthContext } from "../AuthContext";
import TEST_ID from "./Nav.testid";
import Dropdown from "./Dropdown";
import useUserDetails from "./../hooks/useUserDetails";
import { useWindowSize } from "./../hooks/useWindowSize";
import ThemeToggleButton from "./ThemeToggleButton";
import { ThemeContext } from "../ThemeContext";
import { MdMenu } from "react-icons/md";
import { IconContext } from "react-icons";

const Nav = () => {
  const [isDropdown, setDropdown] = useState();
  const { isAuthenticated } = useContext(AuthContext);
  const { userDetails } = useUserDetails();
  const [width] = useWindowSize();
  const toggleDropdown = () => setDropdown((prev) => !prev);
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <IconContext.Provider
        value={{
          color: theme.foreground,
          size: "2.9rem",
          className: "react-nav-icon",
        }}
      >
        <div
          className="navbar"
          style={{ backgroundColor: theme.background, color: theme.foreground }}
        >
          <Link to={"/"} className="logo" data-testid={TEST_ID.linkToHome}>
            <img src={logo} />
          </Link>
          <div className="navbar-right">
            <div className="collapse">
              {isAuthenticated && userDetails && (
                <Link to={"/news"} className="navbar-link">
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
              <MdMenu />
            </button>
            <ThemeToggleButton className="theme-btn" />
          </div>
          {isDropdown && width < 1080 && (
            <Dropdown closeDropdown={() => setDropdown(false)} />
          )}
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Nav;
