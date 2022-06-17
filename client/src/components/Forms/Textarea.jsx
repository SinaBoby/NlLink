import React from "react";
import PropTypes from "prop-types";
import "./TextArea.css";

const TextArea = ({ name, value, onChange, ...rest }) => {
  return (
    <textarea
      {...rest}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={"textarea"}
      cols="30"
      rows="10"
    ></textarea>
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextArea;
