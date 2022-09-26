import React from "react";
import HorizentalMenu from "./HorizentalMenu";
import { CatergoryItem } from "./CatergoryItem";
import { SupplementCard } from "./SupplementCard";
import {  useLocation } from "react-router-dom";
import { Categories } from "../../context/category";

const filterCategoryItems = (arr, id) => {
  return arr.filter((el) => el.id === id)[0].list;
};

export default function Catergory({ handleAdedTocart }) {
  const [ShowModel, setShowModel] = React.useState(false);

  const toggleModal = () => {
    setShowModel(!ShowModel);
  };
  //
  let { search } = useLocation();
  let categoryId = Math.abs(search.replace(/^\D+/g, ""));
  const categories = React.useContext(Categories);
  //
  const [categoryItems, setcategoryItems] = React.useState([]);
  const [RecipeData, setRecipeData] = React.useState([]);

  const [changedRecipID, setchangedRecipID] = React.useState();

  const reciveOptionclick = (id) => {
    console.log("element id on option click : ", id);
    setchangedRecipID(id);
    const data = categoryItems.filter((el) => el.id === id);
    setRecipeData(data[0].recipes);
  };

  //start working on save data to cart
  // 1 , handling changed  options from supliment acrd
  const [OptionChanges, setOptionChanges] = React.useState([]);
  const handleOptionChanges = (parent_id, child_id, checked) => {
    let storage = JSON.parse(localStorage.getItem("optionsData") || "[]");
    let changes = `p_id${parent_id}-ch_id${child_id}}`;
    let index = storage.indexOf(changes);
    if (checked) {
      storage.push(changes);
    } else {
      storage.splice(index, 1);
    }

    localStorage.setItem("optionsData", JSON.stringify(storage));
    setOptionChanges(storage);
  };

  //2 , handle add to cart
  const [cartData, setCartData] = React.useState([]);

  const handleAddToCart = (obj) => {
    let storage = JSON.parse(localStorage.getItem("cartData") || "[]");
    let optionData = OptionChanges.map((el) =>  {
      let parent = el.split("-")[0].match(/\d+/g).join("");
      let unChecked = el.split("-")[1].match(/\d+/g).join("");
      console.log(el);
      if (Math.abs(parent) === Math.abs(obj.id)) return Math.abs(unChecked);
      return false
    });
    let changes = {
      id: obj.id,
      isMenu: obj.isMenu,
      optionData: optionData.filter((el) => el !== undefined).sort(),
    }; //`id_${obj.id}-isMenu_${obj.isMenu}-options_${optionData}}`;

    storage.push(changes);

    localStorage.setItem("cartData", JSON.stringify(storage));
    setCartData(storage);
    handleAdedTocart()
  };

  React.useEffect(() => {
    let newData = filterCategoryItems(categories, categoryId);
    setcategoryItems(newData);
    console.log(cartData);
  }, [categories, categoryId, OptionChanges, cartData]);

  return (
    <div className="flex-col md:w-[95vw] md:mx-[2.5vw] px-[1vw] h-screen overflow-y-scroll md:h-fit md:overflow-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-600">
      <HorizentalMenu />
      <SupplementCard
        recipeData={RecipeData}
        el_id={changedRecipID}
        show={ShowModel}
        toggleModal={toggleModal}
        handleOptionChanges={handleOptionChanges}
      />

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4 mt-20  my-14 place-items-center ">
        {categoryItems.map((el) => {
          const { id, name, Categorie, prix, rating, recipes, img } = el;

          return (
            <CatergoryItem
              key={id}
              id={id}
              img={img}
              header={name}
              category={Categorie}
              description={recipes}
              rating={rating}
              price={prix}
              toggleModal={toggleModal}
              reciveOptionclick={reciveOptionclick}
              handleAddToCart={handleAddToCart}
            />
          );
        })}
      </div>
    </div>
  );
}
