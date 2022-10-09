import React, { createContext, useState, useEffect, useContext } from "react";

import { SERVER_URI } from "../helpers/UrlProvider";

export const Categories = createContext();

const CategoryContextProvider = (props) => {
  const API_SERVER_URI = useContext(SERVER_URI);
  const [categories, setCategories] = useState(
    JSON.parse(sessionStorage.getItem("categories")) || []
  );

  async function getCaegories() {
    const data = await fetch(`${API_SERVER_URI}/api`).then((res) => res.json());
    console.log(data);
    sessionStorage.setItem("categories", JSON.stringify(data));
    setCategories(data);
  }

  useEffect(() => {
    getCaegories();
  });
  return (
    <Categories.Provider value={categories}>
      {props.children}
    </Categories.Provider>
  );
};
export default CategoryContextProvider;
