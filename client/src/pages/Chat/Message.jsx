import React from "react";
import "./Message.css";
import PropTypes from "prop-types";
import { Buffer } from "buffer";

export const Message = ({ author, message, align, currentUser }) => {
  const messageTimestamp =
    currentUser && currentUser.userName === author.userName
      ? `You at ${new Date(message.date).toLocaleString()}`
      : `${author.firstName} at ${new Date(message.date).toLocaleString()}`;

  return (
    <div className={`message-container ${align}`}>
      <img
        src={
          author.profileImage &&
          `data:image/${author.profileImage.contentType};base64,${Buffer.from(
            author.profileImage.data.data
          ).toString("base64")}`
        }
        alt={author.firstName}
      />
      <div className="message-info">
        <span>
          <em className="message-timestamp">{messageTimestamp}</em>
        </span>
        <span className="message-text">{message.content}</span>
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
