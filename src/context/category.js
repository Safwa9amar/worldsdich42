import React, { createContext, useState, useEffect } from "react";
import classicImg from "../menu/images/category/classic.png";

export const Categories = createContext();

const data = [
  {
    id: 1,
    name: "burger",
    img: classicImg,
    list: [
      {
        id: 1,
        name: "classique",
        prix: 6.5,
        img: classicImg,
        Categorie: "tacos",
        rating: { stars: 4, count: 20 },
        recipes: [
          {
            id: 1,
            recip: "Filet d'escalope",
            isChecked: true,
          },
          {
            id: 2,
            recip: "lardinette avec sauce gruyère",
            isChecked: true,
          },
          {
            id: 3,
            recip: " Crudités",
            isChecked: true,
          },
          {
            id: 4,
            recip: "salade oignons rouge",
            isChecked: true,
          },
          {
            id: 5,
            recip: "fromage cheddar",
            isChecked: true,
          },
          {
            id: 6,
            recip: " 2 sauces au choix.",
            isChecked: true,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "tacos",
    img: classicImg,
    list: [
      {
        id: 1,
        name: "Turki",
        prix: 8.5,
        img: classicImg,
        Categorie: "tacos",
        rating: { stars: 3, count: 113 },
        recipes: [
          {
            id: 1,
            recip: "Filet d'escalope",
            isChecked: true,
          },
          {
            id: 2,
            recip: "lardinette avec sauce gruyère",
            isChecked: true,
          },
          {
            id: 3,
            recip: " Crudités",
            isChecked: true,
          },
          {
            id: 4,
            recip: "salade oignons rouge",
            isChecked: true,
          },
          {
            id: 5,
            recip: "fromage cheddar",
            isChecked: true,
          },
          {
            id: 6,
            recip: " 2 sauces au choix.",
            isChecked: true,
          },
        ],
      },
    ],
  },
];

const CategoryContextProvider = (props) => {
  const [categories, setCategories] = useState(data);
    useEffect(() => {
      // getNotioPage();
      setCategories(data)
    }, []);

  //   async function getNotioPage() {
  //     const data = await fetch("./data.json").then((res) => console.log(res));
  //     setCategories(data);
  //   }
  return (
    <Categories.Provider value={categories}>
      {props.children}
    </Categories.Provider>
  );
};
export default CategoryContextProvider;
