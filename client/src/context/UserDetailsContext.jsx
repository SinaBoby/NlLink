import React, { useState, createContext } from "react";
import useFetch from "../hooks/useFetch";
import PropTypes from "prop-types";

export const UserDetailsContext = createContext();
export const UserDetailsProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  const onSuccess = (res) => {
    const { user } = res;
    setUserDetails(user);
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/me",
    onSuccess
  );

  const getMe = () => {
    performFetch({
      method: "GET",
      credentials: "include",
    });
  };

  return (
    <UserDetailsContext.Provider
      value={{
        userDetails,
        getMe,
        isMeLoading: isLoading,
        meError: error,
        cancelMeFetch: cancelFetch,
      }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};
UserDetailsProvider.propTypes = {
  children: PropTypes.array.isRequired,
};
