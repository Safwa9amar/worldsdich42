import React, { useContext, useEffect, useRef, useState } from "react";
import { Categories } from "../../context/categorycontext";

export default function Boisson({ id, MenuPrice }) {
  const Boisson = useContext(Categories)[8];
  const ref = useRef(null);
  // state for hide and show modal
  const [SelectionBoisson, setSelectionBoisson] = useState(
    Boisson.list.map((el) => (el = Object.assign(el, { status: false })))
  );
  useEffect(() => {
    MenuPrice ? (ref.current.checked = true) : (ref.current.checked = false);
  }, [MenuPrice]);

  const handleHide = () => {
    ref.current.checked = false;
  };
  return (
    <>
      <input ref={ref} type="checkbox" className="modal-toggle" />
      <div className="pt-0 modal">
        <div className="modal-box relative w-11/12 max-w-5xl">
          <div className="sticky left-[98%] top-0 flex justify-between bg-inherit ">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <img src={Boisson.icon} alt="icon" />
              Choisissez votre boisson
            </h3>
            <button onClick={handleHide} className="  btn btn-sm btn-circle ">
              ✕
            </button>
          </div>

          <div className="py-4 grid grid-cols-2 md:grid-cols-3 ">
            {SelectionBoisson.map((el) => (
              <MenuItem
                key={el.id}
                id={el.id}
                img_url={el.img_url}
                name={el.name}
                available={el.etat}
                status={el.status}
                setSelectionBoisson={setSelectionBoisson}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const MenuItem = ({
  img_url,
  name,
  available,
  id,
  status,
  setSelectionBoisson,
}) => {
  const handleSelect = (e) => {
    setSelectionBoisson((prev) => {
      const newSelection = prev.map((el) => {
        if (el.id === id) {
          el.status = true;
        }
        return el;
      });
      return newSelection;
    });
  };
  return (
    <>
      <button
        onClick={handleSelect}
        className={` flex flex-col items-center  flex-1 gap-2 
        transition-all duration-300 ease-in-out
        ${
          available
            ? "opacity-100"
            : "opacity-50 cursor-not-allowed pointer-events-none"
        }
        ${status ? "bg-[#5B6D5B]  rounded-xl p-2 " : "p-2"}
        `}
      >
        <div
          className={`badge badge-primary ${
            status ? "opacity-100" : "opacity-0"
          } `}
        >
          Tu choisis
        </div>
        <img
          className={`w-[70px] h-[70px]  md:w-[100px] md:h-[100px] rounded-2xl `}
          src={img_url}
          alt={name}
        />
        <p
          className={`text-md md:text-lg capitalize w-full ${
            available ? "" : "line-through"
          } `}
        >
          {name}
        </p>
      </button>
    </>
  );
};
