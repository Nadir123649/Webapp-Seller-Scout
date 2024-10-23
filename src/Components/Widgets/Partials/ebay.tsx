import React from "react";
import { Link } from "react-router-dom";

interface EbayProps {
  data: any;
}
const Ebay = ({ data }: EbayProps) => {
  return (
    <div className="offers-content d-flex gap-2 flex-wrap">
      {data?.map((item: any, rowIndex: any) => (
        <Link
          key={rowIndex}
          to={item.link}
          className="btn-refresh seller-btn"
          target={item.target}
          rel="noopener noreferrer"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default Ebay;
