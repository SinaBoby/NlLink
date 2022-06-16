import React, { useState, useEffect } from "react";
import "./News.css";
import newsHero from "../../images/news-hero.jpg";
import NewsCard from "../../components/NewsCard";
import useFetch from "../../hooks/useFetch";
import Select from "../../components/Forms/Select";

const News = () => {
  const [newsData, setNewsData] = useState(null);
  const [newsCategory, setNewsCategory] = useState("all");

  const onSuccess = (response) => {
    setNewsData(response.result);
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/news/${newsCategory}`,
    onSuccess
  );
  useEffect(() => {
    performFetch({
      credentials: "include",
    });

    return cancelFetch;
  }, [newsCategory]);

  if (isLoading) {
    return <div>is loading</div>;
  }

  return (
    <div className="news-container">
      <div className="news-hero-wrapper">
        <img src={newsHero} alt="" />
      </div>
      {error && <div>Sorry :( We can not display the news at the moment </div>}
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
          <div>
            <p>There is no news in this category yet</p>
          </div>
        )}
        {newsData &&
          newsData.map((news) => {
            return <NewsCard key={news.title} news={news} />;
          })}
      </div>
    </div>
  );
};

export default News;
