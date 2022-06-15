import React, { useState, useEffect } from "react";
import DashboardNewsCard from "./DashboardNewsCard";
import useFetch from "../hooks/useFetch";
import "./DashboardNews.css";

const DashboardNews = () => {
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
    return <div>...</div>;
  }

  return (
    <div className="news-wrapper">
      {error && <div>{error}</div>}
      {newsData &&
        newsData.map((news) => {
          return <DashboardNewsCard key={news.title} news={news} />;
        })}
    </div>
  );
};

export default DashboardNews;
