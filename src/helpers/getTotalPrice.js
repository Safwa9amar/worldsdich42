import { calculeCoupon } from "./CalculeCoupon";

const getTotalPrice = (data) => {
  let spliceToCategories = data
    .map((el) => el.category)
    .filter((el, i, arr) => arr.indexOf(el) === i);
  let FinalData = spliceToCategories.map((el) => {
    let obj = {
      category: el,
      listItems: data
        .map((_el) => {
          if (_el.category === el) return _el;
        })
        .filter((el) => el !== undefined),
    };

    el = obj;
    return el;
  });

  let FinalTotal = [0];
  FinalData.map((el) => {
    let categorySum = el.listItems.map((el) => {
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

      // sum = cutting_off_status ? calculeCoupon(sum, cutting_off) : sum;
      return {
        sum,
        cutting_off,
        cutting_off_status,
      };
    });

    if (categorySum[0].cutting_off_status) {
      FinalTotal.push(
        calculeCoupon(
          categorySum.map((el) => el.sum).reduce((curr, next) => curr + next),
          categorySum[0].cutting_off
        )
      );
    } else {
      FinalTotal.push(
        categorySum.map((el) => el.sum).reduce((curr, next) => curr + next)
      );
    }
  });
  if (FinalTotal.length > 0)
    return FinalTotal.reduce((curr, next) => curr + next);
};

export default getTotalPrice;
