import React, { createContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [contextdata, setContextData] = useState([]);

  return (
    <MyContext.Provider value={{ contextdata, setContextData }}>
      {children}
    </MyContext.Provider>
  );
};

