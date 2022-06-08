import React, { useEffect } from "react";
import "./Dashboard.css";
import latestNews from "../../images/latest-news-desktop.jpg";
import yourConnections from "../../images/your-connections-desktop.jpg";
import useUserDetails from "../../hooks/useUserDetails";
import ActivitySlider from "../../components/ActivitySlider/ActivitySlider";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";

const Dashboard = () => {
  const { userDetails, getMe, isMeLoading, meError, cancelMeFetch } =
    useUserDetails();
  useEffect(() => {
    getMe();

    return cancelMeFetch;
  }, []);

  let userType;
  if (userDetails) {
    userType = userDetails.userType;
  }

  // mock activity data
  const activitiesData = [
    {
      id: 1,
      title: "swimming",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, voluptates?",
    },
    {
      id: 2,
      title: "biking",
      description:
        "ipsum dolor sit amet consectetur adipisicing elit. Libero, volupt",
    },
    {
      id: 3,
      title: "walking",
      description: " amet consectetur adipisicing elit. Libero, volupt",
    },
    {
      id: 4,
      title: "skiing",
      description: "lor sit amet consectetur adipisicing elit. Libero, volupt",
    },
  ];

  return (
    <div className="dashboard-container">
      {isMeLoading && !meError && <Spinner />}
      {meError && <Error>{meError}</Error>}
      <div className="user-activity-wrapper">
        <h2 className="user-header">
          Welcome,
          {userDetails && <div>{userDetails.firstName}</div>}
        </h2>

        <div className="upcoming-activities-wrapper activity-wrapper">
          <h3>Upcoming Activities</h3>
          <ActivitySlider activitiesData={activitiesData} />
        </div>
        <div className="your-activities-wrapper activity-wrapper">
          {userType == "Local" && <h3> Your Activities</h3>}
          {userType == "NewComer" && <h3> Recommended Activities</h3>}
          <ActivitySlider activitiesData={activitiesData} />
        </div>
      </div>
      <div className="latest-news-wrapper">
        <div className="latest-news-img-wrapper">
          <img src={latestNews} alt="latest-news" className="latest-news-img" />
        </div>
        <div className="latest-news-details-wrapper">
          <h3 className="latest-news-header">Latest News About Newcomers</h3>
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
