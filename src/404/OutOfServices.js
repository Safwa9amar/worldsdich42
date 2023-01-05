// import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // const error = useRouteError();
  // console.error(error);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-500 ">
      <div className="prose text-center">
        <h1>Oops! We apologize, dear visitor</h1>
        <h2> Visit us later</h2>
        <p className="text-red-400">We are now out of service</p>
        <p className="text-red-700">
          {/* <i>{error.statusText || error.message}</i> */}
        </p>
      </div>
    </div>
  );
}
