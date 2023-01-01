// client_status

import React, {
    createContext,
    useState,
    useEffect,
    useCallback,
    useContext,
  } from "react";
  import { SERVER_URI } from "../helpers/UrlProvider";
  
  export const ClientStatus = createContext();
  
  const ClientStatusContextProvider = ({ children }) => {
    const ClientStatus_SERVER_URI = useContext(SERVER_URI);
  
    const [status, setStatus] = useState(
      JSON.parse(localStorage.getItem("client_status")) || []
    );
  
    let getClientStatus = useCallback(async () => {
      const data = await fetch(`${ClientStatus_SERVER_URI}/settings/api/client_status`).then((res) =>
        res.json()
      );
      setStatus(data);
      localStorage.setItem("client_status", JSON.stringify(data));
    }, [ClientStatus_SERVER_URI]);
  
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
  