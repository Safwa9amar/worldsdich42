import React, { useEffect, useContext, useState } from "react";
import MenuItem from "../components/GridMenuItem";
import { Categories } from "../../context/category";

export function GridSreenMenu({ handleHide }) {
  const categories = useContext(Categories);
  const [ContextData, setContextData] = useState(categories);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-10 place-items-center md:m-20  ">
      {ContextData.map((el) => {
        const { id, name, img } = el;
        console.log(id, name, img);
        return (
          <MenuItem
            key={id}
            itemName={name}
            itemImg={img}
            itemId={id}
            handleHide={handleHide}
          />
        );
      })}
    </div>
  );
}
