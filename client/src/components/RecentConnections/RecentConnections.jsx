import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../SocketContext";
//import useUserDetails from "../../hooks/useUserDetails";
//import { logInfo } from "../../../../server/src/util/logging.js";
//import useFetch from "../../hooks/useFetch";
//import Spinner from "../../components/Spinner/Spinner";
//import Error from "../../components/Error/Error";
import "./RecentConnections.css";
import UserCard from "./UserCard";

// eslint-disable-next-line react/prop-types
const RecentConnections = ({ userId }) => {
  const [contacts, setContacts] = useState([]);
  const [contactsIds, setContactsIds] = useState([]);
  //const { userDetails, isMeLoading, meError, cancelMeFetch } = useUserDetails();
  const [messagesFull, setMessagesFull] = useState([]);
  const navigate = useNavigate();
  // logInfo(contactsIds);
  const { socket } = useContext(SocketContext);
  const addMessage = (msg) => {
    setMessagesFull((oldMessages) => [
      ...oldMessages,
      ...(Array.isArray(msg) ? msg.reverse() : [msg]),
    ]);
  };
  useEffect(() => {
    socket.connect();

    socket.on("chatHistory", (data) => {
      //logInfo(data);
      data.forEach((chat) => {
        const idArray = chat._id.split(" ").filter((elem) => elem !== "and");
        //logInfo(idArray);
        if (idArray.includes(userId)) {
          addMessage(chat.messages);
        }
      });
    });
    socket.on("sendContacts", (contacts) => setContacts(contacts));
    return () => {
      socket.disconnect();
      //cancelMeFetch();
      //cancelFetch();
    };
  }, []);
  useEffect(() => {
    const idArray = [];
    messagesFull.forEach((msg) => {
      if (msg.sender === userId && !idArray.includes(msg.receiver)) {
        idArray.push(msg.receiver);
      } else if (msg.receiver === userId && !idArray.includes(msg.sender)) {
        idArray.push(msg.sender);
      }
    });
    idArray &&
      idArray.forEach((id) => {
        if (id !== userId) {
          //logInfo(id);
          if (!contactsIds.includes(id)) {
            //logInfo(id);
            setContactsIds((prevIds) => [...prevIds, id]);
          }
        }
      });
  }, [messagesFull]);

  /*  const onSuccess = (response) => {
    setContacts(response.contacts);
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/contacts",
    onSuccess
  ); */
  useEffect(() => {
    /* contactsIds &&
      performFetch({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ contactsIds }),
      }); */
    contactsIds && socket.emit("contacts", contactsIds);
    //return cancelFetch;
  }, [contactsIds]);

  return (
    <div className="recent-connections">
      {/* {isMeLoading && !meError && <Spinner />}
      {meError && <Error>{meError}</Error>} */}
      {/* {isLoading && !error && <Spinner />}
      {error && <Error>{error}</Error>} */}
      <h2 className="recent-connections-title">Connections</h2>
      <div className="recent-connections-list">
        <>
          {contacts &&
            contacts.map((user, index) => {
              return (
                user && (
                  <UserCard
                    key={index}
                    user={user}
                    onClick={() => {
                      //localStorage.setItem("receiver", JSON.stringify(user));
                      //socket.emit("refresh", "messagesList")
                      navigate(`/chat/${user._id}`, {
                        state: { receiver: user, userId: userId },
                      });
                    }}
                  />
                )
              );
            })}
        </>
      </div>
    </div>
  );
};

export default RecentConnections;
