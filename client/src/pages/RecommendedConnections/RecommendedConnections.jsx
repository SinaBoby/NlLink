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
import useFetch from "./../../hooks/useFetch";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
//import { logInfo } from "./../../../../server/src/util/logging";

const mockProfileImages = [profile1, profile2, profile3, bashar, burak, sina];

const RecommendedConnections = () => {
  const { state } = useLocation();
  const [users, setUsers] = useState([]);

  const onSuccess = (res) => {
    const { users } = res;
    setUsers(users);
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/find_matches",
    onSuccess
  );

  useEffect(() => {
    if (state !== null) {
      const interests = state.selectedInterests;
      const province = state.province;

      performFetch({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          interests,
          province,
        }),
      });

      return cancelFetch;
    }
  }, []);

  return (
    <div className="recommended-connections">
      {error && <Error>{error}</Error>}
      {!error && isLoading && <Spinner />}
      {users.map((user, index) => {
        const photoIndex = Math.floor(Math.random() * mockProfileImages.length);
        user.photo = mockProfileImages[photoIndex];

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
