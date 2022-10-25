import React, { createContext, useState } from "react";

export const SERVER_URI = createContext();

const URLContextProvider = (props) => {
  // const [URI] = useState("http://localhost:5000/");
  const [URI] = useState("https://myworlddwich.herokuapp.com/");

  return (
    <SERVER_URI.Provider value={URI}>{props.children}</SERVER_URI.Provider>
  );
};
export default URLContextProvider;
