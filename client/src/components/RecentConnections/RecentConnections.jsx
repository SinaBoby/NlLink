import React, { /* useState, */ useEffect } from "react";
/*// import useUserDetails from "../../hooks/useUserDetails";
import useFetch from "../../hooks/useFetch"; */
/* import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error"; */
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
    userType: "Newcomer",
    photo: sina,
    interests: ["development", "Tennis"],
  },
  {
    firstName: "Sina",
    lastName: "Boby",
    userType: "Newcomer",
    photo: sina,
    interests: ["development", "Tennis"],
  },
  {
    firstName: "Sina",
    lastName: "Boby",
    userType: "Newcomer",
    photo: sina,
    interests: ["development", "Tennis"],
  },
  {
    firstName: "Sina",
    lastName: "Boby",
    userType: "Newcomer",
    photo: sina,
    interests: ["development", "Tennis"],
  },
];

const RecentConnections = () => {
  /* const [contacts, setContact] = useState()
  const {userDetails} = useUserDetails()

  const onSuccess = (response) => {
    const { messages } = response;
    logInfo(messages);
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/contacts",
    onSuccess,
  ); */

  useEffect(() => {
    return () => {
      // cancelFetch();
    };
  }, []);

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
