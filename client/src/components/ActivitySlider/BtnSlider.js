import React from "react";
import leftArrow from "./icons/arrow-left.svg";
import rightArrow from "./icons/arrow-right.svg";
import PropTypes from "prop-types";

const BtnSlider = ({ direction, moveSlide }) => {
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <img src={direction === "next" ? rightArrow : leftArrow} />
    </button>
  );
};

BtnSlider.propTypes = {
  direction: PropTypes.string.isRequired,
  moveSlide: PropTypes.func.isRequired,
};

export default BtnSlider;
