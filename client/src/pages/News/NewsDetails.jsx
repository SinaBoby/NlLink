import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import "./NewsDetails.css";

const NewsDetails = () => {
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
    return <div></div>;
  }
  const location = useLocation();
  console.log(location, "location");
  const newsId = location.state?.newsId;
  console.log(newsId);

  return (
    <div className="news-details-container">{error && <div>{error}</div>}</div>
  );
};

export default NewsDetails;
