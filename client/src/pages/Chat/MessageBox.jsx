/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

import { io } from "socket.io-client";
import useUserDetails from "../../hooks/useUserDetails";
import Button from "../../components/Button";
import { logInfo } from "../../../../server/src/util/logging";
const socket = io("http://localhost:5000", {
  autoConnect: false,
  transports: ["websocket"],
});

const MessageBox = ({ addMessage, receiver, performFetch }) => {
  const [value, setValue] = useState("");
  const { userDetails } = useUserDetails();
  useEffect(() => {
    /*  receiver && logInfo(receiver);
    userDetails && logInfo(userDetails._id); */
  }, []);
  useEffect(() => {
    socket.on("latest", (data) => {
      // expect server to send us the latest messages

      addMessage(data);
    });
    socket.on("message", (msg) => {
      addMessage(msg);
    });
    socket.connect();

    socket.connected === true && logInfo(socket);
  }, []);

  const postMessage = (e) => {
    e.preventDefault();

    if (!value) return;
    if (userDetails && receiver) {
      const message = {
        body: value,
        sender: userDetails._id,
        receiver: receiver._id,
      };
      performFetch({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(message),
        credentials: "include",
      });
      socket.emit("message", message);

      setValue("");
    }
  };

  return (
    <form onSubmit={postMessage}>
      <div className="chat-input-container">
        <input
          type="text"
          id="chat-message"
          name="chat-message"
          placeholder="type here... "
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="chat-input"
        />
        <div className="btn-send-container">
          <Button className="btn-block" type="submit">
            Send
          </Button>
        </div>
      </div>
    </form>
  );
};
export default MessageBox;
