import React, { useState, useEffect } from "react";
import "./Activity.css";
import activityHero from "../../images/activity-hero.jpg";
import Select from "../../components/Forms/Select";
import useFetch from "../../hooks/useFetch";
import ActivityCard from "../../components/ActivityCard/ActivityCard";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import useUserDetails from "../../hooks/useUserDetails";
import { Link } from "react-router-dom";

const Activity = () => {
  const { userDetails } = useUserDetails();
  const [activityCategory, setActivityCategory] = useState("all");
  const [activities, setActivities] = useState(null);

  const onSuccess = (response) => {
    setActivities(response.result);
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/activities/category/${activityCategory}`,
    onSuccess
  );
  useEffect(() => {
    performFetch({
      credentials: "include",
    });

    return cancelFetch;
  }, [activityCategory]);

  return (
    <div className="activity-page-container">
      <div
        className="create-activity-wrapper"
        style={{
          backgroundImage: `url(${activityHero})`,
        }}
      >
        {" "}
        <Link
          to="/activities/create"
          state={{ userId: userDetails._id }}
          className="dashboard-news-card-link"
        >
          Create Activity
        </Link>{" "}
      </div>
      <div className="activity-category-select-wrapper">
        <Select
          value={activityCategory}
          onChange={(value) => setActivityCategory(value)}
          options={[
            { value: "all", text: "Choose a category" },
            { value: "sport", text: "Sport" },
            { value: "language", text: "Language" },
            { value: "city tour", text: "City Tour" },
            { value: "museum", text: "Museum" },
            { value: "food", text: "Food" },
            { value: "training", text: "Training" },
            { value: "music", text: "Music" },
            { value: "volunteer work", text: "Volunteer Work" },
          ]}
        />
      </div>
      <div className="activities-wrapper">
        {isLoading && <Spinner />}
        {error && <Error>{error}</Error>}
        {}
        {activities &&
          userDetails &&
          activities.map((activity) => {
            return (
              <ActivityCard
                key={activity._id}
                activity={activity}
                userId={userDetails._id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Activity;
