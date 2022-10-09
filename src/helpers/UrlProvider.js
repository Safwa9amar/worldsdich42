import React, { createContext, useState } from "react";

export const SERVER_URI = createContext();

const URLContextProvider = (props) => {
  // const [URI] = useState("http://localhost:5000/");
  const [URI] = useState("https://c497-41-107-39-29.eu.ngrok.io ");

  return (
    <SERVER_URI.Provider value={URI}>{props.children}</SERVER_URI.Provider>
  );
};
export default URLContextProvider;
