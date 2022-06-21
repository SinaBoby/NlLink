/* eslint-disable react/prop-types */
import React from "react";
import "./Message.css";
import PropTypes from "prop-types";
import { Buffer } from "buffer";

export const Message = ({ message, align, currentUser, receiver }) => {
  const messageTimestamp =
    currentUser && currentUser._id === message.sender
      ? `You at ${new Date(message.createdAt).toLocaleString()} to ${
          message.receiver
        }`
      : `${message.sender} at ${new Date(message.createdAt).toLocaleString()}`;

  return (
    <div className={`message-container ${align}`}>
      <img
        src={
          currentUser &&
          currentUser.profileImage &&
          currentUser._id === message.sender
            ? `data:image/${
                currentUser.profileImage.contentType
              };base64,${Buffer.from(
                currentUser.profileImage.data.data
              ).toString("base64")}`
            : receiver && receiver.profileImage
            ? `data:image/${
                receiver.profileImage.contentType
              };base64,${Buffer.from(receiver.profileImage.data.data).toString(
                "base64"
              )}`
            : "https://picsum.photos/200"
        }
        alt={message.sender.firstName}
      />
      <div className="message-info">
        <span>
          <em className="message-timestamp">{messageTimestamp}</em>
        </span>
        <span className="message-text">{message.body}</span>
      </div>
    </div>
  );
};

Message.propTypes = {
  receiver: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  align: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
};
