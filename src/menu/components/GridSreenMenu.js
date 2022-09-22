import MenuItem from "../components/GridMenuItem";
import BurgerImg from "../images/burger.png";
import TacosImg from "../images/tacos.png";
import pizzaImg from "../images/pizza.png";

const data = [
  {
    id: 1,
    category: "MENU KIDS",
    image: BurgerImg,
  },
  {
    id: 2,
    category: "SANDWICHS",
    image: BurgerImg,
  },
  {
    id: 3,
    category: "TACOS",
    image: TacosImg,
  },
  {
    id: 4,
    category: "PIZAA",
    image: pizzaImg,
  },
  {
    id: 5,
    category: "BURGER",
    image: BurgerImg,
  },
  {
    id: 6,
    category: "DESSERT",
    image: BurgerImg,
  },
  {
    id: 7,
    category: "TINY",
    image: BurgerImg,
  },
  {
    id: 8,
    category: "SALADE",
    image: BurgerImg,
  },
  {
    id: 9,
    category: "BOISSON",
    image: BurgerImg,
  },
  {
    id: 10,
    category: "SALADE",
    image: BurgerImg,
  },
  {
    id: 11,
    category: "assièttes",
    image: BurgerImg,
  },
];

export function GridSreenMenu({ handleHide }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-10 place-items-center md:m-20  ">
      {data.map((el) => {
        return (
          <MenuItem
            key={el.id}
            itemName={el.category}
            itemImg={el.image}
            itemId={el.id}
            handleHide={handleHide}
          />
        );
      })}
    </div>
  );
}
