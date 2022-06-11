import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./Dropdown.css";
import { useNavigate } from "react-router-dom";
import Divider from "./Divider";
import DropdownLink from "./DropdownLink";
import { AuthContext } from "../AuthContext";
import useUserDetails from "../hooks/useUserDetails";

const Dropdown = ({ closeDropdown }) => {
  const navigate = useNavigate();

  const { isAuthenticated } = useContext(AuthContext);
  const { userDetails } = useUserDetails();

  const handleNavigation = (route) => {
    closeDropdown();
    navigate(route);
  };

  return (
    <div className="dropdown">
      <DropdownLink>News</DropdownLink>
      <DropdownLink onClick={() => handleNavigation("/about")}>
        About
      </DropdownLink>
      <DropdownLink onClick={() => handleNavigation("/contact")}>
        Contact us
      </DropdownLink>
      {isAuthenticated && userDetails && (
        <DropdownLink onClick={() => handleNavigation("/connect")}>
          {userDetails.userType === "NewComer"
            ? "Connect to Locals"
            : "Connect to New Comers"}
        </DropdownLink>
      )}
      {isAuthenticated && (
        <DropdownLink onClick={() => handleNavigation("/activities")}>
          Activities
        </DropdownLink>
      )}
      <Divider />
      {!isAuthenticated ? (
        <>
          <DropdownLink onClick={() => handleNavigation("/login")}>
            Login
          </DropdownLink>
          <DropdownLink onClick={() => handleNavigation("/user/create")}>
            Register
          </DropdownLink>
        </>
      ) : (
        <>
          <DropdownLink onClick={() => handleNavigation("/dashboard")}>
            Profile
          </DropdownLink>
          <DropdownLink onClick={() => handleNavigation("/logout")}>
            Logout
          </DropdownLink>
        </>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  closeDropdown: PropTypes.func.isRequired,
};

export default Dropdown;
