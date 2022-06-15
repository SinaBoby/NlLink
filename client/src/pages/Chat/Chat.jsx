import React, { useState } from "react";
import "./Chat.css";
import { useLocation } from "react-router-dom";
import Button from "../../components/Button";
import useUserDetails from "../../hooks/useUserDetails";
import RecentConnections from "../../components/RecentConnections/RecentConnections";
import { Message } from "./Message";
import bashar from "../../images/bashar.jpg";
const Chat = () => {
  const [message, setMessage] = useState("");
  const { state } = useLocation();
  const { userDetails } = useUserDetails();
  let receiver;

  if (state !== null) {
    receiver = state.receiver;
  }

  const messages = [
    {
      author: { ...userDetails, photo: bashar },
      message: {
        timestamp: "02-02-2022 19:18:07",
        text: "Hello!",
      },
    },
    {
      author: receiver,
      message: {
        timestamp: "02-02-2022 19:19:07",
        text: "Hello!",
      },
    },
  ];

  return (
    <div className="row-container">
      <div className="chat-page-wrapper">
        <div className="chat-container">
          <p className="chat-title">
            {userDetails?.userName} is now chatting with {receiver?.userName}
          </p>
          <div className="chat-log">
            {messages.map((item, index) => {
              const align =
                userDetails.userName === item.author.userName
                  ? "align-left"
                  : "align-right";

              return (
                <Message
                  key={index}
                  currentUser={userDetails}
                  author={item.author}
                  message={item.message}
                  align={align}
                />
              );
            })}
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              id="chat-message"
              name="chat-message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              className="chat-input"
            />
            <div className="btn-send-container">
              <Button className={"btn-block"}>Send</Button>
            </div>
          </div>
        </div>
        <div className="receiver-info">
          <div className="receiver-img-container">
            <img src={receiver.photo} alt={receiver.firstName} />
          </div>
          <p className="receiver-name">{`${receiver.firstName} ${receiver.lastName}`}</p>
          <div className="btn-section">
            <div className="btn-container">
              <Button className={"btn btn-block"}>Report</Button>
            </div>
            <div className="btn-container">
              <Button className={"btn-block"}>Block</Button>
            </div>
          </div>
        </div>
      </div>
      <RecentConnections />
    </div>
  );
};

export default Chat;
