import React, { useRef, useContext, useState } from "react";
import Map from "../helpers/Map";
// import server url
import { SERVER_URI } from "./../helpers/UrlProvider";

export default function BookTable() {
  const url = useContext(SERVER_URI);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const ref = useRef(null);
  const handleSubmit = (e) => {
    setLoader(true);
    e.preventDefault();
    const formData = new FormData(ref.current);
    const formProps = Object.fromEntries(formData);
    fetch(`${url}/bookings`, {
      method: "POST",
      cors: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formProps),
    }).then((res) => {
      if (res.status === 200) {
        setMessage("Votre réservation a été effectuée avec succès");
        setTimeout(() => {
          setLoader(false);
        }, 2000);
      }
      return res.json();
    });
  };

  return (
    <section className="w-full flex flex-col gap-10 items-center ">
      <h1 className="font-DancingScript font-bold text-3xl md:text-6xl capitalize">
        Réserver une table
      </h1>
      <div className="w-4/5 flex flex-col lg:flex-row  justify-around gap-4">
        <form
          ref={ref}
          className="w-full flex flex-col gap-4 md:gap-10"
          onSubmit={handleSubmit}
        >
          <div className="form-control">
            <input
              type="text"
              placeholder="Votre Nom"
              className="input input-bordered"
              name="name"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              placeholder="Numéro de tel"
              className="input input-bordered"
              name="phone"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="email"
              placeholder="Votre Email"
              className="input input-bordered"
              name="email"
              required
            />
          </div>
          <div className="form-control">
            <select className="input input-bordered" name="people" required>
              <option value="0">Nombre de personne ?</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="form-control">
            <input type="date" name="date" className="input input-bordered" />
          </div>

          <div className="form-control">
            {message && <p className="text-success">{message}</p>}
          </div>

          {loader ? (
            <div className="form-control items-start self-start">
              <button className="btn btn-sm md:btn-md btn-accent hover:bg-accent rounded-3xl text-white loading">
                Réservation en cours
              </button>
            </div>
          ) : (
            !message && <div className="form-control items-start self-start">
              <input
                required
                type="submit"
                value="Réserver "
                className="btn btn-sm md:btn-md btn-accent hover:bg-accent rounded-3xl text-white"
              />
            </div>
          )}
        </form>
        <Map tailcss={"hidden sm:block"}/>
      </div>
    </section>
  );
}
