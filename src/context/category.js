import React, { createContext, useState, useEffect } from "react";
import classicImg from "../menu/images/category/classic.png";
import burger from "../menu/icons/burger.svg";
import tacos from "../menu/icons/tacos.svg";




export const Categories = createContext();

const data = [
  {
    id: 1,
    name: "burgers",
    img: classicImg,
    icon: burger,
    list: [
      {
        id: 1,
        name: "classique",
        prix: 6.5,
        img: classicImg,
        Categorie: "tacos",
        categoryID: 1,
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
      {
        id: 3,
        name: "Arabic",
        prix: 7.5,
        img: classicImg,
        Categorie: "Burger",
        categoryID: 1,
        rating: { stars: 2, count: 11 },
        recipes: [
          {
            id: 1,
            recip: "blkazj eazle jazklj eazoej",
            isChecked: true,
          },
          {
            id: 2,
            recip: "test faz eaz eaz eazlme kazlmk",
            isChecked: true,
          },
        ],
      },
      {
        id: 2,
        name: "Turki",
        prix: 10.5,
        img: classicImg,
        Categorie: "Burger",
        categoryID: 1,
        rating: { stars: 5, count: 12 },
        recipes: [
          {
            id: 1,
            recip: "lreoms dola d'escalope",
            isChecked: true,
          },
          {
            id: 2,
            recip: "test for  sauce gruyère",
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
    icon:tacos,
    list: [
      {
        id: 10,
        name: "Turki",
        prix: 8.5,
        img: classicImg,
        Categorie: "tacos",
        categoryID: 2,
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
