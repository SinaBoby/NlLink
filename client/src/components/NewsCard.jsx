import React from "react";
import "./NewsCard.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const NewsCard = ({ news }) => {
  return (
    <>
      {news && (
        <div className="news-card-wrapper">
          <div className="news-card-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1544056113-76ec529669b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt={news.title}
            />
          </div>
          <h2 className="news-card-title">{news.title}</h2>
          <div className="news-card-content-wrapper">
            <p className="news-card-content">{news.content}</p>
          </div>
          <div className="read-more-link-wrapper">
            <Link to="/news/details" state={{ newsId: news._id }}>
              Read More
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsCard;

NewsCard.propTypes = {
  news: PropTypes.object.isRequired,
};
