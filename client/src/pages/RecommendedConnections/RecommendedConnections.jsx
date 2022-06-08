import React, { useEffect, useState } from "react";
import "./RecommendedConnections.css";
import profile1 from "../../images/profile-1.jpg";
import profile2 from "../../images/profile-2.jpg";
import profile3 from "../../images/profile-3.jpg";
import bashar from "../../images/bashar.jpg";
import burak from "../../images/burak.jpg";
import sina from "../../images/sina.jpg";
import { useLocation } from "react-router-dom";
import UserCard from "../../components/RecentConnections/UserCard";
import Tags from "./Tags";
import Button from "./../../components/Button";

const mockUsers = [
  {
    name: "Bashar Khdr",
    occupation: "Full Stack developer",
    photo: profile1,
    interests: ["development", "Skiing", "Tv Shows"],
  },
  {
    name: "Burak Ozman",
    occupation: "Full Stack developer",
    photo: profile2,
    interests: ["reading", "Soccer", "Tennis"],
  },
  {
    name: "Samira",
    occupation: "Full Stack developer",
    photo: profile3,
    interests: ["bar attending", "Soccer"],
  },
  {
    name: "Burak Ozman",
    occupation: "Full Stack developer",
    photo: burak,
    userType: "Local",
    interests: ["development", "Dutch"],
  },
  {
    name: "Sina Boby",
    occupation: "Full Stack developer",
    photo: sina,
    userType: "Local",
    interests: ["Soccer", "Dutch"],
  },
  {
    name: "Bashar",
    occupation: "Full Stack developer",
    photo: bashar,
    interests: ["Soccer"],
  },
];

const RecommendedConnections = () => {
  const { state } = useLocation();

  const [users, setUsers] = useState(mockUsers);

  useEffect(() => {
    if (state !== null) {
      const interests = state.selectedInterests;
      setUsers((prev) => {
        const filteredUsers = interests.map((item) => {
          return prev.filter((user) => user.interests.includes(item));
        });

        return filteredUsers.reduce((acc, val) => {
          return [...acc, ...val.filter((user) => !acc.includes(user))];
        }, filteredUsers[0]);
      });
    }
  }, []);

  return (
    <div className="recommended-connections">
      {users.map((user, index) => {
        return (
          <div className="card-wrapper" key={index}>
            <UserCard user={user}>
              <Tags tags={user.interests} />
            </UserCard>
            <div className="btn-wrapper">
              <Button className={"btn-inline"}>Start a conversation</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecommendedConnections;
