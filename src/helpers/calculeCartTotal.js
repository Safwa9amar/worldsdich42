function calcule_with_cutting_off (data, cutting_off) {
  let total = 0
  for (let i = 0; i < data.length; i++) {
    if (data[i] > cutting_off) {
      total += cutting_off
    } else {
      total += data[i]
    }
  }
  return total
}



    // cacul total with cutting off
    with_cutting_off = with_cutting_off.map((el) => {
        let [price, amount, isMenu, supp, cutting_off, cutting_off_status] = [
          Math.abs(el.prix),
          el.amount,
          el.isMenu,
          el.supplement !== null && el.supplement.length > 0
            ? el.supplement
                .map((el) => el.price)
                .reduce((curr, next) => curr + next)
            : [],
          el.cutting_off,
          el.cutting_off_status,
        ];
        let sum = isMenu ? (price + 2 + supp) * amount : (price + supp) * amount;
        return el;
      }).reduce((curr, next) => curr + next);
      // cacul total without cutting off
      