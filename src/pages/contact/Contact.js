import React, { useEffect, useRef } from "react";
// import bg_title from "../asstes/bg_title.jpg";
// import botiqueFronImg from "../asstes/botiqueFronImg.jpg";
import { FiPhoneCall } from "react-icons/fi";
import { MdPlace } from "react-icons/md";
import { motion } from "framer-motion";

import emailjs from "@emailjs/browser";
import { useState } from "react";
import Map from "../../helpers/Map";
import { FiMail } from "react-icons/fi";

const Contact = () => {
  const SERVER_URI =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_SERVER_URI
      : process.env.REACT_APP_DEV_SERVER_URI;
  const Contact = `${SERVER_URI}/settings/api/contact_info`;
  const [contact, setContact] = React.useState([]);

  const form = useRef();
  const [isEmailSent, setisEmailSent] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_6c1h7t1",
        "template_0usr1zj",
        form.current,
        "yoRNM7Z0XcyVtc4Sh"
      )
      .then(
        (result) => {
          if (result.status === 200) {
            form.current.reset();
            setisEmailSent(true);
            setLoading(false);
          }
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    fetch(Contact, {
      method: "GET",
      cors: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setContact(data[0]);
      });
  }, [Contact]);
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: [0.5, 0.7, 0.9, 1],
        translateY: ["120px", "0px"],
      }}
      className="w-full flex flex-col gap-10 items-center pb-24"
    >
      <div className="flex items-center justify-center relative z-[1] bg-store-img bg-cover bg-no-repeat h-[35vh] w-full after:absolute after:w-full after:-z-[1] after:h-full after:bg-black after:opacity-80">
        <div className="text-6xl font-DancingScript">Contactez Nous</div>
      </div>

      <Map tailcss="h-[50vh] w-[95vw] md:w-3/4" />
      <div className="w-11/12 md:w-3/4 text-3xl">Entrer en contact</div>
      {/* <div className="flex flex-col md:flex-row items-start gap-4  w-11/12 md:w-3/4"> */}
      <div className="grid grid-cols-1 md:grid-cols-contact-form grid-rows-2 gap-8  w-11/12 md:w-3/4">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col justify-between gap-4 row-span-2 "
        >
          <textarea
            required
            name="message"
            placeholder="Message"
            className="textarea textarea-bordered"
            minLength="10"
          ></textarea>

          <div className="flex flex-col md:flex-row justify-between gap-4 ">
            <input
              name="sender_name"
              className="input input-bordered w-full "
              placeholder="Nom"
              type="text"
              required
            />
            <input
              className="input input-bordered w-full "
              type="text"
              name="client_email"
              placeholder="Email"
              required
            />
          </div>
          <div className="flex flex-col">
            <input
              className="input input-bordered w-full max-w-full "
              type="text"
              name="email"
              placeholder="subject"
              required
            />
          </div>
          {isEmailSent && (
            <div className="text-success">
              Votre message a été bien envoyé, nous vous répondrons dans les
              plus brefs délais.
            </div>
          )}
          <button
            type="submit"
            className="self-start flex gap-1 text-white bg-accent rounded-3xl hover:bg-accent-focus p-3  cursor-pointer"
          >
            {isLoading ? (
              <>
                <p className="animate-spin h-5 w-5 mr-3 rounded-full border-b-2 border-white"></p>
                Processing...
              </>
            ) : (
              "Envoyer"
            )}
          </button>

          {/* <input className=" self-end text-white bg-[#1D2326] p-3 rounded-md cursor-pointer" type="submit" value="Envoyer" /> */}
        </form>
        <div className="flex flex-col gap-6 w-full">
          <div className="flex gap-4">
            <MdPlace className="text-3xl" />
            <p className="w-52">{contact.address}</p>
          </div>
          <div className="flex gap-4">
            <FiMail className="text-3xl" />
            <p>{contact.mail}</p>
          </div>
          <div className="flex gap-4">
            <FiPhoneCall className="text-3xl" />
            <div className="flex flex-col gap-2">
              <p className="w-52">{contact.tel1}</p>
              <p className="w-52">{contact.tel2}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
