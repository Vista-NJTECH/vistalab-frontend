"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [testData, setTestData] = useState(null);

  useEffect(() => {
    setTestData("Hello");
  }, []);

  return (
    <StateContext.Provider
      value={{
        testData,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
export const NextauthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
