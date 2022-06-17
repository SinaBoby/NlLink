import React from "react";
import "./Message.css";
import PropTypes from "prop-types";

export const Message = ({ author, message, align, currentUser }) => {
  const messageTimestamp =
    currentUser.userName === author.userName
      ? `You at ${message.timestamp}`
      : `${author.firstName} at ${message.timestamp}`;

  return (
    <div className={`message-container ${align}`}>
      <img src={author.photo} alt={author.firstName} />
      <div className="message-info">
        <em className="message-timestamp">{messageTimestamp}</em>
        <p className="message-text">{message.text}</p>
      </div>
    </div>
  );
};

Message.propTypes = {
  author: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  align: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
};
