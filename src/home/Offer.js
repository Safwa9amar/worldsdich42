import React from "react";
import { Link } from "react-router-dom";

export default function OfferCard({
  id,
  name,
  img,
  cutting_off,
  isPromotionTotal,
}) {
  return (
    <div className="w-11/12 md:w-auto md:min-w-[500px] flex items-center gap-4 bg-neutral hover:bg-neutral-focus rounded-xl p-4">
      <img
        className="w-[100px] h-[100px] md:h-[175px] md:w-[175px] max-w-[175px] max-h-[175px] rounded-full border-4 border-accent 0 "
        src={img}
        alt="offer_img"
      />
      <div className="flex flex-col  text-left gap-2">
        <h4 className="font-DancingScript text-xl md:text-4xl !m-0">{name}</h4>
        <p className="font-DancingScript text-lg md:text-3xl">
          {cutting_off}% off
        </p>
        {cutting_off > 0 && (
          <Link
            to={`${
              isPromotionTotal
                ? "/store/menu/"
                : `/store/menu/category?id=${id}`
            }`}
            className="btn btn-accent btn-sm md:btn-md rounded-3xl flex gap-4 capitalize text-white"
          >
            <span>Commandez</span>
            <svg
              className="w-[20px] h-[20px] md:w-[30px] md:h-[h-36px]"
              viewBox="0 0 42 36"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.0131 9.07407H5.78598C5.21403 9.07409 4.64843 9.18253 4.12564 9.39241C3.60285 9.60229 3.13447 9.90894 2.7507 10.2926C2.36692 10.6763 2.07626 11.1284 1.89747 11.6199C1.71867 12.1115 1.65569 12.6314 1.7126 13.1463L2.94076 24.2574C3.04177 25.1713 3.51452 26.0186 4.26723 26.635C5.01995 27.2513 5.99893 27.5925 7.01413 27.5926H26.5623C27.509 27.5929 28.4266 27.2964 29.1589 26.7534C29.8911 26.2105 30.3928 25.4547 30.5783 24.6148L34.0131 9.07407Z"
                stroke="white"
                stroke-width="2"
                stroke-linejoin="round"
              />
              <path
                d="M34.0131 9.07406L35.6711 3.06851C35.782 2.66805 36.0376 2.3126 36.3973 2.05861C36.757 1.80462 37.2003 1.66667 37.6566 1.66666H40.1538M27.8723 35H23.7785M11.4969 35H7.40306"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
