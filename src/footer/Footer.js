import React, { useContext, useEffect } from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineMail,
} from "react-icons/ai";
import { GiPositionMarker } from "react-icons/gi";
import { FiPhoneCall } from "react-icons/fi";

import Logo from "../images/_logo.png";

// import serverUrl from helpers folder
import { SERVER_URI } from "./../helpers/UrlProvider";
export default function Footer() {
  const WorkHours = `${useContext(SERVER_URI)}/settings/api/WorkHours`;
  const Contact = `${useContext(SERVER_URI)}/settings/api/contact_info`;
  // work hours state
  const [workHours, setWorkHours] = React.useState([]);

  // contact state
  const [contact, setContact] = React.useState([]);

  useEffect(() => {
    fetch(WorkHours, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setWorkHours(data);
      });

    fetch(Contact, {
      method: "GET",
      cors: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setContact(data[0]);
      });
  }, [WorkHours, Contact]);
  return (
    <div className="bg-[#121618]  lg:w-[95vw] lg:mx-[2.5vw] p-5 rounded-xl">
      <div className="lg:py-4 flex flex-col lg:flex-row items-center ">
        <div className="flex flex-col items-center lg:w-1/4 text-center text-[#888888] lg:border-r-2 lg:border-b-0 mb-3 border-b-2  border-[#888888] lg:pr-5">
          <img className="w-[150px]" src={Logo} alt="logo" />
          {workHours.map((item) => {
            return (
              <p key={item.id} className="capitalize">
                {item.dayName} {item.from_hour} - {item.to_hour}
              </p>
            );
          })}

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
              className="flex items-start gap-2 lg:text-lg md:w-[250px]"
            >
              <GiPositionMarker className="w-[30px] h-[30px]" />
              <p>{contact.address}</p>
            </a>
            <a
              href="mailto:support@worlds-dwich42.com"
              className="flex  items-center gap-2 lg:text-lg"
            >
              <AiOutlineMail className="w-[30px] h-[30px]" />
              <p> {contact.mail}</p>
            </a>
            <a
              href="tel:+04 87 66 92 67"
              className="flex items-center gap-2 lg:text-lg"
            >
              <FiPhoneCall className="w-[30px] h-[30px]" />
              <p>
                {contact.tel1}| {contact.tel2}
              </p>
            </a>
          </div>
          <div className="flex justify-between  flex-col lg:flex-row   items-center gap-5 w-full">
            <div className="text-[#888888] font-bold  ">Réseaux sociaux</div>
            <a
              href={`https://www.facebook.com/profile.php?id=${contact.facebook}`}
              className="flex items-center gap-2 lg:text-lg"
              target="_blank"
              rel="noreferrer"

            >
              <AiOutlineFacebook className="w-[30px] h-[30px]" />
              <p>World’s Dwich 42</p>
            </a>
            <a
              href={`https://www.instagram.com/${contact.instagram}`}
              target="_blank"
              rel="noreferrer"

              className="flex items-center gap-2 lg:text-lg"
            >
              <AiOutlineInstagram className="w-[30px] h-[30px]" />
              <p>World’s Dwich 42</p>
            </a>
          </div>
        </div>
      </div>
      <p className="text-[#888888] text-center border-t-2 border-[#888888] py-4 flex flex-col md:flex-row justify-between">
        <span>Copyright © 2022 World’s Dwich. All Rights Reserved.</span>
        <a href="http://hamza-safwan.me/"
        target="_blank"
        rel="noreferrer"
        >Designed and developed by hamza safwan</a>
      </p>
    </div>
  );
}
