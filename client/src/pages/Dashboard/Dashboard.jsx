import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import latestNews from "../../images/latest-news-desktop.jpg";
import yourConnections from "../../images/your-connections-desktop.jpg";
import useUserDetails from "../../hooks/useUserDetails";
import ActivitySlider from "../../components/ActivitySlider/ActivitySlider";
import useFetch from "../../hooks/useFetch";
import News from "../../components/News";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";

const Dashboard = () => {
  const [userActivities, setUserActivities] = useState(null);
  const { userDetails, getMe, isMeLoading, meError, cancelMeFetch } =
    useUserDetails();
  useEffect(() => {
    getMe();

    return cancelMeFetch;
  }, []);

  const onSuccess = (response) => {
    setUserActivities(response.result);
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/activities",
    onSuccess
  );
  useEffect(() => {
    performFetch({
      credentials: "include",
    });

    return cancelFetch;
  }, []);

  let userType;
  if (userDetails) {
    userType = "Local";
  }

  return (
    <div className="dashboard-container">
      {isMeLoading && !meError && <Spinner />}
      {meError && <Error>{meError}</Error>}
      <div className="user-activity-wrapper">
        <h2 className="user-header">
          {userDetails && (
            <div>{`Welcome, ${userDetails.firstName} ${userDetails.lastName}`}</div>
          )}
        </h2>

        <div className="upcoming-activities-wrapper activity-wrapper">
          <h3>Upcoming Activities</h3>
          {isLoading && <div>...</div>}
          {error && <div>{error.message}</div>}
          {userActivities && <ActivitySlider activitiesData={userActivities} />}
        </div>
        <div className="your-activities-wrapper activity-wrapper">
          {userType == "Local" && <h3> Your Activities</h3>}
          {userType == "NewComer" && <h3> Recommended Activities</h3>}
          {isLoading && <div>...</div>}
          {error && <div>{error.message}</div>}
          {userActivities && <ActivitySlider activitiesData={userActivities} />}
        </div>
      </div>
      <div className="latest-news-wrapper">
        <div className="latest-news-img-wrapper">
          <img src={latestNews} alt="latest-news" className="latest-news-img" />
        </div>
        <div className="latest-news-details-wrapper">
          <h3 className="latest-news-header">Latest News About Newcomers</h3>
          <News />
        </div>
      </div>
      <div className="connections-status-wrapper">
        <div className="connections-status-img-wrapper">
          <img src={yourConnections} alt="your-connections" />
        </div>
        <div className="connections-status-details-wrapper">
          <h3 className="connections-status-header">Your Connections</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
