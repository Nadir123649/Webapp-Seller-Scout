import React, { useEffect, useState } from "react";
import { Accordion, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";
import { TbRefresh } from "react-icons/tb";
// import { Flag } from "../utils/images";
import { FaLongArrowAltDown } from "react-icons/fa";
import { formatElapsedTime, isDecimal, useStyles } from "../../../helpers";
import { Diversity1Rounded } from "@mui/icons-material";
import { uk } from "../../../utils/images";
import { Tooltip } from "@mui/material";

interface RanksAndPricesProps {
  ranksAndPrices: any;
  rankFilter: any;
  activeKey: any;
  setRankFilter: React.Dispatch<React.SetStateAction<any>>;
  loading: any;
  setActiveKey: React.Dispatch<React.SetStateAction<any>>;
  getRanksAndPrices: any;
  handleToggle: any;
}

const RanksAndPrices = ({
  ranksAndPrices,
  rankFilter,
  setRankFilter,
  activeKey,
  loading,
  setActiveKey,
  getRanksAndPrices,
  handleToggle,
}: RanksAndPricesProps) => {
  const classes = useStyles();
  const [startTime, setStartTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const lastRefreshedString = localStorage.getItem("ranksRefreshTime");
      const lastRefreshed = lastRefreshedString
        ? new Date(lastRefreshedString)
        : null;

      const elapsedMs = lastRefreshed
        ? new Date().getTime() - lastRefreshed.getTime()
        : 0;

      setElapsedTime(elapsedMs);
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleRefreshClick = () => {
    localStorage.setItem("ranksRefreshTime", new Date().toString());
    setStartTime(new Date());
    getRanksAndPrices();
  };

  const handleClick = (linkName: any) => {
    setRankFilter(linkName);
  };

  return (
    <>
      <Accordion
        activeKey={activeKey?.ranks === true ? "0" : "1"}
        className="ranks-offers"
      >
        {loading ? (
          <div className="ranks-loader">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <></>
        )}
        <Accordion.Item eventKey="0">
          <Accordion.Header onClick={() => handleToggle("ranks")}>
            # Ranks & Prices
          </Accordion.Header>
          <Accordion.Body>
            <div className="calculator-body">
              <table className="table table-bordered table-striped">
                <tbody>
                  <tr>
                    <ul className=" d-flex gap-3 align-items-center justify-content-center">
                      <Tooltip
                        title={<div>Current</div>}
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <li>
                          <Link
                            className={`simple-link ${
                              rankFilter === 0 ? "selected-link" : ""
                            }`}
                            to=""
                            onClick={() => handleClick(0)}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            rel="noopener noreferrer"
                          >
                            Current
                          </Link>
                        </li>
                      </Tooltip>
                      <Tooltip
                        title={<div>Average 30 Days</div>}
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <li>
                          <Link
                            to=""
                            className={`simple-link ${
                              rankFilter === 1 ? "selected-link" : ""
                            }`}
                            onClick={() => handleClick(1)}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            rel="noopener noreferrer"
                          >
                            30
                          </Link>
                        </li>
                      </Tooltip>
                      <Tooltip
                        title={<div>Average 90 Days</div>}
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <li>
                          <Link
                            to=""
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            rel="noopener noreferrer"
                            className={`simple-link ${
                              rankFilter === 2 ? "selected-link" : ""
                            }`}
                            onClick={() => handleClick(2)}
                          >
                            90
                          </Link>
                        </li>
                      </Tooltip>
                      <Tooltip
                        title={<div>Average 180 Days</div>}
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <li>
                          <Link
                            to=""
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            rel="noopener noreferrer"
                            className={`simple-link ${
                              rankFilter === 3 ? "selected-link" : ""
                            }`}
                            onClick={() => handleClick(3)}
                          >
                            180
                          </Link>
                        </li>
                      </Tooltip>
                      <Tooltip
                        title={<div>Lifetime</div>}
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <li>
                          <Link
                            to=""
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            rel="noopener noreferrer"
                            className={`simple-link ${
                              rankFilter === 4 ? "selected-link" : ""
                            }`}
                            onClick={() => handleClick(4)}
                          >
                            All
                          </Link>
                        </li>
                      </Tooltip>
                    </ul>
                  </tr>
                </tbody>
              </table>

              <table className="table table-bordered table-striped">
                <tbody>
                  <tr>
                    <td
                      style={{ width: "100%" }}
                      className=" profile-calculation  seller-description d-flex gap-1 align-items-center "
                    >
                      <img src={uk} alt="" />
                      <span className="seller-description">BSR</span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <span className="rap_row d-flex align-items-center justify-content-end">
                        {ranksAndPrices?.bsr
                          ? ranksAndPrices?.bsr?.toLocaleString()
                          : "0"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ width: "50%" }}
                      className="seller-description profile-calculation  "
                    >
                      Buy Box
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Tooltip
                        title={
                          <div>
                            Average: $
                            {isDecimal(ranksAndPrices?.buyBox?.average) === true
                              ? ranksAndPrices?.buyBox?.average
                              : ranksAndPrices?.buyBox?.average / 100 ?? "-"}
                            <br />
                            Maximum: $
                            {isDecimal(ranksAndPrices?.buyBox?.maximum) === true
                              ? ranksAndPrices?.buyBox?.maximum
                              : ranksAndPrices?.buyBox?.maximum / 100 ?? "-"}
                            <br />
                            Minimum: $
                            {isDecimal(ranksAndPrices?.buyBox?.minimum) === true
                              ? ranksAndPrices?.buyBox?.minimum
                              : ranksAndPrices?.buyBox?.minimum / 100 ?? "-"}
                            <br />
                          </div>
                        }
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <span
                          id="saslookup-profit"
                          className="seller-description cursor-pointer"
                        >
                          $&nbsp;
                          {isDecimal(ranksAndPrices?.buyBox?.average) === true
                            ? ranksAndPrices?.buyBox?.average
                            : ranksAndPrices?.buyBox?.average / 100 ?? "-"}
                        </span>
                      </Tooltip>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ width: "50%" }}
                      className="seller-description profile-calculation  "
                    >
                      Amazon
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Tooltip
                        title={
                          <div>
                            Average: $
                            {isDecimal(ranksAndPrices?.amazon?.average) === true
                              ? ranksAndPrices?.amazon?.average
                              : ranksAndPrices?.amazon?.average / 100 ?? "-"}
                            <br />
                            Maximum: $
                            {isDecimal(ranksAndPrices?.amazon?.maximum) === true
                              ? ranksAndPrices?.amazon?.maximum
                              : ranksAndPrices?.amazon?.maximum / 100 ?? "-"}
                            <br />
                            Minimum: $
                            {isDecimal(ranksAndPrices?.amazon?.minimum) === true
                              ? ranksAndPrices?.amazon?.minimum
                              : ranksAndPrices?.amazon?.minimum / 100 ?? "-"}
                            <br />
                          </div>
                        }
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <span
                          id="saslookup-profit"
                          className="seller-description cursor-pointer"
                        >
                          $&nbsp;
                          {isDecimal(ranksAndPrices?.amazon?.average) === true
                            ? ranksAndPrices?.amazon?.average
                            : ranksAndPrices?.amazon?.average / 100 ?? "-"}
                        </span>
                      </Tooltip>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ width: "50%" }}
                      className="seller-description profile-calculation  "
                    >
                      Lowest FBA
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Tooltip
                        title={
                          <div>
                            Average: $
                            {isDecimal(ranksAndPrices?.lowestFBA?.average) ===
                            true
                              ? ranksAndPrices?.lowestFBA?.average
                              : ranksAndPrices?.lowestFBA?.average / 100 ?? "-"}
                            <br />
                            Maximum: $
                            {isDecimal(ranksAndPrices?.lowestFBA?.maximum) ===
                            true
                              ? ranksAndPrices?.lowestFBA?.maximum
                              : ranksAndPrices?.lowestFBA?.maximum / 100 ?? "-"}
                            <br />
                            Minimum: $
                            {isDecimal(ranksAndPrices?.lowestFBA?.minimum) ===
                            true
                              ? ranksAndPrices?.lowestFBA?.minimum
                              : ranksAndPrices?.lowestFBA?.minimum / 100 ?? "-"}
                            <br />
                          </div>
                        }
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <span
                          id="saslookup-profit"
                          className="seller-description cursor-pointer"
                        >
                          {ranksAndPrices?.lowestFBA?.average >= 0 && "$ "}
                          {isDecimal(ranksAndPrices?.lowestFBA?.average) ===
                          true
                            ? ranksAndPrices?.lowestFBA?.average
                            : ranksAndPrices?.lowestFBA?.average / 100 ?? "-"}
                        </span>
                      </Tooltip>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ width: "50%" }}
                      className="seller-description profile-calculation  "
                    >
                      Lowest FBM (Sellers)
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Tooltip
                        title={
                          <div>
                            Average: $
                            {isDecimal(ranksAndPrices?.lowestFBM?.average) ===
                            true
                              ? ranksAndPrices?.lowestFBM?.average
                              : ranksAndPrices?.lowestFBM?.average / 100 ?? "-"}
                            <br />
                            Maximum: $
                            {isDecimal(ranksAndPrices?.lowestFBM?.maximum) ===
                            true
                              ? ranksAndPrices?.lowestFBM?.maximum
                              : ranksAndPrices?.lowestFBM?.maximum / 100 ?? "-"}
                            <br />
                            Minimum: $
                            {isDecimal(ranksAndPrices?.lowestFBM?.minimum) ===
                            true
                              ? ranksAndPrices?.lowestFBM?.minimum
                              : ranksAndPrices?.lowestFBM?.minimum / 100 ?? "-"}
                            <br />
                          </div>
                        }
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <span
                          id="saslookup-profit"
                          className="seller-description cursor-pointer"
                        >
                          {ranksAndPrices?.lowestFBM?.average >= 0 && "$ "}

                          {isDecimal(ranksAndPrices?.lowestFBM?.average) ===
                          true
                            ? ranksAndPrices?.lowestFBM?.average
                            : ranksAndPrices?.lowestFBM?.average / 100 ?? "-"}
                        </span>
                      </Tooltip>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ width: "50%" }}
                      className="seller-description profile-calculation  "
                    >
                      Keepa BSR Drops
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <span
                        id="saslookup-profit"
                        className="seller-description"
                      >
                        {ranksAndPrices?.keepaBSRDrops ?? "n/a"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ width: "50%" }}
                      className="seller-description profile-calculation  "
                    >
                      <Tooltip
                        title={
                          <div>
                            Net count of Buy Box price increases or decreases in
                            selected time period. <br />
                            An excessive number of net price decreases can
                            indicate a price war.
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
                          <span className="seller-description cursor-pointer dotted-border">
                            Net BB Price Changes
                          </span>
                        </div>
                      </Tooltip>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <span
                        id="saslookup-profit"
                        className="seller-description d-flex align-items-center justify-content-end"
                      >
                        <FaLongArrowAltDown className="down-error" />
                        <Tooltip
                          title={
                            <div>
                              Buy Box price changes in selected time period{" "}
                              <br /> Increases: 0<br />
                              Decreases: 0
                            </div>
                          }
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <div
                            className="seller-description  dotted-border"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            rel="noopener noreferrer"
                          >
                            <span className="seller-description cursor-pointer">
                              {ranksAndPrices?.netBBPriceChanges ?? "-"}
                            </span>
                          </div>
                        </Tooltip>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ width: "50%" }}
                      className="seller-description profile-calculation  "
                    >
                      Estimated Sales
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <span
                        id="saslookup-profit"
                        className="seller-description"
                      >
                        {ranksAndPrices?.estimatedSales ?? "0"} / mo
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ width: "50%" }}
                      className="seller-description profile-calculation  "
                    >
                      <Tooltip
                        title={
                          <div>
                            Use with CAUTION this is an estimate and in Beta.{" "}
                            <br />
                            This is the estimated time to sell your first unit.
                            <br />
                            Based on your sale price, current stock levels and
                            sales being shared between similar priced offers.{" "}
                            <br />
                            Prices and stock levels DO change.
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
                          <span className="seller-description cursor-pointer dotted-border">
                            Est. Time to Sale
                          </span>
                        </div>
                      </Tooltip>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <span
                        id="saslookup-profit"
                        className="seller-description d-flex align-items-center justify-content-end"
                      >
                        {ranksAndPrices?.estTimetoSale !== "Not enough data" &&
                          ranksAndPrices?.estTimetoSale && (
                            <FaLongArrowAltDown className="down-error" />
                          )}

                        <div
                          className="seller-description"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          rel="noopener noreferrer"
                        >
                          <span className="seller-description">
                            {ranksAndPrices?.estTimetoSale ?? "Not enough data"}
                          </span>
                        </div>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ width: "50%" }}
                      className="seller-description verticle-middle"
                    >
                      Last Checked&nbsp;
                      {/* <span className="seller-description refreshed-time-function"> */}
                      {formatElapsedTime(elapsedTime)}
                      {/* </span> */}
                    </td>
                    <td
                      className="verticle-middle"
                      style={{ textAlign: "right" }}
                    >
                      <button
                        className="btn-primary btn-refresh d-flex align-items-center gap-1 justify-content-end ms-auto"
                        onClick={handleRefreshClick}
                      >
                        Refresh
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default RanksAndPrices;
