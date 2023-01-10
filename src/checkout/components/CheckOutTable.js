import React, { useEffect, useState } from "react";
import { calculeCoupon } from "../../helpers/CalculeCoupon";
import { formatEUR } from "../../helpers/currencyFormatter";

function TableRow({
  avatar,
  header,
  category,
  price,
  amount,
  isMenu,
  supp,
  // Supp,
  // setSupp,
  // cutting_off_status,
  // cutting_off,
}) {
  const [Supp, setSupp] = useState()
  useEffect(() => {
    try {
      if (supp !== null && supp.length > 0) {
        let totalSupp = supp
          .map((el) => el.price)
          .reduce((curr, next) => curr + next);
        setSupp(totalSupp);
      } else {
        setSupp(0);
      }
    } catch (error) {
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
      <td className="">{formatEUR(price)} x ({amount || 1})</td>
      {/* <td></td> */}
      <th className="hidden md:flex flex-col h-[100px]">
        <span>
          ({formatEUR(price)} x {amount}) article
        </span>
        <span>{isMenu ? `+ ( 2€ x ${amount} ) Menu  ` : ""} </span>
        <span>{Supp ? `+ ( ${Supp}€ x ${amount} ) Supplément ` : ""}</span>
      </th>
      <th>
        {formatEUR(price * amount + (isMenu ? 2 * amount : 0) + Supp * amount)}
      </th>
      {/* <th>
        {cutting_off_status ? (
          <div className=" ">
            {formatEUR(
              calculeCoupon(
                price * amount + (isMenu ? 2 * amount : 0) + Supp * amount,
                cutting_off
              )
            )}
            <div className="badge badge-accent ">-{cutting_off}%</div>
          </div>
        ) : (
          formatEUR(price * amount + (isMenu ? 2 * amount : 0) + Supp * amount)
        )}
      </th> */}
    </tr>
  );
}
export function CheckOutTable({ showTable, data }) {
  const [Supp, setSupp] = useState(0);

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
            {/* <th>Quantité</th> */}
            <th >L'article</th>
            <th>Total</th>
            {/* <th>Remise</th> */}
          </tr>
        </thead>
        <tbody>
          {data
            .map((el) => el.Categorie)
            .filter((el, i, arr) => arr.indexOf(el) === i)
            .map((category) => (
              <>
                {/* <tr className="badge badge-secondary" key={category} > */}
                <td
                  className="bg-neutral text-gray-200 font-bold "
                  // className="badge m-2"
                  colSpan="2"
                  key={category}
                >
                  {category}

                  {data.filter((el) => el.Categorie === category)[0]
                    .cutting_off_status && (
                    <div 
                    className="badge badge-accent mx-2">
                      -
                      {
                        data.filter((el) => el.Categorie === category)[0]
                          .cutting_off
                      }
                      %
                    </div>
                  )}
                </td>
                <td
                  key={Math.random()}
                  colSpan="2"

                  className="bg-neutral text-gray-100 text-center font-bold"
                >

                  {formatEUR(
                    calculeCoupon(
                      data
                        .filter((el) => el.Categorie === category)
                        .map(
                          (el) =>{
                            if (el.supplement !== null && el.supplement.length > 0) {
                              let totalSupp = el.supplement
                                .map((el) => el.price)
                                .reduce((curr, next) => curr + next);
                              return el.prix * el.amount + (el.isMenu  ? 2 * el.amount : 0)  + totalSupp * el.amount
                            } else {

                              return el.prix * el.amount + (el.isMenu  ? 2 * el.amount : 0) 
                            }
                          }
                        )
                        .reduce((curr, next) => curr + next),
                      data.filter((el) => el.Categorie === category)[0]
                        .cutting_off_status
                        ? data.filter((el) => el.Categorie === category)[0]
                            .cutting_off
                        : 0
                    )
                  )}
                </td>
                {/* </tr> */} 
                {data
                  .filter((el) => el.Categorie === category)
                  .map((el) => {
                    return (
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
                        // cutting_off={el.cutting_off}
                        // cutting_off_status={el.cutting_off_status}
                      />
                    );
                  })}
              </>
            ))}
        </tbody>
      </table>
    </div>
  );
}
