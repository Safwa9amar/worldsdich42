import React, { useContext, useEffect, useState } from "react";

// import line from "../icons/Line.svg";
// import foodqualityIco from "../icons/foodquality.svg";
// import meathalalIco from "../icons/meathalal.svg";
// import breadIco from "../icons/bread.svg";
import Logo from "../images/_logo.png";
import { SERVER_URI } from "../helpers/UrlProvider";

import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Ldata from "./carouselData";
import { motion } from "framer-motion";
import OfferCard from "./Offer";
import { Categories } from "../context/categorycontext";
import Menus from "./Menus";
import BookTable from "./BookTable";
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
  const data = useContext(Categories);
  const URI = useContext(SERVER_URI);
  const [promotionTotal, setPromotionTotal] = useState(0);

  useEffect(() => {
    fetch(`${URI}/settings/api/globalPromotion`, {
      method: "GET",
      cors: "no-cors",
    })
      .then((res) => res.json())
      .then((data) => {
        setPromotionTotal(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        // rotate: [0, 0, 270, 270, 0],
        // borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      }}
      className="w-full flex flex-col items-center gap-10"
    >
      {/* <div className="flex flex-row justify-evenly items-center w-full text-white capitalize">
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
      </div> */}
      <br />
      <div className="sm:prose-sm md:prose-md  text-center text-white">
        <h1 className="font-DancingScript font-bold text-3xl md:text-6xl capitalize">
          Nos offres
        </h1>
        <br />
        <div className="flex justify-center md:justify-evenly gap-4  flex-wrap">
          {promotionTotal.value > 0 && (
            <OfferCard
              key={22}
              id={2}
              name={"Prix total demandé"}
              img={Logo}
              cutting_off={promotionTotal.value}
              isPromotionTotal={promotionTotal.value > 0 ? true : false}
            />
          )}
          {data.filter((el) => el.cutting_off_status).length === 0 &&
          promotionTotal.value === 0 ? (
            <OfferCard
              key={11}
              id={1}
              name={"Aucune offre maintenant"}
              img={Logo}
              cutting_off={0}
            />
          ) : (
            data
              .filter((el) => el.cutting_off_status)
              .map((el) => {
                return (
                  <OfferCard
                    key={el.id}
                    id={el.id}
                    name={el.name}
                    img={el.img}
                    cutting_off={el.cutting_off}
                  />
                );
              })
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-10 text-center text-white w-full">
        <h1 className="font-DancingScript font-bold text-3xl md:text-6xl capitalize">
          nous servons
        </h1>
        <div className="flex flex-wrap justify-center  gap-2 w-4/5">
          {data.map((el, idx) => {
            return <Menus idx={idx} name={el.name} id={el.id} img={el.img} />;
          })}
        </div>
      </div>
      <BookTable />

      <div className=" mt-10 mx-10 flex flex-col items-center sm:prose-sm md:prose-md  text-center text-white">
        <h1 className="font-DancingScript font-bold text-3xl md:text-6xl capitalize">
          Galerie
        </h1>
      </div>

      {/* <h2>PAS SEULEMENT UNE RESTAURANT, MAIS UN STYLE DE VIE</h2> */}
      <Carousel
        infinite={true}
        autoPlay={true}
        className="w-full"
        itemClass="!h-[250px] !max-w-[350px] 	mx-4"
        responsive={responsive}
        showDots={true}
        dotListClass="custom-dot-list-style"
      >
        {Ldata.map((el) => (
          <img key={el.id} src={el.img} alt={el.id} className="rounded-lg" />
        ))}
      </Carousel>
      <Link
        className="bg-[#5B6D5B] w-fit py-4 px-8 my-4 text-white rounded-md"
        to="/store/menu"
      >
        VOIRE LE MENU
      </Link>
    </motion.div>
  );
};

export default Home;
