import React, { useState, createContext } from "react";
import PropTypes from "prop-types";
import { getCookie } from "./util/getCookie";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const logout = (cb) => {
    document.cookie =
      "userStatus=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsAuthenticated(isUserAuthenticated());
    localStorage.removeItem("user");
    cb();
  };

  const login = (user, cb) => {
    localStorage.setItem("user", JSON.stringify(user));

    /*
      Token expires in 1 hour. We create a cookie and set the expiration date
      1 hour from now
    */

    const now = new Date();

    now.setTime(now.getTime() + 60 * 60 * 1000);
    const expirationDate = `expires=${now.toUTCString()}`;
    document.cookie = `userStatus=authenticated;${expirationDate};path=/`;
    setIsAuthenticated(isUserAuthenticated());
    cb();
  };

  const isUserAuthenticated = () => {
    const userStatus = getCookie("userStatus");

    return userStatus !== "";
  };

  const [isAuthenticated, setIsAuthenticated] = useState(isUserAuthenticated());
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
