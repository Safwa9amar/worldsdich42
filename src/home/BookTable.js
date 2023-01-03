import React, {  useRef } from "react";
import Map from "../helpers/Map";

export default function BookTable() {
  const ref = useRef(null);
  const handleSubmit = (e) => {
    const formData = new FormData(ref.current);
    const formProps = Object.fromEntries(formData);

    console.log(formProps);
    e.preventDefault();
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
              name="nom"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              placeholder="Numéro de tel"
              className="input input-bordered"
              name="tel"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="email"
              placeholder="Votre Email"
              className="input input-bordered"
              name="mail"
              required
            />
          </div>
          <div className="form-control">
            <select className="input input-bordered" name="personNum" required>
              <option value="0">chose</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="form-control">
            <input type="date" name="date" className="input input-bordered" />
          </div>
          <div className="form-control items-start self-start">
            <input
              required
              type="submit"
              value="Réserver "
              className="btn btn-sm md:btn-md btn-accent hover:bg-accent rounded-3xl text-white"
            />
          </div>
        </form>

        <Map />
      </div>
    </section>
  );
}
