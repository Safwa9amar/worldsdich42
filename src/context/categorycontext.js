import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { SERVER_URI } from "../helpers/UrlProvider";

export const Categories = createContext();

const CategoryContextProvider = ({ children }) => {
  const CATEGORIES_SERVER_URI = useContext(SERVER_URI);

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
  

  
  return (
    <Categories.Provider value={categories}>{children}</Categories.Provider>
  );
};
export default CategoryContextProvider;
