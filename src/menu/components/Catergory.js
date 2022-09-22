import React from "react";
import HorizentalMenu from "./HorizentalMenu";
import { CatergoryItem } from "./CatergoryItem";
import classicImg from "../images/category/classic.png";
import burger from "../images/burger.png";
import { SupplementCard } from "./SupplementCard";


export default function Catergory() {
  const [ShowModel, setShowModel] = React.useState(false);
  const toggleModal=()=>{
    setShowModel(!ShowModel);
  }
  return (
    <div className="flex-col md:w-[95vw] md:mx-[2.5vw] h-screen overflow-y-scroll ">
      <HorizentalMenu />
      <SupplementCard id={10} show={ShowModel} toggleModal={toggleModal} />

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4 mt-20  my-14 place-items-center ">
        <CatergoryItem
          img={classicImg}
          header="Classic"
          category="Burger"
          description="Filet d'escalope, lardinette
            oignons rouge,fromage cheddar, 2 sauces au choix."
          rating={{ stars: 4, count: 20 }}
          price={6.5}
          toggleModal={toggleModal}
        />
        <CatergoryItem
          img={burger}
          header="Turki"
          category="Burger"
          description="Filet d'escce gruyère, Crudités, salade
            oignons rouge,fromage cheddar, 2 sauces au choix."
          rating={{ stars: 4, count: 20 }}
          price={6.5}
          toggleModal={toggleModal}
        />
        <CatergoryItem
          img={burger}
          header="Turki"
          category="Burger"
          description="Filet d'escalope,
            oignons rouge,fromage cheddar, 2 sauces au choix."
          rating={{ stars: 4, count: 20 }}
          price={6.5}
          toggleModal={toggleModal}
        />
        <CatergoryItem
          img={classicImg}
          header="Turki"
          category="Burger"
          description="Filet d'escalope, lardinette avde
            oignons rouge,fromage cheddar, 2 sauces au choix."
          rating={{ stars: 4, count: 20 }}
          price={6.5}
          toggleModal={toggleModal}
        />
        <CatergoryItem
          img={burger}
          header="Turki"
          category="Burger"
          description="Filet d'escalope, lardinette avec sauce gruyère, Cpe, lardinette avec sauce gruyère, Cpe, lardinette avec sauce gruyère, Crudités, salade
            oignons rouge,fromage cheddar, 2 sauces au choix."
          rating={{ stars: 4, count: 20 }}
          price={6.5}
          toggleModal={toggleModal}
        />
        <CatergoryItem
          img={classicImg}
          header="Turki"
          category="Burger"
          description="Filet d'escalope, lardinette avec sauce gruyère, Crudités, salade
            oignons rouge,fromage cheddar, 2 sauces au choix."
          rating={{ stars: 4, count: 20 }}
          price={6.5}
          toggleModal={toggleModal}
        />
        <CatergoryItem
          img={burger}
          header="Turki"
          category="Burger"
          description="Filet d'escalope, lardinette avec sauce gruyère, Crudités, salade
            oignons rouge,fromage cheddar, 2 sauces au choix."
          rating={{ stars: 4, count: 20 }}
          price={6.5}
          toggleModal={toggleModal}
        />
        <CatergoryItem
          img={burger}
          header="Turki"
          category="Burger"
          description="Filet d'escalope, lardinette avec sauce gruyère, Crudités, salade
            oignons rouge,fromage cheddar, 2 sauces au choix."
          rating={{ stars: 4, count: 20 }}
          price={6.5}
          toggleModal={toggleModal}
        />
        <CatergoryItem
          img={burger}
          header="Turki"
          category="Burger"
          description="Filet d'escalope, lardinette avec sauce gruyère, Crudités, salade
            oignons rouge,fromage cheddar, 2 sauces au choix."
          rating={{ stars: 4, count: 20 }}
          price={6.5}
          toggleModal={toggleModal}
        />
        <CatergoryItem
          img={burger}
          header="Turki"
          category="Burger"
          description="Filet d'escalope, lardinette avec sauce gruyère, Crudités, salade
            oignons rouge,fromage cheddar, 2 sauces au choix."
          rating={{ stars: 4, count: 20 }}
          price={6.5}
          toggleModal={toggleModal}
        />
      </div>
    </div>
  );
}
