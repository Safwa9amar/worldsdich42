import { useState, useEffect } from "react";

const useCommandTypes = () => {
  const [commandTypes, setCommandTypes] = useState([]);
  const URI =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_SERVER_URI
      : process.env.REACT_APP_DEV_SERVER_URI;
  useEffect(() => {
    fetch(`${URI}/CommandType`, {
      method: "GET",
      cors: "no-cors",
    })
      .then((res) => res.json())
      .then((data) => {
        setCommandTypes(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return commandTypes;
};

export default useCommandTypes;
