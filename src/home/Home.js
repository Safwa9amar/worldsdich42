import React, { useRef } from "react";
import line from "../icons/Line.svg";
import foodqualityIco from "../icons/foodquality.svg";
import meathalalIco from "../icons/meathalal.svg";
import breadIco from "../icons/bread.svg";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import data from "./carouselData";
import { motion, useInView } from "framer-motion";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Home = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        // rotate: [0, 0, 270, 270, 0],
        // borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      }}
      className="md:w-[95vw] md:mx-[2.5vw] flex flex-col items-center gap-10"
    >
      <div className=" mt-10 mx-10 flex flex-col items-center sm:prose-sm md:prose-md  text-center text-white">
        <h1 className="capitalize">Restaurant rapide halal </h1>
        <img className="w-1/2 md:w-auto" src={line} alt="line" />

        {/* <h2>PAS SEULEMENT UNE RESTAURANT, MAIS UN STYLE DE VIE</h2> */}
      </div>

      <Carousel
        infinite={true}
        autoPlay={true}
        className="w-4/5"
        responsive={responsive}
      >
        {data.map((el) => (
          <img
            key={el.id}
            className="w-full md:w-[300px] h-[350px] rounded-lg"
            src={el.img}
            alt={el.id}
          />
        ))}
      </Carousel>

      <div
        className="mt-10 mx-10 flex flex-col items-center sm:prose-sm md:prose-md  text-center text-white"
        ref={ref}
        style={{
          transform: isInView ? "none" : "translateY(20px)",

          opacity: isInView ? 1 : 0,
          transition: "all 1.5s cubic-bezier(0.17, 0.55, 0.55, 1)",
        }}
      >
        <p className=" md:text-2xl">
          Restaurant rapide halal <br />
          vous propose sandwich tacos au four burger fait maison pizza sur place
          ou à emporter et en livraison, avec des produits frais.
          <br />
          (Escalope, kefta maison...) Une salle climatisée.
          <br />
          On dispose de 34 places assises. On dispose également de deux chaises
          hautes pour bébé.
          <br />
          Une Télé est à votre disposition en attendant votre commande.
        </p>
      </div>
      <img className="w-1/2 md:w-auto" src={line} alt="line" />

      <div className="flex flex-row justify-evenly items-center w-full text-white">
        <div
          className="text-center flex flex-col items-center"
          ref={ref}
          style={{
            transform: isInView ? "none" : "translateY(20px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
        >
          <img
            className="w-[50px] md:w-[80px] h-[50px] md:h-[150px] "
            src={foodqualityIco}
            alt="foodqualityIco"
          />
          <p>Quality Foods</p>
        </div>
        <div
          className="text-center flex flex-col items-center"
          ref={ref}
          style={{
            transform: isInView ? "none" : "translateY(20px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1s",
          }}
        >
          <img
            className="w-[50px] md:w-[80px] h-[50px] md:h-[150px] "
            src={meathalalIco}
            alt="meathalalIco"
          />
          <p>Viande 100% halal</p>
        </div>
        <div
          className="text-center flex flex-col items-center"
          ref={ref}
          style={{
            transform: isInView ? "none" : "translateY(20px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1.5s",
          }}
        >
          <img
            className="w-[50px] md:w-[80px] h-[50px] md:h-[150px] "
            src={breadIco}
            alt="breadIco"
          />
          <p>pain fait maison</p>
        </div>
      </div>

      <div className="sm:prose-sm md:prose-md  text-center text-white w-4/5">
        <h1>NOS PLATS SAVOUREUX</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 place-items-center gap-2">
          {data.map((el) => {
            return (
              <img
                key={el.id}
                className="w-[150px] h-[150px] md:w-[250px] md:h-[250px] md: rounded-lg"
                src={el.img}
                alt={el.id}
              />
            );
          })}
        </div>
      </div>
      <Link
        className="bg-[#5B6D5B] w-fit py-4 px-8 my-4 text-white rounded-md"
        to="/menu"
      >
        VOIRE LE MENU
      </Link>
    </motion.div>
  );
};

export default Home;
