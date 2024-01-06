import { useState } from "react";

const usePaymentBill = (url, options) => {
  const [data, setData] = useState(null);
  const [Billloading, setBillLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPaymentBill = async (url, options) => {
    try {
      const response = await fetch(url, options);
      const result = await response.blob(); // assuming you want a blob response
      setData(result);
      console.log(result);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(result);
      link.download = "bill.pdf";
      link.click();
      window.URL.revokeObjectURL(link.href);
      link.remove();
    } catch (err) {
      setError(err);
    } finally {
      setBillLoading(false);
    }
  };
  const download = () => {
    fetchPaymentBill(url, options);
  };
  // create a link to blob

  return { data, Billloading, error, download };
};

export default usePaymentBill;
