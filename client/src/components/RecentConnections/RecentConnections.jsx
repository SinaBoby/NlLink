import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../SocketContext";
import useUserDetails from "../../hooks/useUserDetails";
import { logInfo } from "../../../../server/src/util/logging.js";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import "./RecentConnections.css";
import UserCard from "./UserCard";

// eslint-disable-next-line react/prop-types
const RecentConnections = () => {
  const [contacts, setContacts] = useState([]);
  const [contactsIds, setContactsIds] = useState([]);
  const { userDetails, isMeLoading, meError, cancelMeFetch } = useUserDetails();
  const navigate = useNavigate();
  // logInfo(contactsIds);
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    socket.connect();

    userDetails &&
      socket.on("chatHistory", (data) => {
        //logInfo(data);
        data.forEach((chat) => {
          const idArray = chat._id.split(" ").filter((elem) => elem !== "and");
          //logInfo(idArray);
          if (idArray.includes(userDetails._id)) {
            const contact = idArray.filter((id) => id !== userDetails._id);
            logInfo(contact);
            setContactsIds((prevIds) => [...prevIds, ...contact]);
          }
        });
      });
    socket.on("sendContacts", (newContacts) => {
      setContacts(newContacts);
    });
  }, []);

  useEffect(() => {
    contactsIds && socket.emit("contacts", contactsIds);
  }, [contactsIds]);
  useEffect(() => {
    return () => {
      socket.disconnect();
      cancelMeFetch();
    };
  }, []);
  return (
    <div className="recent-connections">
      {isMeLoading && !meError && <Spinner />}
      {meError && <Error>{meError}</Error>}
      <h2 className="recent-connections-title">Connections</h2>
      <div className="recent-connections-list">
        <>
          {contacts &&
            contacts.map((user, index) => {
              return (
                user &&
                userDetails && (
                  <UserCard
                    key={index}
                    user={user}
                    onClick={() => {
                      userDetails._id &&
                        navigate(`/chat/${user._id}`, {
                          state: { receiver: user, userId: userDetails._id },
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
