import React, { useEffect, useState } from "react";

function TableRow({ avatar, header, category, price, amount, isMenu, supp }) {
  const [Supp, setSupp] = useState(0);

  useEffect(() => {
    if (supp !== null && supp.length > 0) {
      let totalSupp = supp
        .map((el) => el.price)
        .reduce((curr, next) => curr + next);
      setSupp(totalSupp);
    } else if (supp.length === 0) {
      setSupp(0);
    }
  }, [supp]);
  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={avatar} alt={header} />
            </div>
          </div>
          <div>
            <div className="font-bold">{header}</div>
            <div className="text-sm opacity-50">{category}</div>
          </div>
        </div>
      </td>
      <td>€ {price}</td>
      <td>{amount || 1}</td>
      <th className="hidden md:flex flex-col h-[100px]">
        <span>
          ({price}€ x {amount}) article
        </span>
        <span>{isMenu ? `+ ( 2€ x ${amount} ) Menu  ` : ""} </span>
        <span>{Supp ? `+ ( ${Supp}€ x ${amount} ) Supplément ` : ""}</span>
      </th>
      <th>{price * amount + (isMenu ? 2 * amount : 0) + Supp * amount} €</th>
    </tr>
  );
}
export function CheckOutTable({ showTable, data }) {
  return (
    <div
      className={`
      ${
        !showTable
          ? " scale-[0.1] translate-x-1/3 translate-y-1/4 invisible "
          : "flex -translate-y-14 visible  "
      }
      absolute z-[10] bottom-0  md:translate-y-0 
      transition-all duration-300 
      overflow-hidden 
      md:static 
      md:visible
      md:scale-[1]
      md:translate-x-0
      w-full
      
      `}
    >
      <table className="table w-full">
        <thead>
          <tr>
            <th>Produit</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th className="hidden md:block h-full">L'article</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el) => {
            console.log(el);
            return (
              <TableRow
                key={`${el.id}_${el.category}`}
                avatar={el.img_url}
                header={el.name}
                category={el.Categorie}
                price={el.prix}
                isMenu={el.isMenu}
                totalPrice={13}
                amount={el.amount}
                supp={el.supplement}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
