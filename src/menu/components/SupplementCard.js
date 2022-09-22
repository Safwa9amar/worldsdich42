import * as React from "react";
import imgTest from "../../asstes/supplement/cheddar.png";
import boursin from "../../asstes/supplement/boursin.png";
import champignon from "../../asstes/supplement/champignon.png";
import chevre from "../../asstes/supplement/chevre.png";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const data = [
  {
    id: 1,
    img: imgTest,
    text: "Cheddar",
    isAvaliable: true,
  },
  {
    id: 2,
    img: boursin,
    text: "boursin",
    isAvaliable: false,
  },
  {
    id: 3,
    img: champignon,
    text: "champignon",
    isAvaliable: false,
  },
  {
    id: 4,
    img: chevre,
    text: "chevre",
    isAvaliable: true,
  },
  {
    id: 5,
    img: imgTest,
    text: "Cheddar",
    isAvaliable: true,
  },
  {
    id: 6,
    img: imgTest,
    text: "Cheddar",
    isAvaliable: true,
  },
  {
    id: 7,
    img: imgTest,
    text: "Cheddar",
    isAvaliable: true,
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
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
    items: 3,
  },
};

const data_burger = [
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
];

const CarouselItems = ({ src, name, status }) => {
  const [count, setCount] = React.useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  return (
    <div className="indicator carousel-item flex flex-col  items-center">
      <span
        className={`indicator-item badge ${
          status ? "badge-primary" : "badge-neutral"
        }`}
      >
        {status ? "disponible" : "indisponible"}
      </span>
      <img
        className={`rounded-box w-[100px] h-[100px] ${
          status ? "" : "brightness-50"
        }`}
        src={src}
        alt={name}
      />
      <p>{name}</p>
      {status && (
        <div className="flex justify-between gap-4 items-center bg-[#5B6D5B] px-4 rounded-md">
          <div onClick={decrement} className="cursor-pointer font-bold">
            -
          </div>
          <div>{count}</div>
          <div onClick={increment} className="cursor-pointer font-bold">
            +
          </div>
        </div>
      )}
    </div>
  );
};

const MyCarousel = ({ data }) => {
  return (
    <>
      <div className="text-xl font-medium">
        <h2 className="">Fromage</h2>
      </div>
      <Carousel
        containerClass="w-full h-[200px]"
        showDots={true}
        responsive={responsive}
      >
        {data.map((el) => (
          <CarouselItems
            key={el.id}
            src={el.img}
            name={el.text}
            status={el.isAvaliable}
          />
        ))}
      </Carousel>
    </>
  );
};

export function SupplementCard({ id, show, toggleModal }) {
  const [showModal, setShowModal] = React.useState(false);
  React.useEffect(() => {
    setShowModal(show);
  }, [show]);
  const handleclick = () => {
    setShowModal(!showModal);
    toggleModal();
    console.log(show);
  };
  return (
    <>
      <input
        readOnly={true}
        type="checkbox"
        id="my-modal"
        checked={showModal}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative ">
          <div className="flex gap-2 absolute right-4 top-2 ">
            <label onClick={handleclick} className="btn btn-sm  btn-circle ">
              <AiOutlineCheckCircle className="w-full h-full" />
            </label>
            <label onClick={handleclick} className="btn btn-sm btn-circle ">
              <AiOutlineCloseCircle className="w-full h-full" />
            </label>
          </div>
          <h3 className="font-bold text-lg">Choisissez ce que vous voulez!</h3>
          <div className="py-4">
            {data_burger.map((el) => (
              <CheckedItem
                key={el.id}
                isChecked={el.isChecked}
                text={el.recip}
              />
            ))}

            <div className="w-full">
              <MyCarousel data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CheckedItem({ isChecked, text }) {
  const [checked, setChecked] = React.useState(isChecked);
  const handleChange = () => {
    setChecked(!checked);
  };
  
  return (
    <div className="sm:text-md md:text-xl ">
      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-2 ">
          <input
            onChange={handleChange}
            type="checkbox"
            checked={checked}
            className="toggle toggle-sm	checkbox-accent"
          />
          <span className="label-text">{text}</span>
        </label>
      </div>
    </div>
  );
}
