import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import getTimeDifference from "../../util/getTimeDifference";

import "./NewsDetails.css";

const NewsDetails = () => {
  const [newsDetails, setNewsDetails] = useState(null);
  const location = useLocation();
  const newsId = location.state?.newsId;

  const onSuccess = (response) => {
    setNewsDetails(response.result[0]);
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/news/${newsId}`,
    onSuccess
  );
  useEffect(() => {
    performFetch({
      credentials: "include",
    });

    return cancelFetch;
  }, []);

  if (isLoading) {
    return <div>....</div>;
  }
  let timeDifference;
  if (newsDetails) {
    const currentTime = new Date();
    const publishingTime = new Date(newsDetails.createdAt);
    timeDifference = getTimeDifference(currentTime, publishingTime);
  }

  return (
    <>
      {error && <div>{error}</div>}

      {newsDetails && (
        <div className="news-details-container">
          {" "}
          <h2>{newsDetails.title}</h2>
          <time>{timeDifference}</time>
          <p>{newsDetails.content}</p>
          <cite>{newsDetails.sources[0]}</cite>
        </div>
      )}
    </>
  );
};

export default NewsDetails;
