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
export default function Footer() {
  const SERVER_URI = process.env.REACT_APP_SERVER_URI;
  const WorkHours = `${SERVER_URI}/settings/api/WorkHours`;
  const Contact = `${SERVER_URI}/settings/api/contact_info`;
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
    <footer className="bg-[#222831]  w-full  rounded-xl grid grid-cols-1 gap-10 lg:grid-cols-3 p-6">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-DancingScript !text-white text-4xl">
          Contatez Nous
        </h1>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.google.com/maps/place/45.4321830454166,%204.392961885894287"
          className="flex items-start gap-2 "
        >
          <GiPositionMarker className="w-[20px] h-[20px]" />
          <p>{contact.address}</p>
        </a>
        <a href={contact.tel1} className="flex items-center gap-2 ">
          <FiPhoneCall className="w-[20px] h-[20px]" />
          <p>
            {contact.tel1}| {contact.tel2}
          </p>
        </a>
        <a
          href="mailto:support@worlds-dwich42.com"
          className="flex  items-center gap-2 "
        >
          <AiOutlineMail className="w-[20px] h-[20px]" />
          <p> {contact.mail}</p>
        </a>
        <div className="flex gap-4">
          <a
            href={`https://www.facebook.com/profile.php?id=${contact.facebook}`}
            className="flex items-center gap-2 lg:text-lg"
            target="_blank"
            rel="noreferrer"
          >
            <AiOutlineFacebook className="w-[30px] h-[30px]" />
          </a>
          <a
            href={`https://www.instagram.com/${contact.instagram}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 lg:text-lg"
          >
            <AiOutlineInstagram className="w-[30px] h-[30px]" />
          </a>
        </div>
        <p className="text-center">
          © {new Date().getFullYear()} All Rights Reserved By world's dwich 42
        </p>
        <a
          className="underline link-primary"
          href={process.env.REACT_APP_DEVELOPER_URL}
          target="_blank"
          rel="noreferrer"
        >
          Designed and developed by hamza safwan
        </a>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h1 className="font-DancingScript !text-white text-4xl">
          World's Dwich 42
        </h1>
        <p className="text-center">
          Restaurant rapide halal vous propose sandwichs tacos au four burgers
          fait maison pizza sur place ou à emporter et en livraison, avec des
          produits frais.
        </p>

        <img
          className="lg:w-[250px] lg:h-[250px] w-[150px] h-[150px]"
          src={Logo}
          alt="logo"
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        <h1 className="font-DancingScript !text-white text-4xl">
          Horaires d'ouvertures
        </h1>
        {workHours.map((item) => {
          return (
            <p key={item.id} className="capitalize">
              {item.dayName} {item.from_hour} - {item.to_hour}
            </p>
          );
        })}
      </div>
    </footer>
  );
}
