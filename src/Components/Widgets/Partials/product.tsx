import React, { useState } from "react";
import { Row, Col, Accordion } from "react-bootstrap";
import { PiArrowSquareDownLeftLight } from "react-icons/pi";
import { FaListUl } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa";
import { FaAmazon } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { IoMdStar, IoIosStarOutline, IoIosStarHalf } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  calculateStars,
  cmToInches,
  ouncesToGrams,
  useStyles,
} from "../../../helpers";
import { Tooltip } from "@mui/material";
import Slider from "../../Slider";
import { FaSearchPlus } from "react-icons/fa";

interface ProductDetailsProps {
  productDetails: any;
  activeKey: any;
  handleToggle: any;
  setActiveKey: React.Dispatch<React.SetStateAction<any>>;
}
const Product = ({
  productDetails,
  activeKey,
  setActiveKey,
  handleToggle,
}: ProductDetailsProps) => {
  const [imageSlider, setImageSlider] = useState(false);

  const rating = calculateStars(productDetails?.rating);

  const classes = useStyles();

  const handleCopy = (type: any) => {
    navigator.clipboard
      .writeText(type === "ASIN" ? productDetails?.asin : productDetails?.upc)
      .then(() => { })
      .catch((error) => {
        console.error("Error copying URL: ", error);
      });
  };

  return (
    <Accordion activeKey={activeKey?.productDetails === true ? "0" : "1"}>
      <Accordion.Item eventKey="0">
        <Accordion.Header onClick={() => handleToggle("productDetails")}>
          Product
        </Accordion.Header>
        {imageSlider && productDetails?.allImageUrl?.length && (
          <Slider
            images={productDetails?.allImageUrl}
            setImageSlider={setImageSlider}
          />
        )}
        <Accordion.Body className="accordion-product">
          <Row className="position-relative">
            <Col lg={4} md={4} xs={4}>
              <div className="product-image position-relative">
                <div className="slider-magnifier-btn">
                  <FaSearchPlus
                    size={13}
                    className=""
                    onClick={() => setImageSlider(true)}
                  />
                </div>
                <img
                  src={productDetails?.imageURL ?? ""}
                  alt=""
                  onClick={() => setImageSlider(true)}
                />
              </div>
            </Col>

            <Col lg={8} md={8} xs={8} className="image-carousel">
              <div className="product-details">
                <Tooltip
                  title={
                    <div>
                      {productDetails?.title?.length > 67
                        ? productDetails?.title?.slice(0, 67) + " ..."
                        : productDetails?.title ?? ""}
                    </div>
                  }
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <h1 className="detail-heading">
                    {productDetails?.title?.length > 67
                      ? productDetails?.title?.slice(0, 67) + " ..."
                      : productDetails?.title ?? ""}
                  </h1>
                </Tooltip>

                <div className="seller-description">
                  by
                  <span className="seller-description">
                    {productDetails?.manufacturer &&
                      " " + productDetails?.manufacturer + " "}
                  </span>
                  <span className="seller-description">
                    | {productDetails?.category}
                  </span>
                </div>
                <div className="d-flex gap-1 align-items-center flex-wrap mt-0">
                  {productDetails?.rating > 0 ? (
                    <>
                      {Array.from({ length: rating?.fullStars }).map(
                        (_, idx) => (
                          <i key={`filled-${idx}`}>
                            <IoMdStar className="yellow-star" />
                          </i>
                        )
                      )}
                      {rating?.hasQuarterStar && (
                        <i key="quarter-star" className="quarter-star">
                          <IoIosStarHalf className="yellow-star" />
                        </i>
                      )}
                      {rating?.hasHalfStar && (
                        <i key="half-star">
                          <IoIosStarHalf className="yellow-star" />
                        </i>
                      )}
                      {rating?.hasThreeQuarterStar && (
                        <i
                          key="three-quarter-star"
                          className="three-quarter-star"
                        >
                          <IoIosStarHalf className="yellow-star" />
                        </i>
                      )}
                      {Array.from({ length: rating?.emptyStars }).map(
                        (_, idx) => (
                          <i key={`empty-${idx}`}>
                            <IoIosStarOutline className="yellow-star" />
                          </i>
                        )
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                  <span className=" seller-description reviews pt-1">
                    {productDetails?.review ?? "No reviews yet"}
                  </span>
                </div>
                {productDetails?.asin && (
                  <div className="sas-choose-secondary secondary-text d-flex align-items-center gap-2 mt-1">
                    <span className="d-flex align-items-center gap-1">
                      <Link to="">
                        <FaRegCopy
                          className="sellers-icon desc-a"
                          onClick={() => handleCopy("ASIN")}
                        />
                      </Link>
                      <p className="product-desc seller-description m-0">
                        ASIN:
                      </p>
                    </span>
                    <p className="seller-description m-0">
                      {productDetails?.asin}
                    </p>
                  </div>
                )}
                {productDetails?.upc && (
                  <div className="sas-choose-secondary secondary-text d-flex align-items-center gap-2">
                    <span className="d-flex align-items-center gap-1">
                      <Link to="">
                        <FaRegCopy
                          className="sellers-icon desc-a"
                          onClick={() => handleCopy("UPC")}
                        />
                      </Link>
                      <p className="product-desc seller-description m-0">
                        UPC:
                      </p>
                    </span>
                    <p className="seller-description m-0">
                      {productDetails?.upc}
                    </p>
                  </div>
                )}
                <div className="d-flex align-items-center gap-1 mt-1">
                  <Tooltip
                    title={
                      <div>
                        <strong>Dimensions</strong> <br />
                        Width:{" "}
                        {cmToInches(productDetails?.dimensions?.width) +
                          " inches"}{" "}
                        {productDetails?.dimensions?.width + " cm"} <br />{" "}
                        Height:{" "}
                        {cmToInches(productDetails?.dimensions?.height) +
                          " inches"}{" "}
                        {productDetails?.dimensions?.height + " cm"} <br />{" "}
                        length:{" "}
                        {cmToInches(productDetails?.dimensions?.length) +
                          " inches"}{" "}
                        {productDetails?.dimensions?.length + " cm"} <br />{" "}
                        Weight: {productDetails?.dimensions?.weight + " ounces"}{" "}
                        {ouncesToGrams(productDetails?.dimensions?.weight) +
                          " grams"}{" "}
                      </div>
                    }
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <button
                      className="flex-button"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                    >
                      <PiArrowSquareDownLeftLight className="icon" />
                    </button>
                  </Tooltip>
                  <Tooltip
                    title={
                      <div>
                        {productDetails?.aboutDetails?.map(
                          (detail: any, index: number) => (
                            <div className="about-detailed" key={index}>
                              {detail}
                              <br />
                              <br />
                            </div>
                          )
                        )}
                      </div>
                    }
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <button
                      className="flex-button"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                    >
                      <FaListUl className="icon" />
                    </button>
                  </Tooltip>

                  <Tooltip
                    title={<div>Open Amazon product page</div>}
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <a
                      className="flex-button"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      href={productDetails?.amzRedirect}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaAmazon className="icon" />
                    </a>
                  </Tooltip>
                  <Tooltip
                    title={<div>Op Search for product title on Google</div>}
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <a
                      className="flex-button"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      href={productDetails?.googleRedirect}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGoogle className="icon" />
                    </a>
                  </Tooltip>
                </div>
              </div>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Product;
