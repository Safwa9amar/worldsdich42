import React from "react";
// import bg_title from "../asstes/bg_title.jpg";
import botiqueFronImg from "../asstes/botiqueFronImg.jpg";
import { FiPhoneCall } from "react-icons/fi";
// import { BiTime } from "react-icons/bi";
const Contact = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${botiqueFronImg})`,
        backgroundAttachment: "fixed",
        backgroundSize: "100% 100%",
      }}
      className="md:mx-[2.5vw] md:w-[95vw] pb-20 flex flex-col items-center "
    >
      <div className="w-[95%] text-black bg-white md:w-1/2 m-4 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between md:items-baseline ">
          <h3 className="text-3xl md:w-fit text-center  mt-10 ">
            Contactez-nous
          </h3>
          <div className="text-white w-full  flex-1 flex flex-col items-center md:items-end  rounded-md font-medium text-xl text-center py-2">
            <div className="flex flex-col md:flex-row justify-center gap-1 mt-2">
              <a
                className="flex items-center gap-1 bg-[#3C6903aa] p-2 w-fit rounded-lg m-1"
                href="tel:+07 54 15 85 35"
              >
                <FiPhoneCall />
                <p>+07 54 15 85 35</p>
              </a>
              <a
                className="flex items-center gap-1 bg-[#3C6903aa] p-2 w-fit rounded-lg m-1"
                href="tel:+07 54 15 85 35"
              >
                <FiPhoneCall />
                <p>+04 87 66 92 67</p>
              </a>
            </div>
          </div>
        </div>

        <hr />
        <br />
        <h3>Trouvez-nous sur</h3>
        <br />
        <iframe
          title="google map"
          className="w-full h-[35vh] rounded-xl"
          src="https://maps.google.com/maps?q=17,%20Rue%20Antoine%20du%20Rafour%2042100%20Sanit-%C3%A9tienne&t=&z=15&ie=UTF8&iwloc=&output=embed"
        ></iframe>
        <br />
        <br />
        <form className="flex flex-col gap-4 ">
          <div className="md:flex justify-between  gap-2 ">
            <div className="flex flex-1 flex-col gap-1">
              <label>Nom</label>
              <input
                className="focus:text-xl rounded-md bg-[#cacaca]  transition-all duration-75 outline-none p-2 "
                type="text"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <label>Email</label>
              <input
                className="focus:text-xl rounded-md bg-[#cacaca]  transition-all duration-75 outline-none p-2 "
                type="text"
              />
            </div>
          </div>
          <div className=" flex flex-col gap-1">
            <label>Message</label>
            <textarea
              className=" focus:text-xl rounded-md min-h-[150px] bg-[#cacaca] transition-all duration-75 outline-none p-2 "
              minLength="10"
            ></textarea>
          </div>
          <div className="self-end text-white bg-[#1D2326] p-3 rounded-md">
            <input type="submit" value="Envoyer" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;

// <div className="flex gap-2 text-sm md:text-lg m-2">
//   <BiTime className="w-[50px] h-[50px]" />
//   <div className="flex flex-col items-start">
//     <p>Nous ouvrons</p>
//     <p>11 am - 14 am | 18 pm - 2 am</p>
//   </div>
// </div>;
