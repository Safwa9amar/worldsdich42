// generate a delivery address context 
import React, {
    createContext,
    useState,
    useEffect,
    useCallback,
    useContext,
  } from "react";
  import { SERVER_URI } from "../helpers/UrlProvider";
  
  export const Address = createContext();
  
  const AddressContextProvider = ({ children }) => {
    const Address_SERVER_URI = useContext(SERVER_URI);
  
    const [Address, setAddress] = useState(
      JSON.parse(localStorage.getItem("Address")) || []
    );
  
    let getCaegories = useCallback(async () => {
      const data = await fetch(`${Address_SERVER_URI}/settings/api/livraison_adresses`).then((res) =>
        res.json()
      );
      console.log(data);
      setAddress(data);
      localStorage.setItem("Address", JSON.stringify(data));
    }, [Address_SERVER_URI]);
  
    useEffect(() => {
      getCaegories();
    }, [getCaegories]);
  
    document.addEventListener("DOMContentLoaded", () => {
      getCaegories();
    });
  
    
    return (
      <Address.Provider value={Address}>{children}</Address.Provider>
    );
  };
  export default AddressContextProvider;
  