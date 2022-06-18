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
/* const socket = io("http://localhost:5000", {
  autoConnect: false,
  transports: ["websocket"],
}); */
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const { state } = useLocation();
  //const receiver = JSON.parse(localStorage.getItem("receiver"));
  const { userDetails } = useUserDetails();
  const [receiver, setReceiver] = useState(state.receiver);
  //let receiver;
  useEffect(() => {
    //logInfo(messages);
    // logInfo(socket);
    //logInfo(userDetails);
  });
  const addMessage = (msg) => {
    setMessages((oldMessages) => [
      ...oldMessages,
      ...(Array.isArray(msg) ? msg.reverse() : [msg]),
    ]);
  };
  /*   useEffect(() => {
    socket.connect();
    socket.on("latest", (data) => {
      // expect server to send us the latest messages
      addMessage(data);
    });
    socket.on("message", (msg) => {
      addMessage(msg);
    });
  }, []);*/
  useEffect(() => {
    setReceiver(state.receiver);
  }, [state.receiver]);
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
  useEffect(() => {
    const receiverId = receiver._id;
    performGetFetch(
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ receiverId }),
      },
      []
    );

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
      cancelGetFetch();
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
                userDetails && userDetails.userName === item.sender.userName
                  ? "align-left"
                  : "align-right";

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
            addMessage={addMessage}
            receiver={receiver}
            performFetch={performFetch}
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
