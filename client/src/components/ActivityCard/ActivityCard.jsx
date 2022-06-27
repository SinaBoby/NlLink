import React, { useEffect, useState } from "react";
import "./ActivityCard.css";
import PropTypes from "prop-types";
import getCategoryImageUrl from "../../util/getCategoryImageUrl";
import JoinSvg from "./icons/JoinSvg";
import useFetch from "../../hooks/useFetch";
// import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error"; // toastify
import CheckMarkSvg from "./icons/CheckMarkSvg";
// import { logInfo } from "../../../../server/src/util/logging";

const ActivityCard = ({ activity, userId }) => {
  const [userIsJoining, setUserIsJoining] = useState(null);

  const onSuccess = (response) => {
    if (response) {
      setUserIsJoining(response.userIsJoining);
    }
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

  const onGetUserActivitiesSuccess = (response) => {
    setUserIsJoining(response.getUserActivitiesList.includes(activity._id));
  };
  const {
    // isLoading: isUserActivitiesLoading,
    // error: userActivitiesError,
    performFetch: performActivitiesFetch,
    cancelFetch: cancelActivitiesFetch,
  } = useFetch(
    `/activities/user-activities-list/${userId}`,
    onGetUserActivitiesSuccess
  );

  useEffect(() => {
    performActivitiesFetch({
      credentials: "include",
    });

    return cancelActivitiesFetch;
  }, [userIsJoining]);

  const startDate = new Date(activity.startAt).toLocaleString("nl-NL");
  const endDate = new Date(activity.endAt).toLocaleString("nl-NL");

  return (
    <div className="activity-card-wrapper">
      <div className="activity-card-image-wrapper">
        <img src={getCategoryImageUrl(activity.category)} alt="" />
      </div>
      <div className="activity-card-details"> </div>
      <h4 className="activity-card-content-padding">{activity.title}</h4>
      <span className="activity-card-content-padding">{activity.category}</span>
      {/* <span className="activity-card-content-padding">
        {activity.createdBy}
      </span> */}

      <time className="activity-card-content-padding">
        Start at: {startDate}
      </time>
      <time className="activity-card-content-padding">End at: {endDate}</time>
      <p className="activity-card-content-padding">{activity.description}</p>
      <span className="activity-card-content-padding">{`Attendees: ${activity.joinedBy.length}/${activity.maxPeople}`}</span>
      <p className="activity-card-content-padding">{activity.location.city}</p>
      <div
        title="Join"
        onClick={() => {
          handleJoin();
        }}
      >
        {
          <div>
            {userIsJoining ? (
              <div className="join-icon-wrapper">
                {" "}
                <span> Cancel Activity</span>
                <CheckMarkSvg />
              </div>
            ) : (
              <div className="join-icon-wrapper">
                <span>Join Activity</span>
                <JoinSvg />
              </div>
            )}
          </div>
        }
      </div>
      <div>{error && <Error>{error}</Error>}</div>
    </div>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
};

export default ActivityCard;
