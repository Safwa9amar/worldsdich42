import * as React from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Supplement } from "../../context/SuplementContext";

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

export function SupplementCard({ id, show, toggleModal, recipeData }) {
  const [showModal, setShowModal] = React.useState(false);
  const [recipe_data, setRecipe_data] = React.useState([]);

  const [RecipArr, setRecipArr] = React.useState(undefined);

  let arr = [];

  const handleRecipChange = (id, check) => {
    if (!check) {
      arr.push(id);
    } else {
      arr.splice(arr.indexOf(id), 1);
    }
  };
  React.useEffect(() => {
    setShowModal(show);
    //
    setRecipe_data(recipeData);
    //
  }, [show]);
  const handleclick = () => {
    handleClos();
    arr.length > 0 && setRecipArr(arr)
  };
  const handleClos = () => {
    setShowModal(!showModal);
    toggleModal();
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
            <label onClick={handleClos} className="btn btn-sm btn-circle ">
              <AiOutlineCloseCircle className="w-full h-full" />
            </label>
          </div>
          <h3 className="font-bold text-lg">Choisissez ce que vous voulez!</h3>
          <div className="py-4">
            {recipe_data.map((el) => {
              const { id, isChecked, recip } = el;
              return (
                <CheckedItem
                  handleRecipChange={handleRecipChange}
                  key={id}
                  id={id}
                  isChecked={isChecked}
                  text={recip}
                />
              );
            })}

            <div className="w-full">
              <MyCarousel data={Supplement} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CheckedItem({ isChecked, text, id, handleRecipChange }) {
  const [checked, setChecked] = React.useState(isChecked);
  const handleChange = () => {
    setChecked(!checked);
    handleRecipChange(id, !checked);
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
