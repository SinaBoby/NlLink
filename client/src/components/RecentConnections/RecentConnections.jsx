import React from "react";
import burak from "../../images/burak.jpg";
import sina from "../../images/sina.jpg";
import "./RecentConnections.css";
import UserCard from "./UserCard";

const recentConnections = [
  {
    firstName: "Burak",
    lastName: "Ozman",
    userType: "Local",
    photo: burak,
    interests: ["development", "Soccer"],
  },
  {
    firstName: "Sina",
    lastName: "Boby",
    occupation: "Newcomer",
    photo: sina,
    interests: ["development", "Tennis"],
  },
  {
    firstName: "Sina",
    lastName: "Boby",
    occupation: "Newcomer",
    photo: sina,
    interests: ["development", "Tennis"],
  },
  {
    firstName: "Sina",
    lastName: "Boby",
    occupation: "Newcomer",
    photo: sina,
    interests: ["development", "Tennis"],
  },
  {
    firstName: "Sina",
    lastName: "Boby",
    occupation: "Newcomer",
    photo: sina,
    interests: ["development", "Tennis"],
  },
];

const RecentConnections = () => {
  return (
    <div className="recent-connections">
      <h2 className="recent-connections-title">Recent Connections</h2>
      <div className="recent-connections-list">
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
