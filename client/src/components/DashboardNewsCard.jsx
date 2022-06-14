import React from "react";
import "./DashboardNewsCard.css";
import PropTypes from "prop-types";

const DashboardNewsCard = ({ news }) => {
  return (
    <div className="dashboard-news-card-wrapper">
      <h3>{news.title}</h3>
      <p className="dashboard-news-card-content">{news.content}</p>
      <cite>{news.sources[0]}</cite>
    </div>
  );
};

export default DashboardNewsCard;

DashboardNewsCard.propTypes = {
  news: PropTypes.object.isRequired,
};
