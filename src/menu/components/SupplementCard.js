import * as React from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Supplement } from "../../context/suplementContext";

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
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
};

const CarouselItems = ({
  src,
  name,
  status,
  id,
  parent,
  parent_id,
  supp,
  Prix,
  suppData,
  setsuppData,
}) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    setCount(() => {
      let storage = JSON.parse(localStorage.getItem(`foodSupp_${parent_id}`));
      try {
        return storage.filter((el) => el.item_id === id)[0].count;
      } catch (error) {
        return 0;
      }
    });
  }, [parent_id, id]);
  let obj = React.useMemo(() => {
    let obj = {
      // food_id: parent_id,
      item_id: id,
      // name: name,
      supp_id: supp,
      // supp_name: parent,
      count: count,
      price: Prix * count,
    };
    return obj;
  }, [count, id, supp, Prix]);

  const increment = () => {
    count >= 0 && count <= 2 && setCount(count + 1);
  };
  const decrement = () => {
    count > 0 && setCount(count - 1);
  };

  React.useEffect(() => {
    if (
      parent_id !== undefined &&
      !localStorage.getItem(`foodSupp_${parent_id}`)
    ) {
      localStorage.setItem(`foodSupp_${parent_id}`, "[]");
    }
    try {
      let storage = JSON.parse(localStorage.getItem(`foodSupp_${parent_id}`));

      let arr = storage.map((el) => {
        if (el.item_id === obj.item_id) {
          el = obj;
        }
        return el;
      });
      if (count === 0) {
        localStorage.setItem(
          `foodSupp_${parent_id}`,
          JSON.stringify(arr.filter((el) => el.item_id !== obj.item_id))
        );
      }
      if (count <= 0) return;
      if (!arr.includes(obj)) arr.push(obj);

      localStorage.setItem(`foodSupp_${parent_id}`, JSON.stringify(arr));
    } catch (error) {}
  }, [count, obj, parent_id]);

  return (
    <div className="indicator carousel-item flex flex-col  items-center capitalize">
      <span
        className={`indicator-item badge badge-xs ${
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
      <p>
        {name}
        <sup className="font-bold">( +€{Prix} )</sup>
      </p>
      <p className={`badge badge-xs ${status ? "badge-primary" : ""} my-2`}>
        {parent}
      </p>
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

const MyCarousel = ({
  data,
  name,
  id,
  parent_id,
  categoryId,
  supp,
  suppData,
  setsuppData,
}) => {
  return (
    <>
      {/* <div className="text-xl font-medium">
        <h2 className="">{name}</h2>
      </div> */}
      <Carousel containerClass="w-full h-fit py-2" responsive={responsive}>
        {data.map((el) => {
          let arr = el.categoryIDs.match(/\d+/g).map((cat) => parseInt(cat));
          if (!arr.includes(categoryId)) return false;
          return (
            <CarouselItems
              key={`${el.id}_${id}`}
              id={el.id}
              src={el.img_url}
              name={el.name}
              status={el.isAvailable}
              parent={name}
              parent_id={parent_id}
              supp={supp}
              Prix={el.Prix}
              suppData={suppData}
              setsuppData={setsuppData}
            />
          );
        })}
      </Carousel>
    </>
  );
};

export function SupplementCard(props) {
  const {
    el_id,
    show,
    toggleModal,
    recipeData,
    handleOptionChanges,
    categoryId,
  } = props;
  const [showModal, setShowModal] = React.useState(false);
  const [recipe_data, setRecipe_data] = React.useState([]);
  const supplementData = React.useContext(Supplement);

  const [RecipArr, setRecipArr] = React.useState([]);
  const [suppData, setsuppData] = React.useState([]);

  let arr = [];

  React.useEffect(() => {
    setShowModal(show);
    //
    setRecipe_data(recipeData);
    //
  }, [show, RecipArr, recipeData, suppData]);

  const handleclick = () => {
    handleClos();
    console.log(arr);
    arr.length > 0 && setRecipArr(arr);
  };
  const handleClos = () => {
    setShowModal(!showModal);
    toggleModal();
    setRecipArr([]);
    // localStorage.setItem("suppData", "[]");
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
            <AiOutlineCheckCircle
              onClick={handleclick}
              className="w-[35px] h-[35px] btn btn-sm  btn-circle "
            />
            <AiOutlineCloseCircle
              onClick={handleClos}
              className="w-[35px] h-[35px]  btn btn-sm btn-circle"
            />
          </div>
          <h3 className="font-bold text-lg">Choisissez ce que vous voulez!</h3>
          <div className="py-4">
            {/* <div className="grid grid-cols-2 p-4 place-content-center"> */}
            {showModal &&
              recipe_data.map((el) => {
                const { id, isCheked, name } = el;
                return (
                  <CheckedItem
                    key={id}
                    id={id}
                    el_id={el_id}
                    isChecked={isCheked}
                    text={name}
                    handleOptionChanges={handleOptionChanges}
                  />
                );
              })}
            {/* </div> */}
            <div className="w-full">
              {supplementData.map((el) => {
                return (
                  <MyCarousel
                    data={el.item_supplement}
                    id={el.id}
                    supp={el.id}
                    parent_id={el_id}
                    key={`${el.name}_${el.id}`}
                    name={el.name}
                    categoryId={categoryId}
                    suppData={suppData}
                    setsuppData={setsuppData}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CheckedItem({ isChecked, text, id, el_id, handleOptionChanges }) {
  const [checked, setChcked] = React.useState(isChecked);
  const handleChange = () => {
    setChcked(!checked);

    handleOptionChanges(el_id, id, checked);
  };
  React.useEffect(() => {
    let storage = JSON.parse(localStorage.getItem("optionsData") || "[]");
    let changes = `p_id${el_id}-ch_id${id}`;
    let index = storage.indexOf(changes);
    index !== -1 && setChcked(false);
  }, [el_id, id]);

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
