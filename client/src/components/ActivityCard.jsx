import React from "react";
import "./ActivityCard.css";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

const ActivityCard = ({ activity }) => {
  return (
    <div className="activity-card-wrapper">
      <h3>{activity.title}</h3>
      <p>...</p>
    </div>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.object.isRequired,
};

export default ActivityCard;
