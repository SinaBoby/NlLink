import React, { useState, useEffect } from "react";
import "./News.css";
import newsHero from "../../images/news-hero.jpg";
import NewsCard from "../../components/NewsCard";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

const News = () => {
  const [newsData, setNewsData] = useState(null);

  const onSuccess = (response) => {
    setNewsData(response.result);
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/news",
    onSuccess
  );
  useEffect(() => {
    performFetch({
      credentials: "include",
    });

    return cancelFetch;
  }, []);

  if (isLoading) {
    return <div>is loading</div>;
  }

  return (
    <div className="news-container">
      <div className="news-hero-wrapper">
        <img src={newsHero} alt="" />
      </div>
      {error && <div>Sorry :( We can not display the news at the moment</div>}
      <div className="news-section-wrapper">
        {newsData &&
          newsData.map((news) => {
            return <NewsCard key={news.title} news={news} />;
          })}
      </div>
      <div className="add-news-link-wrapper">
        <Link to="/news/add" className="navbar-link">
          Add News
        </Link>
      </div>
    </div>
  );
};

export default News;
