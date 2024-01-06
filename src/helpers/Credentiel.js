import React, { useState, useContext, useEffect } from "react";
import { Credentiel } from "../context/CredentielContext";
import { SERVER_URI } from "../helpers/UrlProvider";
import { motion } from "framer-motion";
export default function CredentielClient({
  setcheckBoxState,
  checkBoxState,
  setHeaderText,
  HeaderText,
}) {
  const CREDENTIEL_SERVER_URI = useContext(SERVER_URI);
  const { isloged, setiLoged, setUserData } = useContext(Credentiel);
  const [login, setlogin] = useState(true);
  const [regsitre, setRegsitre] = useState(false);

  const [password, setpassword] = useState();

  const [password_confirme, setpassword_confirme] = useState();
  const [checkPassConfirm, setcheckPassConfirm] = useState(true);
  const [codeStatus, setcodeStatus] = useState();

  const [Displaylogger, setDisplaylogger] = useState(true);
  const [RememberMe, setRememberMe] = useState(false);
  const [isAdressSelected, setisAdressSelected] = useState(false);

  const url = CREDENTIEL_SERVER_URI + "/registre";

  const handleSubmit = async (e) => {
    e.preventDefault();
    let form = e.target;
    if (login) {
      let login_form = new FormData(form);
      let object = {};
      login_form.forEach((value, key) => (object[key] = value));
      console.log(object);
      await fetch(url, {
        mode: "cors", // no-cors, *cors, same-origin

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      })
        .then((response) => {
          let code = response.status;
          setcodeStatus(code);
          setDisplaylogger(true);
          if (code === 200) {
            setTimeout(() => {
              setiLoged(true);
              setDisplaylogger(false);
              window.location.reload();
            }, 2000);
          }
          return response.json();
        })
        .then((data) => {
          if (isloged) setUserData(data.userData);
          if (RememberMe) {
            localStorage.setItem("jwt", data.access_token);
            localStorage.setItem("refrech", data.refresh_token);
          } else {
            sessionStorage.setItem("jwt", data.access_token);
            sessionStorage.setItem("refrech", data.refresh_token);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    if (regsitre) {
      if (password === password_confirme) {
        setcheckPassConfirm(true);
        let register_form = new FormData(form);

        let object = {};
        register_form.forEach((value, key) => (object[key] = value));
        // console.log(object);
        // return;
        await fetch(url, {
          mode: "cors", // no-cors, *cors, same-origin
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(object),
        })
          .then((response) => {
            console.log(response);

            let code = response.status;
            setcodeStatus(code);
            setDisplaylogger(true);
            if (code === 200) {
              setTimeout(() => {
                setiLoged(true);
                setDisplaylogger(false);
                window.location.reload();
              }, 2000);
            }
            return response.json();
          })
          .then((data) => {
            isloged && setUserData(data.userData);
            if (RememberMe) {
              localStorage.setItem("jwt", data.access_token);
              localStorage.setItem("refrech", data.refresh_token);
            } else {
              sessionStorage.setItem("jwt", data.access_token);
              sessionStorage.setItem("refrech", data.refresh_token);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        setcheckPassConfirm(false);
      }
    }
  };
  const handleClick = (e) => {
    let type = e.target.name;
    setDisplaylogger(false);
    if (type === "login") {
      setlogin(true);
      setRegsitre(false);
    }
    if (type === "registre") {
      setlogin(false);
      setRegsitre(true);
      setHeaderText("Créer un nouveau compte");
    }
  };
  // fetsh `${CREDENTIEL_SERVER_URI}/settings/api/livraison_adresses` when component mount
  const [livraison_adresses, setlivraison_adresses] = useState([]);
  useEffect(() => {
    // fetch(`${CREDENTIEL_SERVER_URI}/settings/api/livraison_adresses`, {
    fetch(`https://api.stripe.com/v1/shipping_rates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer sk_test_51NIB1DG5waCNLkzT7xtBN724M9XSxDD83ZktBJT2IXVo3OaP7FKH0mE5TbY2868iFlwG7O0BG5gOGHq3rMol9Emu00lT3iNh8n`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setlivraison_adresses(data.data.filter((el) => el.active === true));
      });
  }, [CREDENTIEL_SERVER_URI]);

  return (
    <>
      <div className="p-5">
        <div className="relative">
          <div className="form-control">
            {Displaylogger && (
              <p
                onClick={() => {
                  setDisplaylogger(false);
                }}
                className={`alert ${
                  codeStatus === 200
                    ? "alert-success"
                    : codeStatus === 401
                    ? "alert-error"
                    : codeStatus === 302
                    ? ""
                    : codeStatus === 306
                    ? "alert-warning"
                    : codeStatus === 300
                    ? "alert-warning"
                    : "hidden"
                }`}
              >
                {codeStatus === 200 ? (
                  "Connexion réussie"
                ) : codeStatus === 401 ? (
                  "mot de passe incorrect réessayez"
                ) : codeStatus === 302 ? (
                  <button name="registre" onClick={handleClick}>
                    Il n'y a pas d'utilisateur avec ce nom, inscrivez-vous ici
                  </button>
                ) : codeStatus === 306 ? (
                  "Le nom d'utilisateur existe déjà Veuillez en choisir un autre"
                ) : codeStatus === 300 ? (
                  <>
                    Email ou téléphone est déjà utilisé,
                    <a href="#mymodel" className="text-primary">
                      Cliquez ici pour Récupérer votre mot de passe
                    </a>
                  </>
                ) : (
                  "hidden"
                )}
              </p>
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
          {regsitre && (
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
                      onChange={(e) => {
                        setisAdressSelected(true);
                      }}
                      required
                      name="adress"
                      type="adress"
                      className="input input-bordered"
                    >
                      <option />
                      {livraison_adresses.map((livraison_adresse) => (
                        <option value={livraison_adresse.id}>
                          {livraison_adresse.display_name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                {isAdressSelected && (
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
                          placeholder="Eg : 17, Rue Antoine du Rafour 42100 Saint-étienne"
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
                        setpassword(e.target.value);
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
                        setpassword_confirme(e.target.value);
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
                    regsitre ? "tab-active" : ""
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
