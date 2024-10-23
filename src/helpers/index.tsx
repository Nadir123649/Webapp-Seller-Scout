import { makeStyles } from "@mui/styles";
import { profitCalculate } from "../Service/services";

export const cmToInches = (cm: any) => {
  return (cm / 2.54)?.toFixed(2);
};

export const ouncesToGrams = (ounces: any) => {
  return (ounces * 28.3495)?.toFixed(2);
};

//   const transformedObj = {};

//   for (const key in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, key)) {
//       const transformedKey = key
//         // Replace underscores with spaces and capitalize each word
//         .replace(/_/g, " ")
//         .replace(/\b\w/g, (char) => char.toUpperCase());

//       transformedObj[transformedKey] = obj[key];
//     }
//   }

//   return transformedObj;
// };
export const transformKeys = (obj: Record<string, any>) => {
  const transformedObj: { [key: string]: any } = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const transformedKey = key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      transformedObj[transformedKey] = obj[key];
    }
  }

  return transformedObj;
};

export const calculateTotalFees = (obj: any): number => {
  let sum = 0;

  for (const key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      key !== "closingFee"
    ) {
      const value = obj[key];

      if (typeof value === "number") {
        sum += value;
      }
    }
  }
  return parseFloat(sum.toFixed(2));
};

const getRoiDisplay = (roi: number): string | number => {
  if (roi === Infinity) {
    return "∞";
  }
  return roi?.toLocaleString();
};

export const handleSaleValue = (obj: any, type: any) => {
  const updatedObj = { ...obj };

  if (type === "quickInfo") {
    if (obj.quickInfo) {
      updatedObj.quickInfo = {
        ...obj.quickInfo,
        salePrice: updatedObj.quickInfo.salePrice,
        maxCost: Number(
          (
            updatedObj.quickInfo.salePrice -
            updatedObj.quickInfo.costPrice -
            calculateTotalFees(updatedObj?.profitCalculator?.totalFees) +
            updatedObj.quickInfo.costPrice
          )?.toFixed(2)
        )?.toLocaleString(),
      };
    }
    if (obj.profitCalculator) {
      updatedObj.profitCalculator = {
        ...obj.profitCalculator,
        salePrice: updatedObj.quickInfo.salePrice,
        maxCost: Number(
          (
            updatedObj.quickInfo.salePrice -
            updatedObj.quickInfo.costPrice -
            calculateTotalFees(updatedObj?.profitCalculator?.totalFees) +
            updatedObj.quickInfo.costPrice
          )?.toFixed(2)
        )?.toLocaleString(),
      };
    }
  }
  if (type === "profitCalculator") {
    if (obj.quickInfo) {
      updatedObj.quickInfo = {
        ...obj.quickInfo,
        salePrice: updatedObj.profitCalculator.salePrice,
        maxCost: Number(
          (
            updatedObj.quickInfo.salePrice -
            updatedObj.quickInfo.costPrice -
            calculateTotalFees(updatedObj?.profitCalculator?.totalFees) +
            updatedObj.quickInfo.costPrice
          )?.toFixed(2)
        )?.toLocaleString(),
      };
    }
    if (obj.profitCalculator) {
      updatedObj.profitCalculator = {
        ...obj.profitCalculator,
        salePrice: updatedObj.profitCalculator.salePrice,
        maxCost: Number(
          (
            updatedObj.quickInfo.salePrice -
            updatedObj.quickInfo.costPrice -
            calculateTotalFees(updatedObj?.profitCalculator?.totalFees) +
            updatedObj.quickInfo.costPrice
          )?.toFixed(2)
        )?.toLocaleString(),
      };
    }
  }

  return updatedObj;
};

export const handleMaxCost = (obj: any, type: any) => {
  const updatedObj = { ...obj };

  if (type === "quickInfo") {
    if (obj.quickInfo) {
      updatedObj.quickInfo = {
        ...obj.quickInfo,
        costPrice: Number(updatedObj.quickInfo.maxCost),
      };
    }
    if (obj.profitCalculator) {
      updatedObj.profitCalculator = {
        ...obj.profitCalculator,
        costPrice: Number(updatedObj.quickInfo.maxCost),
      };
    }
  }
  if (type === "profitCalculator") {
    if (obj.quickInfo) {
      updatedObj.quickInfo = {
        ...obj.quickInfo,
        costPrice: Number(updatedObj.profitCalculator.maxCost),
      };
    }
    if (obj.profitCalculator) {
      updatedObj.profitCalculator = {
        ...obj.profitCalculator,
        costPrice: Number(updatedObj.profitCalculator.maxCost),
      };
    }
  }
  return updatedObj;
};
export const handleValues = (obj: any, type: any, totalDiscount: any) => {
  const updatedObj = { ...obj };
  const applyDiscount = (value: number, discount: any) => {
    let discountAmount = discount == null || isNaN(discount) ? 0 : discount;
    const discountValue = value + discountAmount;

    return discountValue;
  };
  if (type === "quickInfo") {
    const discount =
      (updatedObj?.quickInfo?.costPrice * parseFloat(totalDiscount)) / 100;

    const profit = applyDiscount(
      Number(
        (
          updatedObj.quickInfo.salePrice -
          updatedObj.quickInfo.costPrice -
          calculateTotalFees(updatedObj?.profitCalculator?.totalFees)
        )?.toFixed(2)
      ),
      discount
    );
    const roi = ((profit / updatedObj.quickInfo.costPrice) * 100)?.toFixed(2);

    const roiNumber = applyDiscount(parseFloat(roi), discount);

    if (obj.quickInfo) {
      updatedObj.quickInfo = {
        ...obj.quickInfo,
        salePrice: updatedObj.quickInfo.salePrice,
        costPrice: updatedObj.quickInfo.costPrice,
        profit: profit?.toLocaleString(),
        profitPercentage: Number(
          ((profit / updatedObj.quickInfo.salePrice) * 100)?.toFixed(2)
        )?.toLocaleString(),
        roi: getRoiDisplay(roiNumber),
        breakeven: applyDiscount(
          Number(
            (
              updatedObj.quickInfo.costPrice +
              calculateTotalFees(updatedObj?.profitCalculator?.totalFees)
            )?.toFixed(2)
          ),
          discount
        )?.toLocaleString(),
        // maxCost: Number(
        //   updatedObj.quickInfo.costPrice == "0" && totalDiscount > 0
        //     ? profit + (profit * totalDiscount) / 100
        //     : profit?.toFixed(2)
        // )?.toLocaleString(),
      };
    }
    if (obj.profitCalculator) {
      updatedObj.profitCalculator = {
        ...obj.profitCalculator,
        salePrice: updatedObj.quickInfo.salePrice,
        costPrice: updatedObj.quickInfo.costPrice,
        profit: profit?.toLocaleString(),
        profitMargin: Number(
          ((profit / updatedObj.quickInfo.salePrice) * 100)?.toFixed(2)
        )?.toLocaleString(),
        roi: getRoiDisplay(roiNumber),
        breakevenSalePrice: applyDiscount(
          Number(
            (
              updatedObj.quickInfo.costPrice +
              calculateTotalFees(updatedObj?.profitCalculator?.totalFees)
            )?.toFixed(2)
          ),
          discount
        )?.toLocaleString(),
        // maxCost: Number(
        //   updatedObj.quickInfo.costPrice == "0" && totalDiscount > 0
        //     ? (profit * discount) / 100
        //     : profit?.toFixed(2)
        // )?.toLocaleString(),
      };
    }
  }
  if (type === "profitCalculator") {
    const discount =
      (updatedObj?.profitCalculator?.costPrice * parseFloat(totalDiscount)) /
      100;

    const profit = applyDiscount(
      Number(
        (
          obj.profitCalculator.salePrice -
          obj.profitCalculator.costPrice -
          calculateTotalFees(obj?.profitCalculator?.totalFees)
        )?.toFixed(2)
      ),
      discount
    );
    const roi = ((profit / obj.profitCalculator.costPrice) * 100)?.toFixed(2);
    const roiNumber = applyDiscount(parseFloat(roi), discount);

    if (obj.quickInfo) {
      updatedObj.quickInfo = {
        ...obj.quickInfo,
        salePrice: updatedObj.profitCalculator.salePrice,
        costPrice: updatedObj.profitCalculator.costPrice,
        profit: profit?.toLocaleString(),
        profitPercentage: Number(
          ((profit / updatedObj.profitCalculator.salePrice) * 100)?.toFixed(2)
        )?.toLocaleString(),

        roi: getRoiDisplay(roiNumber),

        breakeven: applyDiscount(
          Number(
            (
              updatedObj.profitCalculator.costPrice +
              calculateTotalFees(updatedObj?.profitCalculator?.totalFees)
            )?.toFixed(2)
          ),
          discount
        )?.toLocaleString(),
        // maxCost: Number(
        //   updatedObj.quickInfo.costPrice == "0" && totalDiscount > 0
        //     ? profit + (profit * totalDiscount) / 100
        //     : profit?.toFixed(2)
        // )?.toLocaleString(),
      };
    }
    if (obj.profitCalculator) {
      updatedObj.profitCalculator = {
        ...obj.profitCalculator,
        salePrice: updatedObj.profitCalculator.salePrice,
        costPrice: updatedObj.profitCalculator.costPrice,
        profit: profit?.toLocaleString(),

        profitMargin: Number(
          (
            ((updatedObj.profitCalculator.salePrice -
              updatedObj.profitCalculator.costPrice -
              calculateTotalFees(updatedObj?.profitCalculator?.totalFees)) /
              updatedObj.profitCalculator.salePrice) *
            100
          )?.toFixed(2)
        )?.toLocaleString(),
        roi: getRoiDisplay(roiNumber),
        breakevenSalePrice: applyDiscount(
          Number(
            (
              updatedObj.profitCalculator.costPrice +
              calculateTotalFees(updatedObj?.profitCalculator?.totalFees)
            )?.toFixed(2)
          ),
          discount
        )?.toLocaleString(),
        // maxCost: Number(
        //   updatedObj.profitCalculator.costPrice == "0" && totalDiscount > 0
        //     ? profit + (profit * totalDiscount) / 100
        //     : profit?.toFixed(2)
        // )?.toLocaleString(),
      };
    }
  }

  return updatedObj;
};

const calculateProfit = async (productDetails: any, offer: any) => {
  const data =
    productDetails?.profitCalculator?.fulfilmentType === "FBA"
      ? {
          asin: productDetails?.productDetails?.asin,
          cost: productDetails?.profitCalculator?.costPrice,
          price: offer?.price,
          fulfillmentMethod: 0,
        }
      : {
          asin: productDetails?.productDetails?.asin,
          cost: productDetails?.profitCalculator?.costPrice,
          price: offer?.price,
          fulfillmentMethod: 1,
          fbmCost: productDetails?.profitCalculator?.FBMCost
            ? productDetails?.profitCalculator?.FBMCost
            : 0,
        };

  if (productDetails?.profitCalculator) {
    try {
      const response = await profitCalculate(data);

      if (response?.status === 200) {
        if (response?.data?.totalFees) {
          return calculateTotalFees(response.data.totalFees);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
  return 0; // Return 0 if there's an error or missing data
};

export const handleOfferValues = async (
  offers: any,
  productDetails: any,
  type: any
) => {
  if (
    !offers ||
    typeof offers !== "object" ||
    !Array.isArray(offers.selleroffer)
  ) {
    return offers;
  }

  const updatedSelleroffer = await Promise.all(
    offers.selleroffer.map(async (offer: any) => {
      let costPrice;
      if (type === "quickInfo") {
        costPrice = productDetails?.quickInfo?.costPrice;
      } else {
        costPrice = productDetails?.profitCalculator?.costPrice;
      }
      const numericCostPrice =
        typeof costPrice === "number" ? costPrice : parseFloat(costPrice);

      const price = offer?.price;
      const numericPrice =
        typeof price === "number" ? price : parseFloat(price);

      const totalFees = await calculateProfit(productDetails, offer);

      if (isNaN(numericCostPrice) || isNaN(numericPrice)) {
        console.error("Invalid cost price or price.");
        return offer; // Return original offer if price or cost price is invalid
      }

      if (totalFees) {
        const profit = numericPrice - numericCostPrice - totalFees;
        const roi = (
          ((numericPrice - numericCostPrice - totalFees) / numericCostPrice) *
          100
        )?.toFixed(2);
        const roiNumber = parseFloat(roi);

        return {
          ...offer,
          price: price,
          profit: profit.toFixed(2),
          roi: getRoiDisplay(roiNumber),
        };
      }
      return offer;
    })
  );

  const updatedOffers = {
    ...offers,
    selleroffer: updatedSelleroffer,
  };

  return updatedOffers;
};
// export const handleOfferValues = (
//   offers: any,
//   productDetails: any,
//   type: any
// ) => {
//   if (
//     !offers ||
//     typeof offers !== "object" ||
//     !Array.isArray(offers.selleroffer)
//   ) {
//     console.error("Invalid offers object or selleroffer is not an array.");
//     return offers;
//   }

//   const updatedSelleroffer = offers.selleroffer.map((offer: any) => {
//     let costPrice;
//     if (type === "quickInfo") {
//       costPrice = productDetails?.quickInfo?.costPrice;
//     } else {
//       costPrice = productDetails?.profitCalculator?.costPrice;
//     }
//     const numericCostPrice =
//       typeof costPrice === "number" ? costPrice : parseFloat(costPrice);

//     const price = offer?.price;
//     const numericPrice = typeof price === "number" ? price : parseFloat(price);

//     // Calculate total fees
//     const totalFees = calculateTotalFees(
//       productDetails?.profitCalculator?.totalFees
//     );

//     if (isNaN(numericCostPrice) || isNaN(numericPrice)) {
//       console.error("Invalid cost price or price.");
//       return offer; // Return original offer if price or cost price is invalid
//     }

//     // Calculate profit
//     const profit = numericPrice - numericCostPrice - totalFees;
//     // Calculate ROI
//     const roi = (
//       ((numericPrice - numericCostPrice - totalFees) / numericCostPrice) *
//       100
//     )?.toFixed(2);

//     const roiNumber = parseFloat(roi);

//     return {
//       ...offer,
//       price: price,
//       profit: profit.toFixed(2),
//       roi: getRoiDisplay(roiNumber) + "%",
//     };
//   });

//   // Update the main offers object with the updated selleroffer array
//   const updatedOffers = {
//     ...offers,
//     selleroffer: updatedSelleroffer,
//   };

//   return updatedOffers; // Return the new updated offers object
// };

export const handleRoiValues = (roi: any, productDetails: any, type: any) => {
  const updatedRoiValues = roi.map((roi: any) => {
    let costPrice;
    if (type === "quickInfo") {
      costPrice = productDetails?.quickInfo?.costPrice;
    } else {
      costPrice = productDetails?.profitCalculator?.costPrice;
    }
    const numericCostPrice =
      typeof costPrice === "number" ? costPrice : parseFloat(costPrice);

    // Calculate total fees
    const totalFees = calculateTotalFees(
      productDetails?.profitCalculator?.totalFees
    );

    // if (isNaN(numericCostPrice) || isNaN(numericPrice)) {
    //   console.error("Invalid cost price or price.");
    //   return offer; // Return original offer if price or cost price is invalid
    // }

    // Calculate profit
    const profit = (numericCostPrice * roi?.roi) / 100;
    const salePrice = numericCostPrice + totalFees + profit;

    return {
      ...roi,
      roi: roi?.roi,
      profit: profit.toFixed(2),
      salePrice: salePrice?.toFixed(2),
    };
  });

  // Update the main offers object with the updated selleroffer array
  const updatedRoi = {
    updatedRoiValues,
  };

  return updatedRoi?.updatedRoiValues; // Return the new updated offers object
};

export const formatDealSize = (amount: any) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumFractionDigits: 2,
  });
  if (amount >= 1000000) {
    return formatter.format(amount / 1000000) + "M";
  } else if (amount >= 1000) {
    return formatter.format(amount / 1000) + "k";
  } else {
    return formatter.format(amount);
  }
};

export const isDecimal = (value: any) => {
  return typeof value === "number" && !Number.isInteger(value);
};

export const useStyles = makeStyles({
  tooltip: {
    backgroundColor: "black",
    color: "white",
    fontFamily: "Helvetica Neue",
  },
});

export const calculateStars = (rating: any) => {
  const fullStars = Math.floor(rating);
  const fractionalPart = rating % 1;
  let hasQuarterStar = false;
  let hasHalfStar = false;
  let hasThreeQuarterStar = false;

  if (fractionalPart >= 0.75) {
    hasThreeQuarterStar = true;
  } else if (fractionalPart >= 0.5) {
    hasHalfStar = true;
  } else if (fractionalPart >= 0.25) {
    hasQuarterStar = true;
  }

  const emptyStars =
    5 -
    fullStars -
    (hasQuarterStar ? 1 : 0) -
    (hasHalfStar ? 1 : 0) -
    (hasThreeQuarterStar ? 1 : 0);

  return {
    fullStars,
    hasQuarterStar,
    hasHalfStar,
    hasThreeQuarterStar,
    emptyStars,
  };
};

export const getRatingStarsHtml = (rating: any) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push('<i class="filled">&#9733;</i>');
  }

  if (hasHalfStar) {
    stars.push('<i class=" half">&#9733;</i>');
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push('<i class=" empty">&#9734;</i>');
  }

  return stars.join("");
};

export const formatElapsedTime = (elapsedTime: any) => {
  const absElapsedTime = Math.abs(elapsedTime);
  const seconds = Math.floor(absElapsedTime / 1000);
  const minutes = Math.floor(absElapsedTime / (1000 * 60));
  const hours = Math.floor(absElapsedTime / (1000 * 60 * 60));
  const days = Math.floor(absElapsedTime / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(absElapsedTime / (1000 * 60 * 60 * 24 * 7));
  const months = Math.floor(absElapsedTime / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(absElapsedTime / (1000 * 60 * 60 * 24 * 365));

  if (elapsedTime >= 0) {
    if (years > 0) {
      return `${years} ${years === 1 ? "year" : "years"} ago`;
    } else if (months > 0) {
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else if (weeks > 0) {
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else if (days > 0) {
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else {
      return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
    }
  } else {
    return "just now";
  }
};
