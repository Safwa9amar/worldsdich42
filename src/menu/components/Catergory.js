import React, { useContext } from "react";
import HorizentalMenu from "./HorizentalMenu";
import { CatergoryItem } from "./CatergoryItem";
import { SupplementCard } from "./SupplementCard";
import { useLocation } from "react-router-dom";
import { Categories } from "../../context/categorycontext";
import { Cartstorage } from "../../context/LocalStorageContext";

const filterCategoryItems = (arr, id) => {
  return arr.filter((el) => el.id === id)[0]["list"];
};

export default function Catergory({
  handleAdedTocart,
  isDeletetedFromTocart,
  isAdedTocart,
  handleStorageEdit,
  hybrid_idFroDeletion,
  getCartBoudaries,
  setcheckBoxState,
  setErorPage,
}) {
  const [ShowModel, setShowModel] = React.useState(false);

  const toggleModal = () => {
    setShowModel(!ShowModel);
  };
  //
  const MyStorage = useContext(Cartstorage);

  let { search } = useLocation();
  let categoryId = Math.abs(search.replace(/^\D+/g, ""));
  const categories = React.useContext(Categories);
  //
  const [categoryItems, setcategoryItems] = React.useState([]);
  const [RecipeData, setRecipeData] = React.useState([]);

  const [changedRecipID, setchangedRecipID] = React.useState();

  const reciveOptionclick = (id) => {
    setchangedRecipID(id);
    const data = categoryItems.filter((el) => el.id === id);
    setRecipeData(data[0].recipes);
  };

  //start working on save data to cart
  // 1 , handling changed  options from supliment acrd
  const [OptionChanges, setOptionChanges] = React.useState([]);
  const handleOptionChanges = (parent_id, child_id, checked) => {
    let storage = JSON.parse(localStorage.getItem("optionsData") || "[]");
    let changes = `p_id${parent_id}-ch_id${child_id}`;
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
    let storage = JSON.parse(MyStorage);
    let optionData = OptionChanges.map((el) => {
      let parent = el.split("-")[0].match(/\d+/g).join("");
      let unChecked = el.split("-")[1].match(/\d+/g).join("");
      console.log(el);
      if (Math.abs(parent) === Math.abs(obj.id)) return Math.abs(unChecked);

      return false;
    });
    let changes = {
      id: obj.id,
      isMenu: obj.SelectedBoisson !== null ? obj.isMenu : false,
      SelectedBoisson: obj.SelectedBoisson,
      hybrid_id: `${obj.id}_${categoryId}`,
      category: categoryId,
      amount: 1,
      optionData: optionData
        .filter((el) => el !== undefined && el !== false)
        .sort(),
      suppData: JSON.parse(localStorage.getItem(`foodSupp_${obj.id}`)),
    }; //`id_${obj.id}-isMenu_${obj.isMenu}-options_${optionData}}`;

    storage.push(changes);
    localStorage.removeItem(`foodSupp_${obj.id}`);
    localStorage.removeItem("optionsData");
    setCartData(storage);

    handleStorageEdit(storage);

    handleAdedTocart();
  };

  React.useEffect(() => {
    // if (categoryId === 0) {
    //   let arr = [];
    //   categories.map((el) => {
    //     return arr.push(...el.list);
    //   });
    //   setcategoryItems(arr);
    // } else {
    // }
    try {
      let newData = filterCategoryItems(categories, categoryId);
      setcategoryItems(newData);
    } catch (error) {
      setErorPage(true);
    }
    // localStorage.getItem("suppData") || localStorage.setItem("suppData", "[]");

    // console.log(cartData);
  }, [categories, categoryId, OptionChanges, cartData, isAdedTocart]);

  return (
    <div className="flex-col md:w-[95vw] md:mx-[2.5vw] px-[1vw] h-fit ">
      {/* overflow-y-scroll  md:overflow-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-600 */}
      <HorizentalMenu />
      <SupplementCard
        recipeData={RecipeData}
        el_id={changedRecipID}
        show={ShowModel}
        toggleModal={toggleModal}
        handleOptionChanges={handleOptionChanges}
        categoryId={categoryId}
      />

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-14 md:gap-4 mt-20  my-14 place-items-center ">
        {categoryItems.map((el) => {
          const {
            id,
            name,
            Categorie,
            prix,
            category,
            rating,
            recipes,
            img_url,
            with_menu,
            etat,
          } = el;
          return (
            <CatergoryItem
              key={id}
              id={id}
              img={img_url}
              header={name}
              category={Categorie}
              description={recipes}
              rating={rating}
              price={prix}
              toggleModal={toggleModal}
              reciveOptionclick={reciveOptionclick}
              handleAddToCart={handleAddToCart}
              category_ID={category}
              isDeletetedFromTocart={isDeletetedFromTocart}
              hybrid_idFroDeletion={hybrid_idFroDeletion}
              getCartBoudaries={getCartBoudaries}
              with_menu={with_menu}
              setcheckBoxState={setcheckBoxState}
              etat={etat}
            />
          );
        })}
      </div>
    </div>
  );
}
