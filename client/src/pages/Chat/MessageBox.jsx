/* eslint-disable react/prop-types */
import React, { useState } from "react";

import useUserDetails from "../../hooks/useUserDetails";
import Button from "../../components/Button";

const MessageBox = ({ receiver, performFetch, socket }) => {
  const [value, setValue] = useState("");
  const { userDetails } = useUserDetails();

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
        body: JSON.stringify({ message }),
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
