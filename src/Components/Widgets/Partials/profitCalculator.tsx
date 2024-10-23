import React, { useContext, useEffect, useRef, useState } from "react";
import { LiaCalculatorSolid } from "react-icons/lia";
import { Accordion } from "react-bootstrap";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoIosCalculator } from "react-icons/io";
import { Link } from "react-router-dom";
import { table } from "console";
import {
  calculateTotalFees,
  handleMaxCost,
  handleOfferValues,
  handleRoiValues,
  handleSaleValue,
  handleValues,
  transformKeys,
  useStyles,
} from "../../../helpers";
import { Tooltip } from "@mui/material";
import { ProfitContext } from "../../../context/ProfitContext";

interface ProfitCalculatorProps {
  productDetails: any;
  activeKey: any;
  setProductDetails: React.Dispatch<React.SetStateAction<any>>;
  setActiveKey: React.Dispatch<React.SetStateAction<any>>;
  handleToggle: any;
  offers: any;
  setOffers: React.Dispatch<React.SetStateAction<any>>;
  roi: any;
  setRoi: React.Dispatch<React.SetStateAction<any>>;
  totalDiscount: any;
  setFulFillmentType: React.Dispatch<React.SetStateAction<any>>;
  calculateProfit: any;
  referralFee: any;
  getOffers: any;
  offersFilter: any;
}
const ProfitCalculator = ({
  productDetails,
  setProductDetails,
  activeKey,
  setActiveKey,
  handleToggle,
  offers,
  setOffers,
  roi,
  setRoi,
  totalDiscount,
  setFulFillmentType,
  calculateProfit,
  referralFee,
  getOffers,
  offersFilter,
}: ProfitCalculatorProps) => {
  const isFirstRender = useRef(true);
  const classes = useStyles();
  const { setProfit, setSalePrice } =
    useContext(ProfitContext) ??
    (() => {
      throw new Error(
        "ProfitContext is undefined. Ensure the component is within SearchState."
      );
    })();

  const [isCollapsed1, setIsCollapsed1] = useState(true);
  const [isCollapsed2, setIsCollapsed2] = useState(true);

  const toggleCollapse1 = () => {
    setIsCollapsed1(!isCollapsed1);
  };
  const toggleCollapse2 = () => {
    setIsCollapsed2(!isCollapsed2);
  };
  const handleChange = async (e: any) => {
    const { name, value } = e.target;
    let newValue = value;

    const updatedObj = JSON.parse(JSON.stringify(productDetails));
    const validPattern = /^\d*\.?\d*$/;
    if (validPattern.test(newValue)) {
      const parts = newValue.split(".");
      if (parts.length === 2 && parts[1].length > 2) {
        // Limit the decimal places to two
        newValue = `${parts[0]}.${parts[1].slice(0, 2)}`;
      }
    }
    if (name === "storage_Months") {
      const storageFee = newValue * 0.01;

      updatedObj.profitCalculator = {
        ...updatedObj.profitCalculator,
        [name]: Number(newValue),
        totalFees: {
          ...updatedObj.profitCalculator.totalFees,
          storageFee: storageFee,
        },
      };
      const updatedValue = handleValues(
        updatedObj,
        "profitCalculator",
        totalDiscount
      );

      setProductDetails(updatedValue);
      const offerValues = await handleOfferValues(
        offers,
        updatedObj,
        "profitCalculator"
      );
      setOffers(offerValues);
      const roiValues = handleRoiValues(roi, updatedObj, "profitCalculator");
      setRoi(roiValues);
    } else {
      if (updatedObj.profitCalculator) {
        updatedObj.profitCalculator = {
          ...updatedObj.profitCalculator,
          [name]: Number(newValue),
        };
      }

      if (name === "costPrice") {
        const updatedValue = handleValues(
          updatedObj,
          "profitCalculator",
          totalDiscount
        );
        setProductDetails(updatedValue);
      }
      if (name != "costPrice") {
        const updatedValue = handleSaleValue(updatedObj, "profitCalculator");
        setProductDetails(updatedValue);
      }
    }
  };

  const handleMaxCostValue = () => {
    const updatedValue = handleMaxCost(productDetails, "profitCalculator");
    const newlyValues = handleValues(
      updatedValue,
      "profitCalculator",
      totalDiscount
    );

    setProductDetails(newlyValues);
  };

  const handleCheckboxChange = () => {
    const currentType = productDetails?.profitCalculator?.fulfilmentType;
    const newType = currentType === "FBA" ? "FBM" : "FBA";
    setFulFillmentType(newType === "FBA" ? 0 : 1);
    setProductDetails((prevState: any) => ({
      ...prevState,
      profitCalculator: {
        ...prevState.profitCalculator,
        fulfilmentType: newType,
      },
    }));
  };

  const profitCalculate = async (type?: any) => {
    try {
      await calculateProfit(productDetails, "profitCalculator", type);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCostPrices = async () => {
    try {
      // const offerValues = await handleOfferValues(
      //   offers,
      //   productDetails,
      //   "profitCalculator"
      // );
      // setOffers(offerValues);

      const offerValues = await getOffers(
        {},
        offersFilter?.prime,
        offersFilter?.live,
        productDetails?.profitCalculator?.costPrice
      );
      setOffers(offerValues);
      const roiValues = handleRoiValues(
        roi,
        productDetails,
        "profitCalculator"
      );
      setRoi(roiValues);
      setProfit((productDetails?.profitCalculator?.costPrice * 25) / 100);
      setSalePrice(
        productDetails?.profitCalculator?.costPrice +
        calculateTotalFees(productDetails?.profitCalculator?.totalFees) +
        (productDetails?.profitCalculator?.costPrice * 25) / 100
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const getData = setTimeout(() => {
      profitCalculate("sale");
    }, 500);

    return () => clearTimeout(getData);
  }, [productDetails?.profitCalculator?.salePrice]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const getData = setTimeout(() => {
      profitCalculate();
    }, 500);

    return () => clearTimeout(getData);
  }, [productDetails?.profitCalculator?.FBMCost]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (productDetails?.profitCalculator?.costPrice >= 0) {
      const getData = setTimeout(() => {
        handleCostPrices();
      }, 500);

      return () => clearTimeout(getData);
    }
  }, [productDetails?.profitCalculator?.costPrice]);

  return (
    <Accordion activeKey={activeKey?.profitCalculator === true ? "0" : "1"}>
      <Accordion.Item eventKey="0">
        <Accordion.Header onClick={() => handleToggle("profitCalculator")}>
          <IoIosCalculator className="calculator" /> Profit Calculator
        </Accordion.Header>
        <Accordion.Body>
          <div className="calculator-body">
            <table className="table table-bordered table-striped">
              <tbody>
                <tr>
                  <td
                    style={{ width: "50%" }}
                    className="seller-description profile-calculation"
                  >
                    Cost Price
                  </td>
                  <td>
                    <div className="form-group field-cost">
                      <div className="input-group">
                        <span
                          className="input-group-addon focus-next-input"
                          id="sas-cost-currency-symbol"
                        >
                          $
                        </span>
                        <input
                          type="number"
                          id="cost"
                          className="aj-save form-control money-input no-arrows"
                          name="costPrice"
                          value={
                            productDetails?.profitCalculator?.costPrice !==
                              undefined &&
                              productDetails?.profitCalculator?.costPrice !== null
                              ? productDetails?.profitCalculator?.costPrice ===
                                0
                                ? "0"
                                : String(
                                  productDetails?.profitCalculator?.costPrice
                                )?.startsWith("0.")
                                  ? productDetails?.profitCalculator?.costPrice
                                  : String(
                                    productDetails?.profitCalculator?.costPrice
                                  )?.replace(/^0+/, "")
                              : ""
                          }
                          step="any"
                          // pattern="[0-9.]*"
                          // inputmode="decimal"
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ width: "50%" }}
                    className="seller-description profile-calculation"
                  >
                    Sale Price
                  </td>
                  <td>
                    <div className="form-group field-sale_price">
                      <div className="input-group">
                        <span
                          className="input-group-addon focus-next-input"
                          id="sas-sale-currency-symbol"
                        >
                          $
                        </span>
                        <input
                          type="number"
                          id="sale_price"
                          className="aj-save form-control money-input no-arrows"
                          name="salePrice"
                          pattern="[0-9.]*"
                          // inputmode="decimal"
                          step="any"
                          value={
                            productDetails?.profitCalculator?.salePrice !==
                              undefined &&
                              productDetails?.profitCalculator?.salePrice !== null
                              ? productDetails?.profitCalculator?.salePrice ===
                                0
                                ? "0"
                                : String(
                                  productDetails?.profitCalculator?.salePrice
                                )?.startsWith("0.")
                                  ? productDetails?.profitCalculator?.salePrice
                                  : String(
                                    productDetails?.profitCalculator?.salePrice
                                  )?.replace(/^0+/, "")
                              : ""
                          }
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ width: "50%", verticalAlign: "middle" }}
                    className="seller-description profile-calculation"
                  >
                    Fulfilment Type
                  </td>
                  <td className="d-flex justify-content-end align-items-center">
                    <div className="toggler toggler-three">
                      <input
                        type="checkbox"
                        className="checkbox-desc"
                        onChange={handleCheckboxChange}
                        checked={
                          productDetails?.profitCalculator?.fulfilmentType ===
                          "FBM"
                        }
                      />
                      <label className="unchecked-label seller-description">
                        FBA
                      </label>
                      <label className="checked-label seller-description">
                        FBM
                      </label>
                      <div className="background checked-background"></div>
                      <div className="background unchecked-background"></div>
                    </div>
                  </td>
                </tr>
                {productDetails?.profitCalculator?.fulfilmentType === "FBA" ? (
                  <tr>
                    <td
                      style={{ width: "50%", verticalAlign: "middle" }}
                      className="seller-description profile-calculation"
                    >
                      Storage (Months)
                    </td>
                    <td>
                      <Tooltip
                        title={
                          <div>
                            {productDetails?.profitCalculator?.storage_Months}
                          </div>
                        }
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <input
                          type="range"
                          className="range"
                          name="storage_Months"
                          onChange={(e) => handleChange(e)}
                          value={
                            productDetails?.profitCalculator?.storage_Months
                          }
                          max={12}
                          step="1"
                        />
                      </Tooltip>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td
                      style={{ width: "50%" }}
                      className="seller-description profile-calculation"
                    >
                      FBM Cost
                    </td>
                    <td>
                      <div className="form-group field-fbm_fulfilment_cost has-success">
                        <div className="input-group">
                          <span
                            className="input-group-addon focus-next-input"
                            id="sas-fulfilment-cost-currency-symbol"
                          >
                            $
                          </span>
                          <input
                            type="text"
                            id="FBMCost"
                            className="form-control aj-save money-input"
                            name="FBMCost"
                            pattern="[0-9.]*"
                            value={productDetails?.profitCalculator?.FBMCost}
                            onChange={(e) => handleChange(e)}
                            aria-invalid="false"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <table className="table table-bordered table-striped table-white mt-1">
              <tbody>
                <tr>
                  <td style={{ width: "50%" }} className="seller-description ">
                    Profit
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span
                      id="saslookup-profit"
                      className="seller-description bad-hl"
                    >
                      $&nbsp;
                      {productDetails?.profitCalculator?.profit}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }} className="seller-description ">
                    ROI
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span
                      id="saslookup-profit"
                      className="seller-description bad-hl"
                    >
                      {productDetails?.profitCalculator?.roi}%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }} className="seller-description">
                    Maximum Cost
                    <button
                      className="collapse-button"
                      onClick={toggleCollapse1}
                    >
                      {isCollapsed1 ? <FaAngleDown /> : <FaAngleUp />}
                    </button>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span
                      id="saslookup-profit"
                      className="seller-description bad-hl cursor-copy"
                      onClick={() => handleMaxCostValue()}
                    >
                      $ {productDetails?.quickInfo?.maxCost ?? "0"}
                    </span>
                  </td>
                </tr>
                {!isCollapsed1 && (
                  <tr className="collapsed-content p-0">
                    <td colSpan={2}>
                      <ul className="detail-items d-flex flex-column gap-2">
                        <li className="d-flex justify-content-between align-items-center">
                          <span className="seller-description">Min. ROI</span>
                          <span className="seller-description">25%</span>
                        </li>
                        <li className="d-flex justify-content-between align-items-center">
                          <span className="seller-description">
                            Min. Profit
                          </span>
                          <span className="seller-description">
                            $&nbsp;3.00
                          </span>
                        </li>
                      </ul>
                    </td>
                  </tr>
                )}
                <tr>
                  <td style={{ width: "50%" }} className="seller-description ">
                    Total Fees
                    <button
                      className="collapse-button"
                      onClick={toggleCollapse2}
                    >
                      {isCollapsed2 ? <FaAngleDown /> : <FaAngleUp />}
                    </button>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span id="saslookup-profit" className="seller-description">
                      $&nbsp;
                      {calculateTotalFees(
                        productDetails?.profitCalculator?.totalFees
                      )}
                    </span>
                  </td>
                </tr>
                {!isCollapsed2 && (
                  <tr className="collapsed-content p-0">
                    <td colSpan={2}>
                      <ul
                        className="detail-items d-flex flex-column gap-2"
                        style={{ width: "100%" }}
                      >
                        {Object.entries(
                          transformKeys(
                            productDetails?.profitCalculator?.totalFees
                          )
                        ).map(([key, value]: any) => (
                          <li
                            key={key}
                            className="d-flex justify-content-between align-items-center"
                          >
                            {key === "ReferralFee" ? (
                              <Tooltip
                                title={
                                  <div className="referral-fee-tooltip">
                                    {""}
                                    {referralFee
                                      ? referralFee?.toFixed(2)
                                      : "-"}
                                    %{""}
                                  </div>
                                }
                                placement="top"
                                classes={{ tooltip: classes.tooltip }}
                              >
                                <span className="seller-description dotted-border cursor-pointer">
                                  {key}
                                </span>
                              </Tooltip>
                            ) : key === "InboundPlacement O" ? (
                              <Tooltip
                                title={
                                  <div className="referral-fee-tooltip">
                                    Estimated maximum Inbound Placement Service
                                    fee for Amazon Optimized Splits. Storage Fee
                                    <br />
                                    <br />
                                    Click to cycle through the different Inbound
                                    Placement services.
                                  </div>
                                }
                                placement="top"
                                classes={{ tooltip: classes.tooltip }}
                              >
                                {productDetails?.profitCalculator
                                  ?.fulfilmentType === "FBM" ? (
                                  <del className="seller-description dotted-border cursor-pointer">
                                    {"InboundPlacement (O)"}
                                  </del>
                                ) : (
                                  <span className="seller-description dotted-border cursor-pointer">
                                    {"InboundPlacement (O)"}
                                  </span>
                                )}
                              </Tooltip>
                            ) : (key === "StorageFee" ||
                              key === "PrepFee" ||
                              key === "InboundShipping") &&
                              productDetails?.profitCalculator
                                ?.fulfilmentType === "FBM" ? (
                              <del className="seller-description">{key}</del>
                            ) : (
                              <span className="seller-description">{key}</span>
                            )}{" "}
                            <span className="seller-description">
                              $ {value?.toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
                <tr>
                  <td style={{ width: "50%" }} className="seller-description ">
                    Discount
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span id="saslookup-profit" className="seller-description">
                      $&nbsp;
                      {totalDiscount
                        ? (
                          (productDetails?.profitCalculator?.costPrice *
                            totalDiscount) /
                          100
                        )?.toFixed(2)
                        : productDetails?.profitCalculator?.discount ?? "0"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }} className="seller-description ">
                    Profit Margin
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span id="saslookup-profit" className="seller-description">
                      {productDetails?.profitCalculator?.profitMargin ?? "0"}%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }} className="seller-description ">
                    Breakeven Sale Price
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span id="saslookup-profit" className="seller-description">
                      $&nbsp;
                      {productDetails?.profitCalculator?.breakevenSalePrice ??
                        "0"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }} className="seller-description ">
                    Estimated Amz. Payout
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span id="saslookup-profit" className="seller-description">
                      $&nbsp;
                      {(
                        productDetails?.profitCalculator?.salePrice -
                        calculateTotalFees(
                          productDetails?.profitCalculator?.totalFees
                        )
                      )?.toLocaleString()}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="table table-bordered table-striped mt-1">
              <tbody>
                <tr>
                  <td
                    style={{ width: "50%" }}
                    className="seller-description profile-calculation "
                  >
                    <Tooltip
                      title={
                        <div>
                          Enter quantity to see quick summary calculations and
                          for export to Google Sheets or STK
                        </div>
                      }
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <div
                        className="seller-description "
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        rel="noopener noreferrer"
                      >
                        <span className="seller-description dotted-border cursor-pointer">
                          Quantity
                        </span>
                      </div>
                    </Tooltip>
                  </td>
                  <td>
                    <div className="input-group ">
                      <input
                        type="text"
                        id="quantity"
                        className="aj-save form-control number-input"
                        pattern="[0-9]*"
                        // inputmode="number"
                        step="any"
                        name="quantity"
                        value={productDetails?.profitCalculator?.quantity}
                        onChange={(e) => handleChange(e)}
                        style={{ textAlign: "right" }}
                      />
                    </div>
                  </td>
                </tr>
                {productDetails?.profitCalculator?.quantity !== 1 ? (
                  <>
                    <tr>
                      <td
                        style={{ width: "50%" }}
                        className="seller-description profile-calculation "
                      >
                        <span className="row-sub-caption">Cost</span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <span className="quantity-total-cost-price">
                          $&nbsp;
                          {productDetails?.profitCalculator?.costPrice *
                            productDetails?.profitCalculator?.quantity}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{ width: "50%" }}
                        className="seller-description profile-calculation"
                      >
                        <span className="row-sub-caption">Sale</span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <span className="quantity-total-cost-price">
                          $&nbsp;
                          {(
                            productDetails?.profitCalculator?.salePrice *
                            productDetails?.profitCalculator?.quantity
                          )?.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{ width: "50%" }}
                        className="seller-description profile-calculation"
                      >
                        <span className="row-sub-caption">Total Profit</span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <span className="quantity-total-cost-price">
                          $&nbsp;
                          {(
                            productDetails?.profitCalculator?.profit *
                            productDetails?.profitCalculator?.quantity
                          )?.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  </>
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ProfitCalculator;
