import React from "react";
import "./NewsCard.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const NewsCard = ({ news }) => {
  return (
    <>
      {news && (
        <div className="news-card-wrapper">
          <img src={news.imageUrl} alt={news.title} />
          <h2>{news.title}</h2>
          <p>{news.content}</p>
          <cite>{news.sources[0]}</cite>
          <Link to="/news/details">Read More...</Link>
        </div>
      )}
    </>
  );
};

export default NewsCard;

NewsCard.propTypes = {
  news: PropTypes.object.isRequired,
};
