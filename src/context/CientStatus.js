// client_status

import React, { createContext, useState, useEffect, useCallback } from "react";

export const ClientStatus = createContext();

const ClientStatusContextProvider = ({ children }) => {
  const SERVER_URI =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_SERVER_URI
      : process.env.REACT_APP_DEV_SERVER_URI;
  console.log(process.env.NODE_ENV);
  const [status, setStatus] = useState(
    JSON.parse(localStorage.getItem("client_status")) || []
  );

  let getClientStatus = useCallback(async () => {
    const data = await fetch(`${SERVER_URI}/settings/api/client_status`).then(
      (res) => res.json()
    );
    setStatus(data);
    localStorage.setItem("client_status", JSON.stringify(data));
  }, [SERVER_URI]);

  useEffect(() => {
    getClientStatus();
  }, [getClientStatus]);

  document.addEventListener("DOMContentLoaded", () => {
    getClientStatus();
  });

  return (
    <ClientStatus.Provider value={status}>{children}</ClientStatus.Provider>
  );
};
export default ClientStatusContextProvider;
