import React, { Fragment, useEffect, useState } from "react";
import { calculeCoupon } from "../../../helpers/CalculeCoupon";
import { formatEUR } from "../../../helpers/currencyFormatter";

function calculateTotalSupplement(supp) {
  try {
    if (supp !== null && supp.length > 0) {
      return supp.map((el) => el.price).reduce((curr, next) => curr + next);
    } else {
      return 0;
    }
  } catch (error) {
    return 0;
  }
}

function TableRow({ avatar, header, category, price, amount, isMenu, supp }) {
  const [totalSupp, setTotalSupp] = useState(0);

  useEffect(() => {
    setTotalSupp(calculateTotalSupplement(supp));
  }, [supp]);

  const basePrice = price * amount + (isMenu ? 2 * amount : 0);
  const totalAmount = formatEUR(basePrice + totalSupp * amount);

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
      <td className="">
        {formatEUR(price)} x ({amount || 1})
      </td>
      <th className="hidden md:flex flex-col h-[100px]">
        <span>
          ({formatEUR(price)} x {amount}) article
        </span>
        <span>{isMenu ? `+ ( 2€ x ${amount} ) Menu  ` : ""} </span>
        <span>
          {totalSupp ? `+ ( ${totalSupp}€ x ${amount} ) Supplément ` : ""}
        </span>
      </th>
      <th>{totalAmount}</th>
    </tr>
  );
}

export function CheckOutTable({ showTable, data }) {
  const [Supp, setSupp] = useState(0);

  const calculateTotalAmount = (items, cuttingOff) => {
    return formatEUR(
      calculeCoupon(
        items.reduce((curr, next) => {
          const basePrice =
            next.prix * next.amount + (next.isMenu ? 2 * next.amount : 0);
          const totalSupp = next.supplement
            ? next.supplement
                .map((supp) => supp.price)
                .reduce((acc, price) => acc + price, 0)
            : 0;
          return curr + basePrice + totalSupp * next.amount;
        }, 0),
        cuttingOff ? cuttingOff : 0
      )
    );
  };

  const filterDataByCategory = (category) => {
    return data.filter((el) => el.Categorie === category);
  };

  const renderCategoryRow = (category) => (
    <Fragment key={category}>
      <tr>
        <td className="bg-neutral text-gray-200 font-bold" colSpan="2">
          {category}
          {filterDataByCategory(category)[0].cutting_off_status && (
            <div className="badge badge-accent mx-2">
              -{filterDataByCategory(category)[0].cutting_off}%
            </div>
          )}
        </td>
        <td
          key={Math.random()}
          colSpan="2"
          className="bg-neutral text-gray-100 text-center font-bold"
        >
          {calculateTotalAmount(
            filterDataByCategory(category),
            filterDataByCategory(category)[0].cutting_off_status
          )}
        </td>
      </tr>
      {filterDataByCategory(category).map((el) => (
        <TableRow
          key={`${el.id}_${el.category}`}
          avatar={el.img_url}
          header={el.name}
          category={el.Categorie}
          price={el.prix}
          isMenu={el.isMenu}
          amount={el.amount}
          supp={el.supplement}
          Supp={Supp}
          setSupp={setSupp}
        />
      ))}
    </Fragment>
  );

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
        overflow-x-auto
      `}
    >
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th>Produit</th>
            <th className="hidden md:block">Prix</th>
            <th>L'article</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data
            .map((el) => el.Categorie)
            .filter((el, i, arr) => arr.indexOf(el) === i)
            .map(renderCategoryRow)}
        </tbody>
      </table>
    </div>
  );
}
