import { useState, useEffect, useMemo } from "react";
import useCommandTypes from "../hooks/useCommandTypes";
import useGlobalPromotion from "../hooks/useGlobalPromotion.JS";

const CommandTypes = (Mycontext) => {
  const [isPlace, setPlace] = useState(false);
  const [isEmporter, setEmporter] = useState(false);
  const [isDelivery, setDelivery] = useState(false);
  const [GetTotalPrice, setGetTotalPrice] = useState(0);
  const commandTypesStatus = useCommandTypes();
  const { promotionTotal } = useGlobalPromotion();

  const SelectedDamandeType = useMemo(() => {
    return [
      { id: 1, type: "sur place", bol: isPlace },
      { id: 2, type: "à Emporter", bol: isEmporter },
      { id: 3, type: "En livraison", bol: isDelivery },
    ];
  }, []);

  const setCommandType = (place, emporter, delivery) => {
    setPlace(place);
    setEmporter(emporter);
    setDelivery(delivery);
  };

  const getTotalPrice = (data) => {
    // ... (your existing getTotalPrice logic)
  };

  useEffect(() => {
    localStorage.setItem(
      "DamandeType",
      JSON.stringify(SelectedDamandeType.find((el) => el.bol)?.id)
    );
  }, [SelectedDamandeType]);

  useEffect(() => {
    setGetTotalPrice(getTotalPrice(Mycontext));
  }, [Mycontext]);

  return {
    setCommandType,
    commandTypesStatus,
    promotionTotal,
    SelectedDamandeType,
    GetTotalPrice,
    isPlace,
    isEmporter,
    isDelivery,
  };
};

export default CommandTypes;
