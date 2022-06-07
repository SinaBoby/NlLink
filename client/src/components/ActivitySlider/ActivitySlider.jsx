import React, { useState } from "react";
import BtnSlider from "./BtnSlider";
import "./ActivitySlider.css";
import PropTypes from "prop-types";

const ActivitySlider = ({ activitiesData }) => {
  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== activitiesData.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === activitiesData.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(activitiesData.length);
    }
  };
  return (
    <div className="slider-container">
      {activitiesData.map((activity, index) => {
        return (
          <div
            key={activity.title}
            className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
          >
            <h4>{activity.title}</h4>
            <p>{activity.description}</p>
          </div>
        );
      })}
      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />
    </div>
  );
};

ActivitySlider.propTypes = {
  activitiesData: PropTypes.array.isRequired,
};

export default ActivitySlider;
