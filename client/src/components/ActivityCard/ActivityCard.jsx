import React from "react";
import "./ActivityCard.css";
import PropTypes from "prop-types";
import getCategoryImageUrl from "../../util/getCategoryImageUrl";
import JoinSvg from "./icons/JoinSvg";

const ActivityCard = ({ activity }) => {
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
      <div title="Join">
        <JoinSvg />
      </div>
    </div>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.object.isRequired,
};

export default ActivityCard;
