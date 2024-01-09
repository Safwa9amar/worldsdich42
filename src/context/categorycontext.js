import React, { createContext, useState, useEffect, useCallback } from "react";

export const Categories = createContext();

const CategoryContextProvider = ({ children }) => {
  const CATEGORIES_SERVER_URI =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_SERVER_URI
      : process.env.REACT_APP_DEV_SERVER_URI;

  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("categories")) || []
  );

  let getCaegories = useCallback(async () => {
    const data = await fetch(`${CATEGORIES_SERVER_URI}/api`).then((res) =>
      res.json()
    );
    setCategories(data);
    localStorage.setItem("categories", JSON.stringify(data));
  }, [CATEGORIES_SERVER_URI]);

  useEffect(() => {
    getCaegories();
  }, [getCaegories]);

  document.addEventListener("DOMContentLoaded", () => {
    getCaegories();
  });
  // 10 minutes interval
  let tenMinutes = 1000 * 60 * 10;
  setInterval(() => {
    getCaegories();
  }, tenMinutes);

  return (
    <Categories.Provider value={categories}>{children}</Categories.Provider>
  );
};
export default CategoryContextProvider;
