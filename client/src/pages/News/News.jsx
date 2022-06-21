import React, { useState, useEffect } from "react";
import "./News.css";
import newsHero from "../../images/news-hero.jpg";
import NewsCard from "../../components/NewsCard";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import Select from "../../components/Forms/Select";
import Error from "../../components/Error/Error";
import Spinner from "../../components/Spinner/Spinner";

const News = () => {
  const [newsData, setNewsData] = useState(null);
  const [newsCategory, setNewsCategory] = useState("all");

  const onSuccess = (response) => {
    setNewsData(response.result);
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/news/category/${newsCategory}`,
    onSuccess
  );
  useEffect(() => {
    performFetch({
      credentials: "include",
    });

    return cancelFetch;
  }, [newsCategory]);

  return (
    <div className="news-container">
      <div className="news-hero-wrapper">
        <img src={newsHero} alt="" />
      </div>
      {isLoading && <Spinner />}
      {error && <Error>Sorry! We can not display the news at the moment</Error>}
      <div className="news-categeory-wrapper">
        <Select
          value={newsCategory}
          title=""
          placeholder="First select the country."
          onChange={(value) => setNewsCategory(value)}
          options={[
            { value: "all", text: "Choose a news category" },
            { value: "refugees", text: "Refugees" },
            { value: "politics", text: "Politics" },
            { value: "finance", text: "Finance" },
            { value: "society", text: "Society" },
          ]}
          required
        />
      </div>

      <div className="news-section-wrapper">
        {newsData && newsData.length === 0 && (
          <div className="no-news-text-wrapper">
            {newsCategory === "all" ? (
              <p>There is no news yet</p>
            ) : (
              <p>There is no news in this category yet</p>
            )}
          </div>
        )}
        {newsData &&
          newsData.map((news, index) => {
            return <NewsCard key={index} news={news} />;
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
