import React, { useState, useContext } from "react";
import { Credentiel } from "../context/CredentielContext";

export default function CredentielModel({ setcheckBoxState, checkBoxState }) {
  const { isloged, setiLoged, setUserData } = useContext(Credentiel);
  const [login, setlogin] = useState(true);
  const [regsitre, setRegsitre] = useState(false);

  const [password, setpassword] = useState();

  const [password_confirme, setpassword_confirme] = useState();
  const [checkPassConfirm, setcheckPassConfirm] = useState(true);
  const [codeStatus, setcodeStatus] = useState();

  const [Displaylogger, setDisplaylogger] = useState(true);
  const url = "https://myworlddwich.herokuapp.com//registre";
  const handleSubmit = async (e) => {
    e.preventDefault();
    let form = e.target;
    if (login) {
      let login_form = new FormData(form);
      let object = {};
      login_form.forEach((value, key) => (object[key] = value));
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
            }, 2000);
          }
          return response.json();
        })
        .then((data) => {
          isloged && setUserData(data.userData);
          localStorage.setItem("jwt", data.access_token);
          localStorage.setItem("refrech", data.refresh_token);
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
              }, 2000);
            }
            return response.json();
          })
          .then((data) => {
            isloged && setUserData(data.userData);

            localStorage.setItem("jwt", data.access_token);
            localStorage.setItem("refrech", data.refresh_token);
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
    }
  };

  return (
    <>
      {!isloged && (
        <>
          <input
            checked={checkBoxState}
            readOnly
            type="checkbox"
            id="loginModel"
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box relative">
              <label
                onClick={() => {
                  setcheckBoxState(false);
                }}
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>

              <div className="tabs">
                <button
                  onClick={handleClick}
                  name="login"
                  className={`tab tab-lifted  ${login ? "tab-active" : ""}`}
                >
                  connexion{" "}
                </button>
                <button
                  onClick={handleClick}
                  name="registre"
                  className={`tab tab-lifted  ${regsitre ? "tab-active" : ""}`}
                >
                  créer un compte
                </button>
              </div>
              {/* login */}
              {login && (
                <form onSubmit={handleSubmit}>
                  <div className="my-2 flex flex-col gap-4">
                    <div className="form-control">
                      <label className="input-group input-group-vertical">
                        <span>Email | Username</span>
                        <input
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

                  <button className="btn btn-outline btn-success my-4">
                    submit
                  </button>
                </form>
              )}
              {/* login */}
              {/* sign up */}
              {regsitre && (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex flex-col lg:flex-row gap-2 w-full justify-between">
                      <div className="form-control">
                        <label className="input-group input-group-vertical">
                          <span>Nom</span>
                          <input
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
                    </div>
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
                        <span>adresse</span>
                        <input
                          required
                          name="adress"
                          type="adress"
                          placeholder="ex : 17, Rue Antoine du Rafour 42100 Sanit-étienne"
                          className="input input-bordered"
                        />
                      </label>
                    </div>
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

                  <button className="btn btn-outline btn-success my-4">
                    Créer
                  </button>
                </form>
              )}
              {/* sign up */}
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
          </div>
        </>
      )}
    </>
  );
}
