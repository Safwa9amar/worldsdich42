import React, {  useContext } from "react";
import MenuItem from "../components/GridMenuItem";
import { Categories } from "../../context/categorycontext";

export function GridSreenMenu({ handleHide }) {
  const categories = useContext(Categories);
  // const [ContextData] = useState(categories);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-24 place-items-center md:m-20  ">
      {categories.map((el) => {
        const { id, name, img } = el;
        return (
          <MenuItem
            key={id}
            itemName={name}
            itemImg={img}
            itemId={id}
            handleHide={handleHide}
            cutting_off={el.cutting_off}
            cutting_off_status={el.cutting_off_status}
          />
        );
      })}
    </div>
  );
}
