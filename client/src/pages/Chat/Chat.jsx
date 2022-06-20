import React, { useState, useEffect } from "react";
import "./Chat.css";
import { useLocation } from "react-router-dom";
//import { io } from "socket.io-client";
import Button from "../../components/Button";
import useUserDetails from "../../hooks/useUserDetails";
import RecentConnections from "../../components/RecentConnections/RecentConnections";
import { Message } from "./Message";
import useFetch from "../../hooks/useFetch";
import { logInfo } from "../../../../server/src/util/logging.js";
import { Buffer } from "buffer";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import MessageBox from "./MessageBox";
//import { SocketContext } from "../../SocketContext";
import { io } from "socket.io-client";
const Chat = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    //console.log(messages)
  });
  const { state } = useLocation();
  const receiver = state.receiver;
  const { userDetails } = useUserDetails();

  const socket = io("http://localhost:5000", {
    autoConnect: false,
    transports: ["websocket"],
    withCredentials: true,
    query: {
      token: localStorage.getItem("token"),
    },
  });

  useEffect(() => {
    socket.connect();

    socket.on("chatHistory", (data) => {
      // expect server to send us the latest messages

      //console.log(newMessage,"neww")

      logInfo(data);

      //addMessage(data);
    });

    socket.on("message", (msg) => {
      addMessage(msg);
      //io.emit("message", msg)
    });

    return () => socket.disconnect();
  }, []);

  //const {socket }= useContext(SocketContext)
  const onGetSuccess = (response) => {
    const { message, receiverObj } = response;

    logInfo(message);
    logInfo(receiverObj);
  };

  const {
    isLoading: isGetLoading,
    error: getError,
    performFetch: performGetFetch,
    cancelFetch: cancelGetFetch,
  } = useFetch("/messages", onGetSuccess);

  const addMessage = (msg) => {
    setMessages((oldMessages) => [
      ...oldMessages,
      ...(Array.isArray(msg) ? msg.reverse() : [msg]),
    ]);
  };

  useEffect(() => {
    const receiverId = receiver._id;
    performGetFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ receiverId }),
    });

    return cancelGetFetch;
  }, []);

  const onSuccess = (response) => {
    const { messages } = response;
    logInfo(messages);
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/messages/post",
    onSuccess
  );

  useEffect(() => {
    return () => {
      cancelFetch();
    };
  }, []);

  return (
    <div className="row-container">
      <div className="chat-page-wrapper">
        <div className="chat-container" id="msgBox">
          <p className="chat-title">
            {userDetails?.userName} is now chatting with {receiver?.userName}
          </p>
          <div className="chat-log">
            {isLoading && !error && <Spinner />}
            {error && <Error>{error}</Error>}
            {isGetLoading && !getError && <Spinner />}
            {getError && <Error>{getError}</Error>}
            {messages.map((item, index) => {
              //logInfo(item);
              const align =
                userDetails && userDetails._id === item.sender
                  ? "align-right"
                  : "align-left";

              return (
                <Message
                  key={index}
                  currentUser={userDetails}
                  receiver={receiver}
                  message={item}
                  align={align}
                />
              );
            })}
          </div>
          <MessageBox
            socket={socket}
            receiver={receiver}
            performFetch={performFetch}
            addMessage={addMessage}
          />
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
