// import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // const error = useRouteError();
  // console.error(error);

  return (
    <div className="flex justify-center items-center p-16">
      <div className="prose text-center">
        <h1>Oops! Nous nous excusons, cher visiteur</h1>
        <h2> Visitez-nous plus tard</h2>
        <p className="text-red-400">Nous sommes maintenant hors service</p>
        <p className="text-red-700">
          {/* <i>{error.statusText || error.message}</i> */}
        </p>
      </div>
    </div>
  );
}
