import React, { createContext, useState, useEffect, useCallback } from "react";

export const SupplementContext = createContext();

const SupplementContextProvider = ({ children }) => {
  const SUPP_SERVER_URI = process.env.REACT_APP_SERVER_URI;
  const [supplements, setSupplements] = useState([]);

  const fetchSupplementData = useCallback(async () => {
    try {
      const response = await fetch(`${SUPP_SERVER_URI}/getSuppdata`);
      const { itemSuppData, suppData } = await response.json();

      const finalData = suppData.map((el) => {
        const new_item_supplement = itemSuppData.filter((item) =>
          el.item_supplement.includes(item.id)
        );
        el.item_supplement = new_item_supplement;
        return el;
      });

      setSupplements(finalData);
    } catch (error) {
      console.error("Error fetching supplement data:", error);
    }
  }, [SUPP_SERVER_URI]);

  useEffect(() => {
    fetchSupplementData();
  }, [fetchSupplementData]);

  return (
    <SupplementContext.Provider value={supplements}>
      {children}
    </SupplementContext.Provider>
  );
};

export default SupplementContextProvider;
