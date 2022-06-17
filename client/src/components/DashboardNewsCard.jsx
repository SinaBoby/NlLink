import React from "react";
import "./DashboardNewsCard.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DashboardNewsCard = ({ news }) => {
  return (
    <div className="dashboard-news-card-wrapper">
      <h3>{news.title}</h3>
      <h4>{news.category.replace(/^./, (str) => str.toUpperCase())}</h4>
      <p className="dashboard-news-card-content">{news.content}</p>
      <Link
        to="/news/details"
        state={{ newsId: news._id }}
        className="dashboard-news-card-link"
      >
        Read More
      </Link>
    </div>
  );
};

export default DashboardNewsCard;

DashboardNewsCard.propTypes = {
  news: PropTypes.object.isRequired,
};
