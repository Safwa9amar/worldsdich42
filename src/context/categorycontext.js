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
    JSON.parse(sessionStorage.getItem("categories")) || []
  );

  let getCaegories = useCallback(async () => {
    const data = await fetch(`${CATEGORIES_SERVER_URI}/api`).then((res) =>
      res.json()
    );
    console.log(data);
    sessionStorage.setItem("categories", JSON.stringify(data));
    setCategories(data);
  }, [CATEGORIES_SERVER_URI]);

  useEffect(() => {
    getCaegories();
  }, [getCaegories]);
  return (
    <Categories.Provider value={categories}>{children}</Categories.Provider>
  );
};
export default CategoryContextProvider;
