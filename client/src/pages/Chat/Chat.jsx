import React, { useState, useEffect } from "react";
import "./Chat.css";
import { useLocation } from "react-router-dom";
import socketIoClient from "socket.io-client";
import Button from "../../components/Button";
import useUserDetails from "../../hooks/useUserDetails";
import RecentConnections from "../../components/RecentConnections/RecentConnections";
import { Message } from "./Message";
import bashar from "../../images/bashar.jpg";
import { logInfo } from "../../../../server/src/util/logging.js";
import { Buffer } from "buffer";
const socket = socketIoClient("http://localhost:8463", { autoConnect: false });
const Chat = () => {
  const [message, setMessage] = useState("");
  const { state } = useLocation();
  const receiver = JSON.parse(localStorage.getItem("receiver"));
  const { userDetails } = useUserDetails();
  //let receiver;
  useEffect(() => {
    logInfo(state);
    logInfo(socket);
  });

  /*   if (state !== null) {
   // receiver = state.receiver;
   logInfo(state.receiver)
  } */

  const messages = [
    {
      author: { ...userDetails, photo: bashar },
      message: {
        date: "02-02-2022 19:18:07",
        content: "Hello!",
      },
    },
    {
      author: { ...receiver },
      message: {
        date: "02-02-2022 19:19:07",
        content: "Hello!",
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
              logInfo(item);
              const align =
                userDetails && userDetails.userName === item.author.userName
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
            <img
              src={
                receiver &&
                `data:image/${
                  receiver.profileImage.contentType
                };base64,${Buffer.from(
                  receiver.profileImage.data.data
                ).toString("base64")}`
              }
              alt={receiver.firstName}
            />
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
