import React from "react";

function TableRow({ avatar, header, category, price, amount, isMenu }) {
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
      <th>
        <button className="btn btn-ghost btn-xs">
          € {price * amount || price || 0} {isMenu ? `+ ${amount} x 2€` : ""}
        </button>
      </th>
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
      {data.length > 0 ? (
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
            {data.map((el) => {
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
                />
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-info shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>Vous n'avez pas ajouté d'articles</span>
          </div>
        </div>
      )}
    </div>
  );
}
