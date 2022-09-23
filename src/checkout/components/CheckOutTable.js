import React from "react";

function TableRow({ avatar, header, category, price, totalPrice, amount }) {
  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={avatar} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{header}</div>
            <div className="text-sm opacity-50">{category}</div>
          </div>
        </div>
      </td>
      <td>{price}</td>
      <td>€{amount}</td>
      <th>
        <button className="btn btn-ghost btn-xs">€{totalPrice}</button>
      </th>
    </tr>
  );
}
export function CheckOutTable({ burger, showTable, setshowTable }) {

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
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <TableRow
            avatar={burger}
            header={"Classic"}
            category={"burger"}
            price={6.5}
            totalPrice={13}
            amount={2}
          />
        </tbody>
      </table>
    </div>
  );
}
