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
    query: {
      token: localStorage.getItem("token"),
    },
  });
  useEffect(() => {
    /*   socket.connect();

    

  return () => socket.disconnect(); */
  }, []);
  const [socket] = useState(socketIo);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
SocketProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
