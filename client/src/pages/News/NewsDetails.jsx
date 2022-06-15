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
          <div className="news-details-banner">
            <div className="news-details-img-wrapper">
              <img
                src="https://images.unsplash.com/photo-1544056113-76ec529669b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt=""
              />
            </div>
            <div className="news-details-header">
              <h2 className="news-details-title">{newsDetails.title}</h2>
              <span className="news-details-category">
                {newsDetails.category}
              </span>
              <time className="news-details-time">{timeDifference}</time>
            </div>
          </div>

          <p className="news-details-content">{newsDetails.content}</p>
          <cite className="news-details-source">{newsDetails.sources[0]}</cite>
        </div>
      )}
    </>
  );
};

export default NewsDetails;
