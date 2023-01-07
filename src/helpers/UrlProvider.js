import React, { createContext, useState } from "react";

export const SERVER_URI = createContext();

const URLContextProvider = (props) => {
  // const [URI] = useState("http://localhost:5000");
  // const [URI] = useState("https://5000-safwa9amar-worldsdich42-11i4vy8yj58.ws-eu81.gitpod.io");
  // const [URI] = useState("https://myworlddwich.herokuapp.com/");
  const [URI] = useState(process.env.REACT_APP_SERVER_URI || "https://worlds-dwich42.com/dashboard");

  return (
    <SERVER_URI.Provider value={URI}>{props.children}</SERVER_URI.Provider>
  );
};
export default URLContextProvider;
