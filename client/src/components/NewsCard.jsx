import React from "react";
import PropTypes from "prop-types";

const NewsCard = ({ news }) => {
  return (
    <div className="news-card-wrapper">
      <h3>{news.title}</h3>
    </div>
  );
};

export default NewsCard;

NewsCard.propTypes = {
  news: PropTypes.object.isRequired,
};
