export const OZ_TO_TAEL = 1.20565;

export function convertSilverPrice(usdPerOz, exchangeRate) {
  const usdPerTael = usdPerOz * OZ_TO_TAEL;
  const vndPerTael = usdPerTael * exchangeRate;
  return vndPerTael;
}

export function calculateSpread(bidPrice, askPrice) {
  if (askPrice <= bidPrice) {
    return {
      error: "Ask price must be generally higher than Bid price depending on the context.",
    };
  }

  const spreadValue = askPrice - bidPrice;
  const spreadPercent = (spreadValue / askPrice) * 100;

  let status = "safe";
  if (spreadPercent > 5) {
    status = "high risk";
  }

  return {
    spreadValue,
    spreadPercent,
    status,
  };
}

export function calculateTotalProfit(transactions) {
  let totalProfit = 0;
  let totalCapital = 0;
  const results = [];

  transactions.forEach((trade, idx) => {
    const capital = trade.buy_price * trade.quantity;
    const revenue = trade.sell_price * trade.quantity;
    const profit = revenue - capital;

    totalCapital += capital;
    totalProfit += profit;
    
    results.push({
      index: idx + 1,
      profit,
    });
  });

  const roiPercent = totalCapital > 0 ? (totalProfit / totalCapital) * 100 : 0;
  
  return {
    totalProfit,
    roiPercent,
    results,
  };
}

export function compareInvestmentVsBank(capital, silverProfit, bankRateAnnual, months) {
  const bankProfit = capital * (bankRateAnnual / 100 / 12) * months;
  
  let conclusion = "";
  let diff = 0;
  
  if (silverProfit > bankProfit) {
    diff = silverProfit - bankProfit;
    conclusion = `Silver > Bank. Diff: +${diff.toLocaleString('en-US')} VND`;
  } else if (silverProfit < bankProfit) {
    diff = bankProfit - silverProfit;
    conclusion = `Bank > Silver. Diff: +${diff.toLocaleString('en-US')} VND`;
  } else {
    conclusion = "Equal performance.";
  }

  return {
    bankProfit,
    silverProfit,
    diff,
    conclusion
  };
}

export function calculateBreakEven(purchasePrice, bankRateAnnual, months) {
  const targetReturnPercent = (bankRateAnnual / 100 / 12) * months;
  const breakEvenPrice = purchasePrice * (1 + targetReturnPercent);
  const requiredGain = breakEvenPrice - purchasePrice;

  return {
    breakEvenPrice: Math.round(breakEvenPrice),
    requiredGain: Math.round(requiredGain),
    targetReturnPercent: (targetReturnPercent * 100).toFixed(2)
  };
}
