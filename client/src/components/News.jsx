import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import useFetch from "../hooks/useFetch";
import "./News.css";

const News = () => {
  const [newsData, setNewsData] = useState(null);

  const onSuccess = (response) => {
    setNewsData(response.result);
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/news",
    onSuccess
  );
  useEffect(() => {
    performFetch({
      credentials: "include",
    });

    return cancelFetch;
  }, []);

  if (isLoading) {
    return <div>...</div>;
  }

  return (
    <div className="news-wrapper">
      {error && <div>{error}</div>}
      {newsData &&
        newsData.map((news) => {
          return <NewsCard key={news.title} news={news} />;
        })}
    </div>
  );
};

export default News;