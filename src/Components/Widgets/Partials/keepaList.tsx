import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { useStyles } from "../../../helpers";

interface KeepaListProps {
  value?: any;
  data?: any;
  type?: any;
  selectedItem?: any;
  onItemSelect?: (item: any) => void;
}

const KeepaList = ({
  value,
  data,
  type,
  selectedItem,
  onItemSelect,
}: KeepaListProps) => {
  const classes = useStyles();

  const handleClick = (item: any) => {
    if (onItemSelect) {
      if (type === "country") onItemSelect(item?.key);
      else {
        onItemSelect(item);
      }
    }
  };

  return (
    <>
      <ul className="d-flex gap-2 align-items-center justify-content-center p-0 mb-0">
        {data.map((item: any, index: any) => (
          <li key={index} className="list-name sample-name">
            {type !== "country" ? (
              <Tooltip
                title={item == "All" ? "Lifetime" : `Average ${item} Days`}
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <Link
                  className={`simple-link ${type === "country" && selectedItem === item?.key
                    ? "keepa-selected-link"
                    : type != "country" && selectedItem === item
                      ? "keepa-selected-link"
                      : ""
                    }
              `}
                  to=""
                  onClick={() => handleClick(item)}
                >
                  {item}
                </Link>
              </Tooltip>
            ) : (
              <Link
                className={`simple-link ${type === "country" && selectedItem === item?.key
                  ? "keepa-selected-link"
                  : type != "country" && selectedItem === item
                    ? "keepa-selected-link"
                    : ""
                  }
              `}
                to=""
                onClick={() => handleClick(item)}
              >
                <img src={item.src} alt="" />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default KeepaList;
