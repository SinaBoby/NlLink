import React from "react";
import burak from "../../images/burak.jpg";
import sina from "../../images/sina.jpg";
import "./RecentConnections.css";
import UserCard from "./UserCard";

const recentConnections = [
  {
    name: "Burak Ozman",
    occupation: "Full Stack developer",
    photo: burak,
    interests: ["development", "Soccer"],
  },
  {
    name: "Sina Boby",
    occupation: "Full Stack developer",
    photo: sina,
    interests: ["development", "Tennis"],
  },
];

const RecentConnections = () => {
  return (
    <div className="recent-connections">
      <div className="recent-connections-list">
        <h2 className="recent-connections-title">Recent Connections</h2>
        <>
          {recentConnections.map((user, index) => {
            return <UserCard key={index} user={user} />;
          })}
        </>
      </div>
    </div>
  );
};

export default RecentConnections;
