import React, { useContext, useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { calculateTotalFees, useStyles } from "../../../helpers";
import { ProfitContext } from "../../../context/ProfitContext";
import { IoMdStar, IoIosStarOutline, IoIosStarHalf } from "react-icons/io";

interface OffersProps {
  data: any;
  heading: any;
  type?: any;
  value?: any;
  productDetails?: any;
}

const LookUp = ({
  data,
  heading,
  type,
  value,
  productDetails,
}: OffersProps) => {
  const classes = useStyles();
  const [roi, setRoi] = useState(25);
  const { profit, setProfit, salePrice, setSalePrice } =
    useContext(ProfitContext) ??
    (() => {
      throw new Error(
        "ProfitContext is undefined. Ensure the component is within SearchState."
      );
    })();

  const handleRoiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoi(parseFloat(e.target.value));

    const costPrice = productDetails?.quickInfo?.costPrice;
    const numericCostPrice =
      typeof costPrice === "number" ? costPrice : parseFloat(costPrice);

    // Calculate total fees
    const totalFees = calculateTotalFees(
      productDetails?.profitCalculator?.totalFees
    );
    const profit = (numericCostPrice * parseFloat(e.target.value) || 0) / 100;
    setProfit(profit || 0);
    const salePrice = numericCostPrice + totalFees + profit;
    setSalePrice(salePrice);
  };

  const handleProfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfit(parseFloat(e.target.value) || 0);

    const costPrice = productDetails?.quickInfo?.costPrice;
    const numericCostPrice =
      typeof costPrice === "number" ? costPrice : parseFloat(costPrice);

    // Calculate total fees
    const totalFees = calculateTotalFees(
      productDetails?.profitCalculator?.totalFees
    );
    const salePrice =
      numericCostPrice + totalFees + parseFloat(e.target.value) || 0;

    setSalePrice(salePrice);
  };

  useEffect(() => {
    if (productDetails) {
      const costPrice = productDetails?.quickInfo?.costPrice;
      const numericCostPrice =
        typeof costPrice === "number" ? costPrice : parseFloat(costPrice);

      const totalFees = calculateTotalFees(
        productDetails?.profitCalculator?.totalFees
      );
      const salePrice = numericCostPrice + totalFees + profit;
      setSalePrice(salePrice);
    }
  }, [productDetails]);

  return (
    <div className="offers-content">
      <table className="table offers-table table-striped table-bordered">
        <thead>
          <tr>
            {value === "value" && <th></th>}

            {heading && heading?.map((item: any) => <th>{item}</th>)}
          </tr>
          {type === "roi" ? (
            <tr>
              <th></th>
              <th>
                <div className="input-group">
                  <input
                    type="number"
                    className=" form-control  money-input"
                    name="roi"
                    value={roi}
                    step="any"
                    pattern="[0-9.]*"
                    inputMode="decimal"
                    onChange={handleRoiChange}
                  />
                  <span className="input-group-addon focus-next-input home-mp-currency-symbol">
                    %
                  </span>
                </div>
              </th>
              <th>
                <div className="input-group">
                  <span className="input-group-addon focus-next-input home-mp-currency-symbol">
                    $
                  </span>
                  <input
                    type="text"
                    className=" form-control  money-input"
                    name="profit"
                    value={Number(profit)}
                    step="any"
                    pattern="[0-9.]*"
                    inputMode="decimal"
                    onChange={handleProfitChange}
                  />
                </div>
              </th>
              <th>
                <div className="input-group">
                  <span className="input-group-addon focus-next-input home-mp-currency-symbol">
                    $
                  </span>
                  <input
                    type="text"
                    className=" form-control  money-input"
                    name="salePrice"
                    value={salePrice}
                    step="any"
                    pattern="[0-9.]*"
                    inputMode="decimal"
                    disabled={true}
                  />
                </div>
              </th>
            </tr>
          ) : (
            <></>
          )}
        </thead>
        <tbody>
          {type === "offer"
            ? data?.map((offer: any, rowIndex: any) => {
                const fullStars = Math.floor(offer?.rating);
                const fractionalPart = offer?.rating % 1;
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

                return (
                  <tr key={rowIndex}>
                    <th scope="row">{rowIndex + 1 ?? "-"}</th>

                    {heading?.map((item: any, colIndex: any) => (
                      <td key={colIndex}>
                        {item === "seller" ? (
                          <div
                            className={`text-bubble ${
                              offer?.fulfillment === "FBA" ? "bb-10" : "bb-7"
                            }`}
                          >
                            <Tooltip
                              title={
                                <div>
                                  <div style={{ fontSize: "13px" }}>
                                    {offer["name"]}
                                  </div>
                                  <div
                                    className="d-flex gap-1 align-items-center flex-wrap"
                                    style={{ fontSize: "13px" }}
                                  >
                                    {offer?.rating > 0 ? (
                                      <>
                                        {Array.from({ length: fullStars }).map(
                                          (_, idx) => (
                                            <i key={`filled-${idx}`}>
                                              <IoMdStar className="rating-stars" />
                                            </i>
                                          )
                                        )}
                                        {hasQuarterStar && (
                                          <i
                                            key="quarter-star"
                                            className="quarter-star"
                                          >
                                            <IoIosStarHalf className="rating-stars" />
                                          </i>
                                        )}
                                        {hasHalfStar && (
                                          <i key="half-star">
                                            <IoIosStarHalf className="rating-stars" />
                                          </i>
                                        )}
                                        {hasThreeQuarterStar && (
                                          <i
                                            key="three-quarter-star"
                                            className="three-quarter-star"
                                          >
                                            <IoIosStarHalf className="rating-stars" />
                                          </i>
                                        )}
                                        {Array.from({ length: emptyStars }).map(
                                          (_, idx) => (
                                            <i key={`empty-${idx}`}>
                                              <IoIosStarOutline className="rating-stars" />
                                            </i>
                                          )
                                        )}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                    <span className="rating-count reviews">
                                      {offer?.reviewCount
                                        ? `(${offer?.reviewCount})`
                                        : "No reviews yet"}
                                    </span>
                                  </div>
                                  <span style={{ fontSize: "11px" }}>
                                    {offer?.fulfillment === "FBA"
                                      ? "Fulfilled by Amazon (Prime)"
                                      : "Fulfilled by Merchant"}
                                  </span>
                                </div>
                              }
                              placement="top"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <div className=" seller-description dotted-border cursor-pointer">
                                <span className="pseudolink">
                                  {offer["fulfillment"]}
                                </span>
                              </div>
                            </Tooltip>
                          </div>
                        ) : item === "price" || item === "profit" ? (
                          `$${offer[item]}`
                        ) : item === "roi" && !offer?.roi ? (
                          "∞%"
                        ) : item === "roi" && offer?.roi ? (
                          offer[item] + "%"
                        ) : (
                          offer[item]
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })
            : type === "roi"
            ? data?.map((roi: any, rowIndex: any) => (
                <tr key={rowIndex}>
                  <th scope="row">{rowIndex + 1 ?? "-"}</th>

                  {heading?.map((item: any, colIndex: any) =>
                    item === "R.O.I." ? (
                      <td key={colIndex}>{roi["roi"]}%</td>
                    ) : item === "Profit" ? (
                      <td key={colIndex}>${roi["profit"]}</td>
                    ) : item === "Sale Price" ? (
                      <td key={colIndex}>${roi["salePrice"]}</td>
                    ) : (
                      <td key={colIndex}>{roi[item]}</td>
                    )
                  )}
                </tr>
              ))
            : type === "lookup"
            ? data?.map((lookup: any, rowIndex: any) => (
                <tr key={rowIndex}>
                  <th scope="row">{""}</th>

                  {heading?.map((item: any, colIndex: any) => (
                    <td key={colIndex}>{lookup[item]}</td>
                  ))}
                </tr>
              ))
            : data?.map((marketimages: any, rowIndex: any) => (
                <tr key={rowIndex}>
                  <th scope="row">
                    <img src={marketimages.src} alt="" />
                  </th>

                  {heading?.map((item: any, colIndex: any) => (
                    <td key={colIndex}>{marketimages[item]}</td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default LookUp;
