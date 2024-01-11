import { useState, useEffect } from "react";

const useGlobalPromotion = () => {
  const [promotionTotal, setPromotionTotal] = useState(0);
  const URI =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_SERVER_URI
      : process.env.REACT_APP_DEV_SERVER_URI;
  useEffect(() => {
    fetch(`${URI}/settings/api/globalPromotion`, {
      method: "GET",
      cors: "no-cors",
    })
      .then((res) => res.json())
      .then((data) => {
        setPromotionTotal(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return { promotionTotal };
};

export default useGlobalPromotion;
