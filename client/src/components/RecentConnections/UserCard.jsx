import React from "react";
import "./UserCard.css";
import PropTypes from "prop-types";

const UserCard = ({ user, children, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(user)}>
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
  onClick: PropTypes.func,
};

export default UserCard;
