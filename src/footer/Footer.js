import React from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineMail,
} from "react-icons/ai";
import { GiPositionMarker } from "react-icons/gi";
import { FiPhoneCall } from "react-icons/fi";

import Logo from "../images/_logo.png";
export default function Footer() {
  return (
    <div className="bg-[#121618]  lg:w-[95vw] lg:mx-[2.5vw] p-5 rounded-xl">
      <div className="lg:py-4 flex flex-col lg:flex-row items-center ">
        <div className="flex flex-col items-center lg:w-1/4 text-center text-[#888888] lg:border-r-2 lg:border-b-0 mb-3 border-b-2  border-[#888888] lg:pr-5">
          <img className="w-[150px]" src={Logo} alt="logo" />
          <p>11 am - 14 am | 18 pm - 2 am</p>
          <p>
            livraison a partir de 15 € sur saint-étienne selon le secteur +
            frais de livraison 2.5€
          </p>
        </div>
        <div className="grid grid-row-2 gap-3 text-white lg:p-10 ">
          <div className="flex justify-between  flex-col lg:flex-row items-center lg:items-start gap-5 w-full">
            <div className="text-[#888888] font-bold  ">CONTACTEZ-NOUS</div>
            <div className="flex items-start gap-2 lg:text-lg">
              <GiPositionMarker className="w-[30px] h-[30px]" />
              <p>
                17, Rue Antoine du Rafour
                <br /> 42100 Sanit-étienne
              </p>
            </div>
            <div className="flex  items-center gap-2 lg:text-lg">
              <AiOutlineMail className="w-[30px] h-[30px]" />
              <p> worlddwich42@gmail.com</p>
            </div>
            <div className="flex items-center gap-2 lg:text-lg">
              <FiPhoneCall className="w-[30px] h-[30px]" />
              <p>+04 87 66 92 67 | +07 54 15 85 35</p>
            </div>
          </div>
          <div className="flex justify-between  flex-col lg:flex-row   items-center gap-5 w-full">
            <div className="text-[#888888] font-bold  ">Réseaux sociaux</div>
            <div className="flex items-center gap-2 lg:text-lg">
              <AiOutlineFacebook className="w-[30px] h-[30px]" />
              <p>World’s Dwich 42</p>
            </div>
            <div className="flex items-center gap-2 lg:text-lg">
              <AiOutlineInstagram className="w-[30px] h-[30px]" />
              <p>World’s Dwich 42</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-[#888888] text-center border-t-2 border-[#888888] py-4">
        Copyright © 2022 World’s Dwich. All Rights Reserved.
      </p>
    </div>
  );
}
