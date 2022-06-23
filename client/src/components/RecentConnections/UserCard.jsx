import React from "react";
import "./UserCard.css";
import PropTypes from "prop-types";
import { Buffer } from "buffer";

const UserCard = ({ user, children, onClick }) => {
  return (
    <div
      className="card"
      onClick={() => onClick(user)}
      style={{ cursor: "pointer" }}
    >
      <div className="card-img-container">
        <img
          src={
            user.profileImage
              ? `data:image/${
                  user.profileImage.contentType
                };base64,${Buffer.from(user.profileImage.data.data).toString(
                  "base64"
                )}`
              : "https://picsum.photos/200"
          }
        />
      </div>
      <div className="card-info">
        <h3 className="card-title">{`${user.firstName} ${user.lastName} (${user.userType})`}</h3>
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
