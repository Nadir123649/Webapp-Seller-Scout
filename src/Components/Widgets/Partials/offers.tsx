import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import LookUp from "./lookupDetails";
import { heading } from "../../../constants";
import { Tooltip } from "@mui/material";
import { useStyles } from "../../../helpers";

interface OffersProps {
  offers: any;
  getOffers: any;
  productDetails: any;
}

const Offers = ({ offers, getOffers, productDetails }: OffersProps) => {
  const classes = useStyles();
  const [isOfferChecked, setIsOfferChecked] = useState(false);
  const [offersToShow, setOffersToShow] = useState(10);
  const [isLiveChecked, setIsLiveChecked] = useState(false);
  const [displayedOffers, setDisplayedOffers] = useState([]);

  const handleLoadMore = () => {
    setOffersToShow((prev) => prev + 10);
  };
  const handleOfferFilterChange = (e: any) => {
    const isCheckboxChecked = e.target.checked;
    setIsOfferChecked(isCheckboxChecked);
    getOffers(
      productDetails,
      isCheckboxChecked ? "true" : "false",
      isLiveChecked ? true : false,
      productDetails?.quickInfo?.costPrice
    );
  };

  useEffect(() => {
    setDisplayedOffers(offers?.selleroffer?.slice(0, offersToShow));
  }, [offers, offersToShow]);

  const handleLiveFilterChange = (e: any) => {
    const isCheckboxChecked = e.target.checked;
    setIsLiveChecked(isCheckboxChecked);
    getOffers(
      productDetails,
      isOfferChecked ? true : false,
      isCheckboxChecked ? true : false,
      productDetails?.quickInfo?.costPrice
    );
  };

  return (
    <div className="offers-content">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="toggler toggler-two simple-toggle">
          <input
            type="checkbox"
            className="checkbox-desc"
            onChange={handleLiveFilterChange}
            checked={isLiveChecked}
          />
          <label className="unchecked-label seller-description">Recent</label>
          <label className="checked-label seller-description">Live</label>
          <div className="background checked-background"></div>
          <div className="background unchecked-background"></div>
        </div>
        <div className="toggler toggler-two">
          <input
            type="checkbox"
            className="checkbox-desc"
            checked={isOfferChecked}
            onChange={handleOfferFilterChange}
          />
          <label className="unchecked-label seller-description">
            All Offers
          </label>
          <label className="checked-label seller-description">Prime Only</label>

          <div className="background checked-background"></div>
          <div className="background unchecked-background"></div>
        </div>
      </div>
      <LookUp
        data={displayedOffers}
        heading={heading}
        type="offer"
        value="value"
      />
      {offers?.selleroffer?.length > offersToShow && (
        <div className="">
          <button
            type="button"
            onClick={() => handleLoadMore()}
            className="btn-refresh seller-btn mt-2 seller-offer-btn"
          >
            Load More
          </button>
        </div>
      )}
      {offers?.selleroffer && (
        <ul className="horizontal-list d-flex align-items-center gap-2 mt-2  mb-0 p-0 justify-content-start">
          <li className="text-bubble plain-box">
            <Tooltip
              title={
                <div>
                  Total live offer count available for delivery to your delivery
                  address or geographical location
                </div>
              }
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
                  Offers:{" "}
                  <span className="offers-total-cnt">
                    {offers && offers.offersCount !== undefined
                      ? offers.offersCount
                      : "-"}
                  </span>
                </span>
              </div>
            </Tooltip>
          </li>
          <li className="text-bubble bb-10">
            <Tooltip
              title={<div>Total number of FBA offers</div>}
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
                  FBA:
                  <span className="offers-fba-cnt">
                    {offers && offers.offerCountFBA !== undefined
                      ? offers.offerCountFBA
                      : "-"}
                  </span>
                </span>
              </div>
            </Tooltip>
          </li>
          {offers.offerCountFBM ? (
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
                      {offers && offers.offerCountFBM !== undefined
                        ? offers.offerCountFBM
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
      )}
    </div>
  );
};

export default Offers;
