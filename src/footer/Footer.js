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
          <p>Lundi au jeudi et dimanche 11h30-14h 18h30-1h</p>
          <p>vendredi, samedi 18h30-4h30</p>
          <p>
            livraison a partir de 20 € sur saint-étienne selon le secteur +
            frais de livraison 2.50€
          </p>
        </div>
        <div className="grid grid-row-2 gap-3 text-white lg:p-10 ">
          <div className="flex justify-between  flex-col lg:flex-row items-center lg:items-start gap-5 w-full">
            <div className="text-[#888888] font-bold  ">CONTACTEZ-NOUS</div>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.google.com/maps/place/45.4321830454166,%204.392961885894287"
              className="flex items-start gap-2 lg:text-lg"
            >
              <GiPositionMarker className="w-[30px] h-[30px]" />
              <p>
                17, Rue Antoine du Rafour
                <br /> 42100 Sanit-étienne
              </p>
            </a>
            <a
              href="mailto:support@worlds-dwich42.com"
              className="flex  items-center gap-2 lg:text-lg"
            >
              <AiOutlineMail className="w-[30px] h-[30px]" />
              <p> support@worlds-dwich42.com</p>
            </a>
            <a
              href="tel:+04 87 66 92 67"
              className="flex items-center gap-2 lg:text-lg"
            >
              <FiPhoneCall className="w-[30px] h-[30px]" />
              <p>+04 87 66 92 67 | +07 54 15 85 35</p>
            </a>
          </div>
          <div className="flex justify-between  flex-col lg:flex-row   items-center gap-5 w-full">
            <div className="text-[#888888] font-bold  ">Réseaux sociaux</div>
            <a
              href="https://www.facebook.com/profile.php?id=100069830787150"
              className="flex items-center gap-2 lg:text-lg"
            >
              <AiOutlineFacebook className="w-[30px] h-[30px]" />
              <p>World’s Dwich 42</p>
            </a>
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
