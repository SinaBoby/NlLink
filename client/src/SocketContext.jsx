import React, { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";

export const SocketContext = createContext();
export const SocketProvider = ({ children }) => {
  // const [messages, setMessages] = useState([]);
  const socketIo = io("http://localhost:5000", {
    autoConnect: false,
    transports: ["websocket"],
    withCredentials: true,
    auth: {
      token: localStorage.getItem("token"),
    },
  });
  const [socket] = useState(socketIo);
  useEffect(() => {
    //socket.connect()
  }, []);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
SocketProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
