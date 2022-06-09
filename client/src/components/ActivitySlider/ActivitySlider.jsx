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
            <h2>{activity.title}</h2>
            <h3>{activity.category}</h3>
            <p>{activity.description}</p>
          </div>
        );
      })}
      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />
      <div className="activity-count-wrapper">
        {" "}
        {slideIndex}/{activitiesData.length}
      </div>
    </div>
  );
};

ActivitySlider.propTypes = {
  activitiesData: PropTypes.array.isRequired,
};

export default ActivitySlider;