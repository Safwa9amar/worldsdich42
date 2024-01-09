import React, { useState, useEffect, useRef } from "react";
// import { Credentiel } from "../context/CredentielContext";
import { motion } from "framer-motion";
import useShippingRate from "../hooks/useShipingRate";
export default function CredentielClient({
  setHeaderText,
  setIsLogged,
  setLoginData,
  userData,
}) {
  const CREDENTIEL_SERVER_URI =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_SERVER_URI
      : process.env.REACT_APP_DEV_SERVER_URI;

  // Destructuring values from context
  const alertRef = useRef(null);
  // State variables
  const [login, setLogin] = useState(true);
  const [register, setRegister] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState(""); // Corrected variable name
  const [checkPassConfirm, setCheckPassConfirm] = useState(true);
  const [registerRes, setRegisterRes] = useState({
    codeStatus: 0,
    msg: "",
  });
  const [displayLogger, setDisplayLogger] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [isAddressSelected, setIsAddressSelected] = useState(false); // Corrected variable name
  const url = `${CREDENTIEL_SERVER_URI}/registre`;
  const { shippingRates } = useShippingRate(); // Assuming useShippingRate returns shippingRates
  const [data, setData] = useState(null);
  const [responsCode, setResponsCode] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const object = {};

    formData.forEach((value, key) => (object[key] = value));

    try {
      // Check if passwords match for registration
      if (!login && password !== passwordConfirm) {
        console.log(login, password, passwordConfirm);
        setCheckPassConfirm(false);
        return;
      }

      fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      })
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            setIsLogged(true);
            setLoginData(res.json());
            if (rememberMe) {
              localStorage.setItem("refrech", data.refresh_token);
            } else {
              sessionStorage.setItem("refrech", data.refresh_token);
            }
          } else {
            setResponsCode(res.status);
            return res.json();
          }
        })
        .then((err) => {
          setData(err);
          setDisplayLogger(true);
        });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    if (data) {
      console.log(data);
      setRegisterRes({
        codeStatus: responsCode,
        msg: data.message,
      });
    }
  }, [data, responsCode]);

  const handleClick = (e) => {
    const type = e.target.name;
    setDisplayLogger(false);

    if (type === "login") {
      setLogin(true);
      setRegister(false);
    }

    if (type === "registre") {
      setLogin(false);
      setRegister(true);
      setHeaderText("Créer un nouveau compte");
    }
  };

  return (
    <>
      <div className="p-5">
        <div className="relative">
          <div className="form-control">
            {displayLogger && (
              <button
                ref={alertRef}
                onClick={() => {
                  setDisplayLogger(false);
                }}
                className={`alert ${
                  registerRes.codeStatus === 200
                    ? "alert-success"
                    : registerRes.codeStatus === 401
                    ? "alert-error"
                    : registerRes.codeStatus === 302
                    ? ""
                    : registerRes.codeStatus === 306
                    ? "alert-warning"
                    : registerRes.codeStatus === 300
                    ? "alert-warning"
                    : "hidden"
                }`}
              >
                {registerRes.codeStatus === 200 ? (
                  "Connexion réussie"
                ) : registerRes.codeStatus === 401 ? (
                  "mot de passe incorrect réessayez"
                ) : registerRes.codeStatus === 302 ? (
                  <button name="registre" onClick={handleClick}>
                    Il n'y a pas d'utilisateur avec ce nom, inscrivez-vous ici
                  </button>
                ) : registerRes.codeStatus === 306 ? (
                  "Le nom d'utilisateur existe déjà Veuillez en choisir un autre"
                ) : registerRes.codeStatus === 300 ? (
                  <>
                    {registerRes.msg}
                    <a href="#mymodel" className="text-primary">
                      Cliquez ici pour Récupérer votre mot de passe
                    </a>
                  </>
                ) : (
                  "hidden"
                )}
              </button>
            )}
          </div>

          <br />
          {login && (
            <form onSubmit={handleSubmit}>
              {/* <p className="text-lg md:text-2xl">{HeaderText}</p> */}

              <div className="my-2 flex flex-col gap-4">
                <div className="form-control">
                  <label className="input-group input-group-vertical">
                    <span>Email | Username</span>
                    <input
                      autoFocus
                      required
                      id="username"
                      name="username"
                      type="text"
                      placeholder="info@site.com"
                      className="input input-bordered"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="input-group input-group-vertical">
                    <span>Mot de passe</span>
                    <input
                      required
                      name="password"
                      type="password"
                      placeholder="*******"
                      className="input input-bordered"
                    />
                  </label>
                </div>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-4 justify-start">
                  <input
                    onChange={() => setRememberMe(true)}
                    type="checkbox"
                    className="checkbox"
                  />
                  <span className="label-text">Rester se connecter</span>
                </label>
              </div>
              <button className="btn btn-outline btn-success my-4">
                submit
              </button>
              <br />
              <div>
                Vous n'avez pas de compte ?{" "}
                <button
                  onClick={handleClick}
                  name="registre"
                  className={`text-warning tab tab-lifted  ${
                    login ? "tab-active" : ""
                  }`}
                >
                  Cliquez ici pour enregistrer votre compte
                </button>
              </div>
            </form>
          )}
          {/* login */}
          {/* sign up */}
          {register && (
            <form onSubmit={handleSubmit}>
              {/* <p className="text-lg md:text-2xl">{HeaderText}</p> */}
              <div className="flex flex-col gap-4 mt-4">
                {/* <div className="  w-full "> */}
                <div className="form-control">
                  <label className="input-group input-group-vertical">
                    <span>Nom</span>
                    <input
                      autoFocus
                      required
                      name="nom"
                      type="text"
                      placeholder="nom"
                      className="input input-bordered"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="input-group input-group-vertical">
                    <span>Prénom</span>
                    <input
                      required
                      name="Prenom"
                      type="text"
                      placeholder="Prénom"
                      className="input input-bordered"
                    />
                  </label>
                </div>
                {/* </div> */}
                <div className="form-control">
                  <label className="input-group input-group-vertical">
                    <span>Télephone</span>
                    <input
                      required
                      name="tel"
                      type="tel"
                      placeholder="tel"
                      className="input input-bordered"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="input-group input-group-vertical">
                    <span>CP , Ville , Quartier</span>

                    <select
                      required
                      name="adress"
                      type="adress"
                      className="input input-bordered"
                      onChange={(e) => {
                        if (e.target.value === "") {
                          setIsAddressSelected(false);
                        } else {
                          setIsAddressSelected(true);
                        }
                      }}
                    >
                      <option />
                      {shippingRates.map((livraison_adresse) => (
                        <option value={livraison_adresse.id}>
                          {livraison_adresse.display_name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                {isAddressSelected && (
                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: [0.5, 0.7, 0.9, 1],
                      translateY: ["10px", "0px"],
                    }}
                    className="flex flex-col gap-4 "
                  >
                    <div className="form-control">
                      <label className="input-group input-group-vertical">
                        <span>Adresse exact </span>
                        <input
                          required
                          name="adresse_exct"
                          type="text"
                          placeholder="Eg : 17, Rue Antoine drafour 42100 Saint-étienne"
                          className="input input-bordered"
                        />
                      </label>
                    </div>

                    <div className="grid md:grid-cols-2  grid-flow-dense items-center gap-4">
                      <label className="input-group ">
                        <span className="capitalize">Bâtiment</span>
                        <input
                          required
                          name="batiment"
                          type="text"
                          className="input input-bordered"
                        />
                      </label>
                      <label className="input-group">
                        <span className="capitalize">étage</span>
                        <input
                          required
                          name="etage"
                          type="text"
                          className="input input-bordered"
                        />
                      </label>
                      <label className="input-group ">
                        <span className="capitalize">Sonnette</span>
                        <select
                          name="sonnette"
                          className="select select-bordered "
                          required
                          defaultValue={"non"}
                        >
                          <option value="oui">Oui</option>
                          <option value="non">Non</option>
                        </select>
                      </label>
                      <label className="input-group">
                        <span className="capitalize">code</span>
                        <input
                          required
                          name="code"
                          type="text"
                          className="input input-bordered"
                        />
                      </label>
                    </div>
                  </motion.div>
                )}

                <div className="form-control">
                  <label className="input-group input-group-vertical">
                    <span>Email</span>
                    <input
                      required
                      name="email"
                      type="text"
                      placeholder="youremil@email.com"
                      className="input input-bordered"
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="input-group input-group-vertical">
                    <span>Nom d'utilisateur</span>
                    <input
                      required
                      name="username"
                      type="text"
                      placeholder="username"
                      className="input input-bordered"
                    />
                  </label>
                </div>
                <div className="form-control ">
                  <label className="input-group input-group-vertical">
                    <span>Mot de passe</span>
                    <input
                      required
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      name="password"
                      type="password"
                      placeholder="Mot de passe"
                      className="input input-bordered "
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="input-group input-group-vertical">
                    <span>confirmer Mot de passe</span>
                    <input
                      required
                      onChange={(e) => {
                        setPasswordConfirm(e.target.value);
                      }}
                      name="password_confirme"
                      type="password"
                      placeholder="confirmer"
                      className="input input-bordered"
                    />
                  </label>
                </div>
                <p
                  className={`text-center text-error ${
                    checkPassConfirm ? "invisible" : "visible"
                  }`}
                >
                  Le mot de passe ne correspond pas, veuillez vérifier
                </p>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer flex gap-4 justify-start">
                  <input
                    onChange={() => setRememberMe(true)}
                    type="checkbox"
                    className="checkbox"
                  />
                  <span className="label-text">Rester se connecter</span>
                </label>
              </div>
              <button className="btn btn-outline btn-success my-4">
                Créer
              </button>
              <br />
              <div>
                Avez-vous un compte?{" "}
                <button
                  onClick={handleClick}
                  name="login"
                  className={`text-warning tab tab-lifted  ${
                    register ? "tab-active" : ""
                  }`}
                >
                  Cliquez ici pour vous identifier
                </button>
              </div>
            </form>
          )}

          {/* sign up */}
        </div>
      </div>
    </>
  );
}
