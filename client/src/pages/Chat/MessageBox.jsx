import React, { useState } from "react";
import { io } from "socket.io-client";

import Button from "../../components/Button";
const socket = io("http://localhost:5000", {
  autoConnect: false,
  transports: ["websocket"],
});

const MessageBox = () => {
  const [value, setValue] = useState("");

  const postMessage = (e) => {
    e.preventDefault();

    if (!value) return;

    socket.emit("message", value);

    setValue("");
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
