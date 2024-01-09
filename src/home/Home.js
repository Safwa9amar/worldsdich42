import React, { useContext, useEffect, useState } from "react";

// import line from "../icons/Line.svg";
// import foodqualityIco from "../icons/foodquality.svg";
// import meathalalIco from "../icons/meathalal.svg";
// import breadIco from "../icons/bread.svg";
import Logo from "../images/_logo.png";
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
const responsive2 = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Home = () => {
  const data = useContext(Categories);
  const URI =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_SERVER_URI
      : process.env.REACT_APP_DEV_SERVER_URI;
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
      className="flex flex-col items-center justify-center gap-20"
    >
      <div
        className="
        bg-bg-header
      md:bg-bg-md-header
      bg-fixed
      bg-cover
       w-full p-20 flex flex-col items-center justify-center gap-4"
      >
        <div className="w-4/5 h-full bg-[#000000cc] p-10 rounded-lg bg-cover flex flex-col items-center justify-center gap-4">
          <img
            src={Logo}
            alt="logo"
            className="w-[100px] md:w-[200px] h-[100px] md:h-[200px] "
          />
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 0.5 },
            }}
            className="text-5xl md:text-[4rem] font-DancingScript "
          >
            Restaurant rapide halal
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 1 },
            }}
            className="text-lg md:text-xl font-light max-w-[700px]  "
          >
            Vous propose sandwichs tacos au four burgers fait maison pizza sur
            place ou à emporter et en livraison, avec des produits frais.
            (Escalope, kefta maison...), Une salle climatisée.
            <br />
            On dispose de 24 places assises. On dispose également de deux
            chaises hautes pour bébé. <br />
            Une Télé est à votre disposition en attendant votre commande.
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 1.2 },
            }}
            className="btn btn-outline btn-primary"
          >
            <Link to="/menu">Commandez</Link>
          </motion.p>
        </div>
      </div>
      <br />

      <div className="flex flex-col items-center gap-10 text-center text-white w-full">
        <h1 className="font-DancingScript font-bold text-3xl md:text-6xl capitalize">
          nous servons
        </h1>
        <div className="flex flex-wrap justify-center  gap-2 w-4/5">
          {data.map((el, idx) => {
            return (
              <Menus
                key={idx}
                idx={idx}
                name={el.name}
                id={el.id}
                img={el.img}
              />
            );
          })}
        </div>
      </div>
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
        itemClass="!h-[4 50px] !max-w-fit  	mx-4"
        responsive={responsive}
        showDots={true}
        dotListClass="custom-dot-list-style"
      >
        {Ldata.map((el) => (
          <img
            key={el.id}
            src={el.img}
            alt={el.id}
            className="rounded-lg aspect-square"
          />
        ))}
      </Carousel>
      <BookTable />

      <Link className="btn btn-outline btn-primary m-10 " to="/menu">
        VOIRE LE MENU
      </Link>
    </motion.div>
  );
};

export default Home;
