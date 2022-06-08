import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

export const UserDetailsContext = createContext();
export const UserDetailsProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
};

UserDetailsProvider.propTypes = {
  children: PropTypes.array.isRequired,
};
