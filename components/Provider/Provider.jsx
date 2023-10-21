"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const [avatarUrl, setAvatarUrl] = useState("");

  function updateAvatar() {
    fetch(`${process.env.BACKEND_URL}my/userinfo`, {
      headers: { Authorization: session.user.token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setAvatarUrl(data.userinfo.avatar);
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (session) updateAvatar();
  }, [session]);

  return (
    <StateContext.Provider
      value={{
        avatarUrl,
        setAvatarUrl,
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
