import React from "react";

export default function Map({tailcss}) {
  return (
    <iframe
      title="google map"
      className={`rounded-xl w-full ${tailcss}`}
      src="https://maps.google.com/maps?q=17,%20Rue%20Antoine%20du%20Rafour%2042100%20Sanit-%C3%A9tienne&t=&z=15&ie=UTF8&iwloc=&output=embed"
    ></iframe>
  );
}
