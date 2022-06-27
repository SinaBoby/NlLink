import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

export const CreateActivityModalContext = createContext();

export const CreateActivityModalContextProvider = ({ children }) => {
  const [createActivityModalData, setCreateActivityModalData] = useState(null);
  return (
    <CreateActivityModalContext.Provider
      value={{
        createActivityModalData,
        setCreateActivityModalData,
      }}
    >
      {children}
    </CreateActivityModalContext.Provider>
  );
};

CreateActivityModalContextProvider.propTypes = {
  children: PropTypes.array.isRequired,
};
