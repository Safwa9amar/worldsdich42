import React from "react";
import { useLocation } from "react-router-dom";
import HorizentalMenu from "./HorizentalMenu";
import classicImg from "../images/category/classic.png";
import likeIco from "../icons/like.svg";
import ReactStars from "react-rating-stars-component";


const CatergoryItem = () => {
  return (
    <div
      className="
              bg-[#28231B] text-white
                flex items-stretch gap-4
                md:rounded-lg
                md:p-4
                w-fit"
    >
      <div className="bg-[#9E9995] rounded-md flex items-center  ">
        <img className="w-[250px] " src={classicImg} alt="classic" />
      </div>
      <div className=" flex flex-col  items-start gap-4">
        <div className="flex justify-between w-full">
          <p className="text-xl">
            Classique <sup className="text-[#5B6D5B]">( BURGER )</sup>
          </p>
          <img src={likeIco} alt="favorit" />
        </div>

        <p className="text-[#888888] text-lg ">
          Filet d'escalope, lardinette avec sauce gruyère, Crudités, salade
          oignons rouge,fromage cheddar, 2 sauces au choix.
        </p>
        <p className="flex text-xl font-bold">
          <ReactStars value={4} count={5} size={24} activeColor="#ffd700" />
          <sup className="text-[#5B6D5B]">( 20 )</sup>
        </p>
        <div className="flex justify-between w-full">
          <p className="text-[#5B6D5B] font-bold text-xl">€ 6.5</p>
          <div className="flex justify-end items-center ">
            <p>OPTIONS</p>
            <svg
              className="w-[50px] h-[25px]"
              viewBox="0 0 46 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.3875 5.2085L13.4167 8.43766L28.6542 25.0002L13.4167 41.5627L16.3875 44.7918L34.5 25.0002L16.3875 5.2085Z"
                fill="#5B6D5B"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};



export default function Catergory() {
  const Location = useLocation();
  console.log(Location.search);
  return (
    <div className="flex-col md:w-[95vw] md:mx-[2.5vw]">
      <HorizentalMenu />
      <div className="grid lg:grid-cols-3 gap-4 my-10 place-items-center ">
        <CatergoryItem />
        <CatergoryItem />
        <CatergoryItem />
        <CatergoryItem />
        <CatergoryItem />
        <CatergoryItem />
      </div>
    </div>
  );
}
