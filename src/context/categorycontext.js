import React, { createContext, useState, useEffect } from "react";

export const Categories = createContext();


const CategoryContextProvider = (props) => {
  const [categories, setCategories] = useState(
    JSON.parse(sessionStorage.getItem("categories")) || []
  );

  async function getCaegories() {
    const data = await fetch("http://127.0.0.1:5000/api").then((res) =>
      res.json()
    );
    // console.log(data)
    sessionStorage.setItem("categories", JSON.stringify(data));
    setCategories(data);
  }

  useEffect(() => {
    getCaegories();
    // console.log("updated");
  }, []);
  return (
    <Categories.Provider value={categories}>
      {props.children}
    </Categories.Provider>
  );
};
export default CategoryContextProvider;
