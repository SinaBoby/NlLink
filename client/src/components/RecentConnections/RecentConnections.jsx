import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../SocketContext";
import useUserDetails from "../../hooks/useUserDetails";
import { logInfo } from "../../../../server/src/util/logging.js";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import "./RecentConnections.css";
import UserCard from "./UserCard";
import { ThemeContext } from "../../ThemeContext";

// eslint-disable-next-line react/prop-types
const RecentConnections = () => {
  const [contacts, setContacts] = useState([]);
  const [contactsIds, setContactsIds] = useState([]);
  const { userDetails, isMeLoading, meError, cancelMeFetch } = useUserDetails();
  const navigate = useNavigate();
  const { theme, isDarkMode } = useContext(ThemeContext);
  // logInfo(contactsIds);
  const { socket } = useContext(SocketContext);
  function provideContactsIds(data, userId, cb) {
    let contactsIdsArray = [];
    data.forEach((chat) => {
      const idArray = chat._id.split(" ").filter((elem) => elem !== "and");
      if (idArray.includes(userId)) {
        const contact = idArray.filter((id) => id !== userId);
        logInfo(contact);
        contactsIdsArray.push(contact[0]);
      }
    });
    cb(contactsIdsArray);
  }
  useEffect(() => {
    socket.connect();

    userDetails &&
      socket.on("chatHistory", (data) => {
        provideContactsIds(data, userDetails._id, (providedIds) =>
          setContactsIds(providedIds)
        );
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
    <div
      className="recent-connections"
      style={{
        boxShadow: !isDarkMode
          ? "5px -7px 12px rgba(0, 0, 0, 0.2)"
          : "5px -7px 12px -1px var(--light-background)",
      }}
    >
      {isMeLoading && !meError && <Spinner />}
      {meError && <Error>{meError}</Error>}
      <h2
        className="recent-connections-title"
        style={{ borderBottom: `1px solid ${theme.foreground}` }}
      >
        Connections
      </h2>
      <div className="recent-connections-list scroll-narrow">
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
