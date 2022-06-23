import React, { useEffect, useState } from "react";
import "./ActivityCard.css";
import PropTypes from "prop-types";
import getCategoryImageUrl from "../../util/getCategoryImageUrl";
import JoinSvg from "./icons/JoinSvg";
import useFetch from "../../hooks/useFetch";
// import Spinner from "../Spinner/Spinner";
// import Error from "../Error/Error"; // toastify
import CheckMarkSvg from "./icons/CheckMarkSvg";
// import { logInfo } from "../../../../server/src/util/logging";

const ActivityCard = ({ activity, userId }) => {
  const [isJoined, setIsJoined] = useState(false);

  // const onSuccess = (res) => {
  //   setIsJoined(true);
  // };
  const onSuccess = () => {
    setIsJoined(true);
  };

  const { error, performFetch, cancelFetch } = useFetch(
    `/activities/join/${userId}`,
    onSuccess
  );

  const handleJoin = () => {
    //logInfo(email, password);

    performFetch({
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        activityId: activity._id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  useEffect(() => {
    return cancelFetch;
  }, []);

  return (
    <div className="activity-card-wrapper">
      <div className="activity-card-image-wrapper">
        <img src={getCategoryImageUrl(activity.category)} alt="" />
      </div>
      <div className="activity-card-details"> </div>
      <h4 className="activity-card-content-padding">{activity.title}</h4>
      <span className="activity-card-content-padding">{activity.category}</span>
      <span className="activity-card-content-padding">
        {activity.createdBy}
      </span>
      <time className="activity-card-content-padding">
        {activity.startedAt}
      </time>
      <time className="activity-card-content-padding">{activity.endAt}</time>
      <p className="activity-card-content-padding">{activity.description}</p>
      <span className="activity-card-content-padding">{`Attendees: ${activity.joinedBy.length}/${activity.maxPeople}`}</span>
      <p className="activity-card-content-padding">{activity.location.city}</p>
      <div
        title="Join"
        onClick={() => {
          handleJoin();
        }}
      >
        {isJoined ? <CheckMarkSvg /> : <JoinSvg />}
        {/* */}
      </div>
      <div>{error && <p>Error</p>}</div>

      {/* {isLoading && (
        <div className="activity-card-status-wrapper">
          {isLoading && <Spinner />}
        </div>
      )} */}
    </div>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
};

export default ActivityCard;
