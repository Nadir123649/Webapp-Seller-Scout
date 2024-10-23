import React, { useContext, useEffect, useRef } from "react";
import { Row, Col, Accordion } from "react-bootstrap";
import { BsFillLightningFill } from "react-icons/bs";

import { MdErrorOutline } from "react-icons/md";
import {
  calculateTotalFees,
  formatDealSize,
  handleMaxCost,
  handleOfferValues,
  handleRoiValues,
  handleSaleValue,
  handleValues,
  useStyles,
} from "../../../helpers";
import { Tooltip } from "@mui/material";
import { ProfitContext } from "../../../context/ProfitContext";

interface QuickInfoProps {
  productDetails: any;
  setProductDetails: React.Dispatch<React.SetStateAction<any>>;
  offers: any;
  activeKey: any;
  setOffers: React.Dispatch<React.SetStateAction<any>>;
  roi: any;
  setRoi: React.Dispatch<React.SetStateAction<any>>;
  setActiveKey: React.Dispatch<React.SetStateAction<any>>;
  handleToggle: any;
  totalDiscount: any;
  calculateProfit: any;
  getOffers: any;
  offersFilter: any;
}

const QuickInfo = ({
  productDetails,
  setProductDetails,
  offers,
  setOffers,
  roi,
  setRoi,
  activeKey,
  setActiveKey,
  handleToggle,
  totalDiscount,
  calculateProfit,
  getOffers,
  offersFilter,
}: QuickInfoProps) => {
  const classes = useStyles();
  const isFirstRender = useRef(true);
  const { setProfit, setSalePrice } =
    useContext(ProfitContext) ??
    (() => {
      throw new Error(
        "ProfitContext is undefined. Ensure the component is within SearchState."
      );
    })();
  const handleChange = async (e: any) => {
    const { name, value } = e.target;
    let newValue = value;
    const validPattern = /^\d*\.?\d*$/;
    if (validPattern.test(newValue)) {
      const parts = newValue.split(".");
      if (parts.length === 2 && parts[1].length > 2) {
        // Limit the decimal places to two
        newValue = `${parts[0]}.${parts[1].slice(0, 2)}`;
      }
    }
    const updatedObj = { ...productDetails };
    if (updatedObj.quickInfo) {
      updatedObj.quickInfo = {
        ...updatedObj.quickInfo,
        [name]: Number(newValue),
      };
    }
    if (name === "costPrice") {
      const updatedValue = handleValues(updatedObj, "quickInfo", totalDiscount);
      setProductDetails(updatedValue);
    }
    if (name !== "costPrice") {
      const updatedValue = handleSaleValue(updatedObj, "quickInfo");
      setProductDetails(updatedValue);
    }
    // await calculateProfit(updatedObj, "quickInfo");
  };

  const profitCalculate = async () => {
    try {
      await calculateProfit(productDetails, "quickInfo", "sale");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCostValues = async () => {
    try {
      // const offerValues = await handleOfferValues(
      //   offers,
      //   productDetails,
      //   "quickInfo"
      // );
      const offerValues = await getOffers(
        {},
        offersFilter?.prime,
        offersFilter?.live,
        productDetails?.quickInfo?.costPrice
      );
      setOffers(offerValues);
      const roiValues = handleRoiValues(roi, productDetails, "quickInfo");
      setRoi(roiValues);
      setProfit((productDetails?.quickInfo?.costPrice * 25) / 100);
      setSalePrice(
        productDetails?.quickInfo?.costPrice +
          calculateTotalFees(productDetails?.profitCalculator?.totalFees) +
          (productDetails?.quickInfo?.costPrice * 25) / 100
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleMaxCostValue = () => {
    const updatedValue = handleMaxCost(productDetails, "quickInfo");
    const newlyValues = handleValues(updatedValue, "quickInfo", totalDiscount);
    setProductDetails(newlyValues);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const getData = setTimeout(() => {
      profitCalculate();
    }, 1000);

    return () => clearTimeout(getData);
  }, [productDetails?.quickInfo?.salePrice]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (productDetails?.quickInfo?.costPrice >= 0) {
      const getData = setTimeout(() => {
        handleCostValues();
      }, 1000);

      return () => clearTimeout(getData);
    }
  }, [productDetails?.quickInfo?.costPrice]);

  return (
    <Accordion activeKey={activeKey?.quickInfo === true ? "0" : "1"}>
      <Accordion.Item eventKey="0">
        <Accordion.Header onClick={() => handleToggle("quickInfo")}>
          <BsFillLightningFill /> Quick Info
        </Accordion.Header>
        <Accordion.Body className="qi-container">
          <Row className="widget-column">
            <Col lg={6} md={6} sm={6} xs={6} className="panel-col">
              <div className="panel panel-default ">
                <div className="panel-heading">Eligible</div>
                <div className="panel-body qi-eligible-pnl criteria-warning">
                  <div className="login-sc-msg warning-text">
                    {productDetails?.quickInfo?.eligible
                      ? productDetails?.quickInfo?.eligible
                      : "-"}
                  </div>
                  <span id="qi-eligible"></span>
                </div>
              </div>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6} className="panel-col">
              <div className="panel panel-default ">
                <div className="panel-heading">Alerts</div>
                <div className="panel-body qi-alerts-pnl criteria-danger-or-warning">
                  <span id="qi-alerts">
                    <ul className="d-flex align-items-center justify-content-center gap-3">
                      {productDetails?.alerts?.privateLabel && (
                        <Tooltip
                          title={
                            <div>
                              Private Label:
                              {
                                " This product has few historic sellers which is a sign it could be PL"
                              }
                            </div>
                          }
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <li>
                            <span className="qi-alert-not qi-alert-not-warning ">
                              PL
                            </span>
                          </li>
                        </Tooltip>
                      )}
                      {productDetails?.alerts?.variationsCount && (
                        <Tooltip
                          title={
                            <div>
                              Variations:
                              {" This listing has " +
                                productDetails?.alerts?.variationsCount +
                                " variations"}
                            </div>
                          }
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <li>
                            <span className="qi-alert-not qi-alert-not-warning ">
                              V
                            </span>
                          </li>
                        </Tooltip>
                      )}
                    </ul>
                  </span>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} sm={4} xs={4} className="panel-col">
              <div className="panel panel-default ">
                <div className="panel-heading">BSR</div>
                <Tooltip
                  title={<div>👍 This meets your BSR criteria.</div>}
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <div className="panel-body qi-bsr-pnl criteria-success">
                    <span id="qi-bsr">
                      {productDetails?.quickInfo?.bsr
                        ? formatDealSize(productDetails?.quickInfo?.bsr)
                        : 0}
                    </span>
                  </div>
                </Tooltip>
              </div>
            </Col>
            <Col lg={4} md={6} sm={4} xs={4} className="panel-col">
              <div className="panel panel-default ">
                <div className="panel-heading">Est. Sales</div>
                <div className="panel-body qi-estimated-sales-pnl criteria-info d-flex align-items-center gap-1 justify-content-center">
                  <Tooltip
                    title={
                      <div>
                        <span role="img" aria-label="information">
                          ℹ️
                        </span>{" "}
                        We estimate this product sells{" "}
                        {productDetails?.quickInfo?.estSales} units per month
                        across all variations.
                      </div>
                    }
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <span className="estimated_sales_per_mo">
                      {productDetails?.quickInfo?.estSales
                        ? productDetails?.quickInfo?.estSales + " / mon"
                        : 0}
                    </span>
                  </Tooltip>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} sm={4} xs={4}  className="panel-col">
              <div className="panel panel-default ">
                <div className="panel-heading">Max Cost</div>
                <Tooltip
                  title={
                    <div>
                      {productDetails?.quickInfo?.costPrice == 0 ? (
                        <div>
                          {" "}
                          <span role="img" aria-label="information">
                            ℹ️
                          </span>{" "}
                          Please enter cost price.
                        </div>
                      ) : productDetails?.quickInfo?.costPrice > 0 &&
                        productDetails?.quickInfo?.costPrice <
                          productDetails?.quickInfo?.maxCost ? (
                        <div>👍 Your cost price meets your criteria.</div>
                      ) : (
                        <div>
                          👎 Your cost price does not meet your criteria.
                        </div>
                      )}
                    </div>
                  }
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <div
                    className={`panel-body qi-max-cost-pnl ${
                      productDetails?.quickInfo?.costPrice == 0
                        ? "criteria-info"
                        : productDetails?.quickInfo?.costPrice <=
                          productDetails?.quickInfo?.maxCost
                        ? "criteria-success"
                        : "criteria-fail"
                    }`}
                  >
                    <span
                      id="qi-max-cost"
                      className="cost_price cursor-copy"
                      onClick={() => handleMaxCostValue()}
                      // unit_type="money"
                      // value="-2.24"
                    >
                      $&nbsp;{productDetails?.quickInfo?.maxCost}
                    </span>
                  </div>
                </Tooltip>
              </div>
            </Col>
            <Col lg={6} md={6} sm={6} className="panel-col">
              <div className="panel panel-default">
                <div className="panel-heading">Cost Price</div>
                <div className="panel-body even_stripe">
                  <div className="input-group">
                    <span className="input-group-addon focus-next-input home-mp-currency-symbol">
                      $
                    </span>
                    <input
                      type="number"
                      className=" form-control  money-input no-arrows"
                      name="costPrice"
                      value={
                        productDetails?.quickInfo?.costPrice !== undefined &&
                        productDetails?.quickInfo?.costPrice !== null
                          ? productDetails?.quickInfo?.costPrice === 0
                            ? "0"
                            : String(
                                productDetails?.quickInfo?.costPrice
                              )?.startsWith("0.")
                            ? productDetails?.quickInfo?.costPrice
                            : String(
                                productDetails?.quickInfo?.costPrice
                              )?.replace(/^0+/, "")
                          : ""
                      }
                      step="any"
                      pattern="[0-9.]*"
                      inputMode="decimal"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} md={6} sm={6} className="panel-col">
              <div className="panel panel-default ">
                <div className="panel-heading">Sale Price</div>
                <div className="panel-body even_stripe">
                  <div className="input-group">
                    <span className="input-group-addon focus-next-input home-mp-currency-symbol">
                      $
                    </span>
                    <input
                      type="number"
                      id="qi_sale_price"
                      className="roi_to_sp form-control omp-number money-input no-arrows"
                      name="salePrice"
                      value={
                        productDetails?.quickInfo?.salePrice !== undefined &&
                        productDetails?.quickInfo?.salePrice !== null
                          ? productDetails?.quickInfo?.salePrice === 0
                            ? "0"
                            : String(
                                productDetails?.quickInfo?.salePrice
                              )?.startsWith("0.")
                            ? productDetails?.quickInfo?.salePrice
                            : String(
                                productDetails?.quickInfo?.salePrice
                              )?.replace(/^0+/, "")
                          : ""
                      }
                      step="any"
                      pattern="[0-9.]*"
                      inputMode="decimal"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6} sm={6} className="panel-col">
              <div className="panel panel-default ">
                <div className="panel-heading">Profit</div>
                <Tooltip
                  title={
                    <div>
                      {productDetails?.quickInfo?.costPrice <
                      productDetails?.quickInfo?.maxCost ? (
                        <div>👍 This meets your minimum profit criteria.</div>
                      ) : (
                        <div>
                          👎 This does not meet your minimum profit criteria.
                        </div>
                      )}
                    </div>
                  }
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <div
                    className={`panel-body qi-profit-pnl ${
                      productDetails?.quickInfo?.costPrice >
                      productDetails?.quickInfo?.maxCost
                        ? "criteria-fail"
                        : "criteria-success"
                    }`}
                  >
                    <span id="qi-profit">
                      $&nbsp;{productDetails?.quickInfo?.profit}
                    </span>
                  </div>
                </Tooltip>
              </div>
            </Col>
            <Col lg={3} md={6} sm={6} className="panel-col">
              <div className="panel panel-default ">
                <div className="panel-heading">Profit&nbsp;%</div>
                <Tooltip
                  title={
                    <div>
                      {productDetails?.quickInfo?.costPrice <
                      productDetails?.quickInfo?.maxCost ? (
                        <div>👍 This meets your minimum profit criteria.</div>
                      ) : (
                        <div>
                          👎 This does not meet your minimum profit criteria.
                        </div>
                      )}
                    </div>
                  }
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <div
                    className={`panel-body qi-profit-margin-pnl ${
                      productDetails?.quickInfo?.costPrice >
                      productDetails?.quickInfo?.maxCost
                        ? "criteria-fail"
                        : "criteria-success"
                    }`}
                  >
                    <span id="qi-profit-margin">
                      {productDetails?.quickInfo?.profitPercentage}%
                    </span>
                  </div>
                </Tooltip>
              </div>
            </Col>
            <Col lg={3} md={6} sm={6} className="panel-col">
              <div className="panel panel-default ">
                <div className="panel-heading">ROI</div>
                <Tooltip
                  title={
                    <div>
                      {productDetails?.quickInfo?.costPrice == 0 ? (
                        <div>
                          {" "}
                          <span role="img" aria-label="information">
                            ℹ️
                          </span>{" "}
                          Enter a cost price to calculate your ROI.
                        </div>
                      ) : productDetails?.quickInfo?.costPrice <=
                        productDetails?.quickInfo?.maxCost ? (
                        <div>👍 This meets your minimum ROI criteria.</div>
                      ) : (
                        <div>
                          👎 This does not meet your minimum ROI criteria.
                        </div>
                      )}
                    </div>
                  }
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <div
                    className={`panel-body qi-roi-pnl ${
                      productDetails?.quickInfo?.costPrice >
                      productDetails?.quickInfo?.maxCost
                        ? "criteria-fail"
                        : "criteria-success"
                    }`}
                  >
                    <span id="qi-roi">{productDetails?.quickInfo?.roi}%</span>
                  </div>
                </Tooltip>
              </div>
            </Col>
            <Col lg={3} md={6} sm={6} className="panel-col">
              <div className="panel panel-default ">
                <div className="panel-heading break-even">Breakeven</div>
                <Tooltip
                  title={
                    <div>
                      {productDetails?.quickInfo?.costPrice == 0 ? (
                        <div>
                          {" "}
                          <span role="img" aria-label="information">
                            ℹ️
                          </span>{" "}
                          Required sale price to breakeven.
                        </div>
                      ) : productDetails?.quickInfo?.salePrice >=
                        productDetails?.quickInfo?.breakeven ? (
                        <div>
                          👍 Your sale price is equal to or above breakeven.
                        </div>
                      ) : (
                        <div>👎 Your sale price is below breakeven.</div>
                      )}
                    </div>
                  }
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <div
                    className={`panel-body qi-breakeven-pnl ${
                      productDetails?.quickInfo?.salePrice == 0
                        ? "criteria-info"
                        : productDetails?.quickInfo?.salePrice >=
                          productDetails?.quickInfo?.breakeven
                        ? "criteria-success"
                        : "criteria-fail"
                    }`}
                  >
                    <span
                      id="qi-breakeven"
                      className="breakeven csv_price"
                      // unit_type="money"
                      // value="6.31"
                    >
                      $&nbsp;{productDetails?.quickInfo?.breakeven}
                    </span>
                  </div>
                </Tooltip>
              </div>
            </Col>
            <Col lg={12} md={6} sm={12} className="panel-col">
              <div className="panel panel-default ">
                <div className="panel-heading">Offers Summary</div>
                <div className="panel-body qi-offers-pnl even_stripe">
                  <div>
                    <div className="qi-offers-summary">
                      <ul className="horizontal-list d-flex align-items-center gap-2 justify-content-center mb-0 p-0">
                        <li>
                          <Tooltip
                            title={
                              <div>
                                Total live offer count available for delivery to
                                your delivery address or geographical location
                              </div>
                            }
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <div
                              className="seller-description cursor-pointer"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              rel="noopener noreferrer"
                            >
                              <span className="offer-count-bubble tooltips text-bubble plain-box">
                                <span className="pseudolink dotted-border">
                                  Offers:
                                  <span className="offers-total-cnt">
                                    {offers && offers.offersCount !== undefined
                                      ? offers.offersCount
                                      : "-"}
                                  </span>
                                </span>
                              </span>
                            </div>
                          </Tooltip>
                        </li>
                        <li className="amz-on-listing">
                          <Tooltip
                            title={
                              <div>
                                Amazon
                                <br />
                                <small>Fulfilled By Amazon</small>
                              </div>
                            }
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <div
                              className="seller-description cursor-pointer"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              rel="noopener noreferrer"
                            >
                              <span className="text-bubble bb-0  ">
                                <span className="pseudolink dotted-border">
                                  AMZ
                                </span>
                              </span>
                            </div>
                          </Tooltip>
                        </li>
                        <li className="fba-on-listing ">
                          <Tooltip
                            title={<div>Total number of FBA offers</div>}
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <div
                              className="seller-description cursor-pointer"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              rel="noopener noreferrer"
                            >
                              <span className="fba-on-listing-bubble tooltips text-bubble bb-10  ">
                                <span className="pseudolink  dotted-border">
                                  FBA:
                                  <span className="offers-fba-cnt">
                                    {offers &&
                                    offers.offerCountFBA !== undefined
                                      ? offers.offerCountFBA
                                      : "-"}
                                  </span>
                                </span>
                              </span>
                            </div>
                          </Tooltip>
                        </li>

                        {offers?.offerCountFBM ? (
                          <li className="text-bubble bb-7">
                            <Tooltip
                              title={<div>Total number of FBM offers</div>}
                              placement="top"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <div
                                className="seller-description dotted-border cursor-pointer"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                rel="noopener noreferrer"
                              >
                                <span className="pseudolink">
                                  FBM:
                                  <span className="offers-fba-cnt">
                                    {offers &&
                                    offers?.offerCountFBM !== undefined
                                      ? offers?.offerCountFBM
                                      : "-"}
                                  </span>
                                </span>
                              </div>
                            </Tooltip>
                          </li>
                        ) : (
                          <></>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default QuickInfo;
