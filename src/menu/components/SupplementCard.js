import React from "react";
import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";
import Carousel from "react-multi-carousel";
import imgTest from "../../asstes/supplement/cheddar.png";

const data = [
  {
    id: 1,
    img: imgTest,
    Name: "Cheddar",
  },
  {
    id: 2,
    img: imgTest,
    Name: "Cheddar",
  },
  {
    id: 3,
    img: imgTest,
    Name: "Cheddar",
  },
  {
    id: 4,
    img: imgTest,
    Name: "Cheddar",
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
};

const CarouselRange = ({ imgData }) => {
  return (
    <Carousel containerClass="w-full h-full" responsive={responsive}>
      <h1>qsdsq qsdqs d</h1>
      {imgData.map((el) => {
        return (
          <div className="flex items-center justify-center gap-2 w-[150px] h-[150px]">
            <img src={el.img} alt="lmqjkd" />
            <p>{el.text}</p>
            <p>- 1 +</p>
          </div>
        );
      })}
    </Carousel>
  );
};

export const SupplementCard = ({
  setSupplementCard,
  isSupplementCardVisisble,
}) => {
  return (
    <div
      className={`${
        isSupplementCardVisisble ? "block" : "hidden"
      } flex justify-center items-center fixed z-[999] w-screen h-screen bg-[#0000009c] text-white`}
    >
      <button onClick={() => setSupplementCard(!isSupplementCardVisisble)}>
        close X
      </button>
      <div className="flex flex-col items-start gap-4 bg-[#28231B]">
        <div>
          <p className="flex items-center gap-1">
            <AiOutlineCheckCircle />
            Filet d'escalope
          </p>
          <p className="flex items-center gap-1">
            <AiFillCheckCircle />
            lardinette avec sauce gruyère
          </p>
          <p className="flex items-center gap-1">
            <AiFillCheckCircle />
            Salade oignons rouge
          </p>
        </div>
        <h2>Fromage</h2>
        <CarouselRange imgData={data} />
      </div>
    </div>
  );
};
