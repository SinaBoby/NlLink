import React from "react";
import PropTypes from "prop-types";
import "./DropdownLink.css";

const DropdownLink = ({ children }) => {
  return <button className="dropdown-link">{children}</button>;
};

DropdownLink.propTypes = {
  children: PropTypes.string.isRequired,
};

export default DropdownLink;
