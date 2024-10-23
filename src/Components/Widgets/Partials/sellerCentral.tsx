import React from "react";
import { Link } from "react-router-dom";
import { TiHome } from "react-icons/ti";

interface SellerCentralProps {
  data: any;
}
const SellerCentral = ({ data }: SellerCentralProps) => {
  return (
    <div className="offers-content d-flex gap-2 flex-wrap">
      {data?.map((item: any, rowIndex: any) =>
        item.type === "icon" ? (
          <Link
            key={rowIndex}
            to={item.link}
            target={item.target}
            className="btn-refresh seller-btn"
          >
            <TiHome />
          </Link>
        ) : (
          <Link
            key={rowIndex}
            to={item.link}
            className="btn-refresh seller-btn"
            target={item.target}
            rel="noopener noreferrer"
          >
            {item.title}
          </Link>
        )
      )}
    </div>
  );
};

export default SellerCentral;
