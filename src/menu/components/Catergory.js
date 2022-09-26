import React from "react";
import HorizentalMenu from "./HorizentalMenu";
import { CatergoryItem } from "./CatergoryItem";
import { SupplementCard } from "./SupplementCard";
import { useLocation } from "react-router-dom";
import { Categories } from "../../context/category";

const filterCategoryItems = (arr, id) => {
  return arr.filter((el) => el.id === id)[0].list;
};

export default function Catergory({ CheckaddToCart }) {
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


  //recive recip slected data from card of sup then add id to id
  const [changedRecipID, setchangedRecipID] = React.useState();
 

  const [Cart] = React.useState([]);


  const handleAddToCart = (data) => {
    let { id, isMenu } = data;
    console.log(id, isMenu);
  };
 

  const reciveOptionclick = (id) => {
    setchangedRecipID(id);
    const data = categoryItems.filter((el) => el.id === id);
    setRecipeData(data[0].recipes);
  };

  React.useEffect(() => {
    let newData = filterCategoryItems(categories, categoryId);
    //
    setcategoryItems(newData);
    //
    console.log(Cart);
    // console.table(SelectedSuplement);
  }, [categories, categoryId, Cart]);

  return (
    <div className="flex-col md:w-[95vw] md:mx-[2.5vw] px-[1vw] h-screen overflow-y-scroll md:h-fit md:overflow-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-600">
      <HorizentalMenu />
      <SupplementCard
        recipeData={RecipeData}
        el_id={changedRecipID}
        show={ShowModel}
        toggleModal={toggleModal}
        // handleSelectedSuplmnt={handleSelectedSuplmnt}
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
              handleAddToCart={handleAddToCart}
              reciveOptionclick={reciveOptionclick}
            />
          );
        })}
      </div>
    </div>
  );
}
