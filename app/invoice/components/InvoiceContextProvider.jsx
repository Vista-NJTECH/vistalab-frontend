"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export const InvoiceContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const [invoice, setInvoice] = useState({ data: [] });

  async function fetchInvoice() {
    fetch(`${process.env.BACKEND_URL}invoice/getall`, {
      headers: { Authorization: session.user.token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) setInvoice(data);
        else console.error(data.message);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (session) fetchInvoice();
  }, [session]);

  return (
    <StateContext.Provider
      value={{
        invoice,
        setInvoice,
        fetchInvoice,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useInvoiceStateContext = () => useContext(StateContext);
