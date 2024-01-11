import React, { createContext, useState, useEffect, useCallback } from "react";

export const Categories = createContext();

const CategoryContextProvider = ({ children }) => {
  const serverUri =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_SERVER_URI
      : process.env.REACT_APP_DEV_SERVER_URI;

  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("categories")) || []
  );

  const getCategories = useCallback(async () => {
    try {
      const response = await fetch(`${serverUri}/api`);
      const data = await response.json();
      setCategories(data);
      localStorage.setItem("categories", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, [serverUri]);

  useEffect(() => {
    getCategories();

    // Clean up the event listener
    return () => {
      document.removeEventListener("DOMContentLoaded", getCategories);
    };
  }, [getCategories]);

  // Uncomment the following if you want to use the interval
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     getCategories();
  //   }, 1000 * 60 * 10);
  //
  //   // Clear the interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, [getCategories]);

  return (
    <Categories.Provider value={categories}>{children}</Categories.Provider>
  );
};

export default CategoryContextProvider;
