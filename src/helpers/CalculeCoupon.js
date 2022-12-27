// generate a caclulator hook for a given price  with a given percentage (e.g. 10)
// //
export const calculeCoupon = (price, percentage) => {
  const calcule = price - (price * percentage) / 100;
  return calcule;
};

