import React from "react";
import "./NewsCard.css";
import PropTypes from "prop-types";

const NewsCard = ({ news }) => {
  return (
    <div className="news-card-wrapper">
      <h3>{news.title}</h3>
      <p className="news-card-content">{news.content}</p>
      <cite>{news.sources[0]}</cite>
    </div>
  );
};

export default NewsCard;

NewsCard.propTypes = {
  news: PropTypes.object.isRequired,
};
