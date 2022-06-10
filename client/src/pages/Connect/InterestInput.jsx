import React from "react";
import "./InterestInput.css";
import PropTypes from "prop-types";

const InterestInput = ({ onChange, value }) => {
  return (
    <input
      type={"text"}
      id="interest-input"
      name="interest"
      value={value}
      onChange={onChange}
    />
  );
};

InterestInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default InterestInput;
