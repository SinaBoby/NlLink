import React from "react";
import "./UserCard.css";
import PropTypes from "prop-types";

const UserCard = ({ user, children }) => {
  return (
    <div className="card">
      <div className="card-img-container">
        <img src={user.photo} />
      </div>
      <div className="card-info">
        <h3 className="card-title">{`${user.firstName} ${user.lastName} (${user.userType} volunteer)`}</h3>
        <h5 className="card-subtitle">{user.province}</h5>
        {children}
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  children: PropTypes.element,
};

export default UserCard;
