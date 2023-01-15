"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export const StudyContextProvider = ({ children }) => {
  const { data: session } = useSession();

  const [refreshData, setRefreshData] = useState(false);

  const [sidebarData, setSidebarData] = useState({ status: false, data: [] });

  async function fetchSidebarData() {
    const headers = session
      ? { cache: "no-store", headers: { Authorization: session.user.token } }
      : { cache: "no-store" };

    fetch(`${process.env.BACKEND_URL}study/getcategory`, headers)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setSidebarData(data);
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchSidebarData();
  }, [session, refreshData]);

  return (
    <StateContext.Provider
      value={{
        sidebarData,
        refreshData,
        setRefreshData,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStudyStateContext = () => useContext(StateContext);
