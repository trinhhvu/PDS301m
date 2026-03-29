export const priceHistory = [30.5, 31.2, 29.8, 30.1, 31.5, 32.0, 31.8, 31.9];

export const silverTypes = {
  "Silver 999 (Pure)": { purity: 99.9, price_per_tael: 1200000 },
  "Silver 925 (Jewelry)": { purity: 92.5, price_per_tael: 1050000 },
  "Silver Coins (Intl)": { purity: 99.9, price_per_tael: 1250000 }
};

export const highVolDaysUp = new Set(["02/12", "02/15", "02/18"]); 
export const highVolDaysDown = new Set(["02/14", "02/18", "02/20"]);

export const getTwoWayVolDays = () => {
  return new Set([...highVolDaysUp].filter(x => highVolDaysDown.has(x)));
};

export const getAllVolDays = () => {
  return new Set([...highVolDaysUp, ...highVolDaysDown]);
};

export const CONVERSION_RATES = Object.freeze([1.20565, 31.1034768]);

export const HISTORICAL_HIGHS = Object.freeze([
  [1980, 49.45],
  [2011, 49.51]
]);
