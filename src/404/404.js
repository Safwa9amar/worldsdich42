import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  // console.error(error);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-700 ">
      <div className="prose text-center">
        <h1>404</h1>
        <h2>Oops! you are try to access a page not existe</h2>
        <p className="text-red-400">Sorry, an unexpected error has occurred.</p>
        <p className="text-red-700">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
