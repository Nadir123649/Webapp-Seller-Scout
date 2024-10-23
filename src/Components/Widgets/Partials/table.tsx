import React from "react";
import { Accordion, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

interface OffersProps {
  offers: any;
}
const Offers = ({
  offers
}: OffersProps) => {
  return (
    
          <div className="offers-content">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="toggler toggler-two simple-toggle">
                <input type="checkbox" className="checkbox-desc" />
                <label className="unchecked-label seller-description">
                  Recent
                </label>
                <label className="checked-label seller-description">Live</label>
                <div className="background checked-background"></div>
                <div className="background unchecked-background"></div>
              </div>
              <div className="toggler toggler-two">
                <input type="checkbox" className="checkbox-desc" />
                <label className="unchecked-label seller-description">
                  Prime Only
                </label>
                <label className="checked-label seller-description">
                  All Offers
                </label>
                <div className="background checked-background"></div>
                <div className="background unchecked-background"></div>
              </div>
            </div>
            <table className="table offers-table table-striped table-bordered">
              <thead>
                <tr>
                  <th></th>
                  <th>Seller</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Profit</th>
                  <th>ROI</th>
                </tr>
              </thead>
              <tbody>
                {offers &&
                  offers?.selleroffer?.map((item: any, idx: number) => (
                    <tr key={idx}>
                      <th scope="row">{idx + 1 ?? "-"}</th>
                      <td>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-top">
                              <div>
                                Amazon
                                <br />
                                <small>Fulfilled By Amazon</small>
                              </div>
                            </Tooltip>
                          }
                        >
                          <Link
                            className="seller-description "
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            to=""
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="text-bubble bb-0 ">
                              <span className="pseudolink dotted-border">
                                {item.fulfillment ?? "-"}
                              </span>
                            </span>
                          </Link>
                        </OverlayTrigger>
                      </td>
                      <td>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-top">
                              <div>
                                Cumulative: {item.stock ?? "-"}
                                <br />
                                Cumulative is the stock count up to and
                                including this offer
                              </div>
                            </Tooltip>
                          }
                        >
                          <Link
                            className="seller-description dotted-border"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            to=""
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="seller-description  fw-bold ">
                              {item.stock ?? "-"}
                            </span>
                          </Link>
                        </OverlayTrigger>
                      </td>
                      <td>
                        <span className="seller-description ">
                          {item.price ?? "-"}
                        </span>
                      </td>
                      <td>
                        <span className="seller-description  live-offers-tbl-offer-0-profit good-hl">
                          {item.profit ?? "-"}
                        </span>
                      </td>
                      <td>
                        <span className="seller-description live-offers-tbl-offer-0-roi bad-hl">
                          {item.roi ?? "-"}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <ul className="horizontal-list d-flex align-items-center gap-2 mt-2  mb-0 p-0 justify-content-start">
              <li className="text-bubble plain-box">
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="tooltip-top">
                      <div>
                        Total live offer count available for delivery to your
                        delivery address or geographical location
                      </div>
                    </Tooltip>
                  }
                >
                  <Link
                    className="seller-description dotted-border"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    to=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="pseudolink">
                      Offers:{" "}
                      <span className="offers-total-cnt">
                        {offers && offers.offersCount !== undefined
                          ? offers.offersCount
                          : "-"}
                      </span>
                    </span>
                  </Link>
                </OverlayTrigger>
              </li>
              <li className="text-bubble bb-10">
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="tooltip-top">
                      <div>Total number of FBA offers</div>
                    </Tooltip>
                  }
                >
                  <Link
                    className="seller-description dotted-border"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    to=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="pseudolink">
                      FBA:
                      <span className="offers-fba-cnt">
                        {offers && offers.offerCountFBA !== undefined
                          ? offers.offerCountFBA
                          : "-"}
                      </span>
                    </span>
                  </Link>
                </OverlayTrigger>
              </li>
              {offers.offerCountFBM ? (
                <li className="text-bubble bb-7">
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        <div>Total number of FBM offers</div>
                      </Tooltip>
                    }
                  >
                    <Link
                      className="seller-description dotted-border"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      to=""
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="pseudolink">
                        FBM:
                        <span className="offers-fba-cnt">
                          {offers && offers.offerCountFBM !== undefined
                            ? offers.offerCountFBM
                            : "-"}
                        </span>
                      </span>
                    </Link>
                  </OverlayTrigger>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>
  );
};

export default Offers;
