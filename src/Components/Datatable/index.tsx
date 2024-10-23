import React, { useState, useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import "./index.css";
import { calculateStars } from "../../helpers";
import { IoMdStar, IoIosStarOutline, IoIosStarHalf } from "react-icons/io";

interface TableProps {
  data: any;
  columns: any;
  handleSort: any;
  sortDirection: any;
  sortedColumn: any;
  sortedData: any;
  setSortedData: any;
}

type SortDirection = "" | "asc" | "desc";

const DataTable = ({
  data,
  columns,
  handleSort,
  sortDirection,
  sortedColumn,
  sortedData,
  setSortedData,
}: TableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: sortedData }, useSortBy);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  return (
    <div className="main-table-section">
      <table
        {...getTableProps()}
        className="table bootstrap-table table-striped table-bordered"
        style={{ color: "black", width: "100%" }}
      >
        <thead className="thead-dark">
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps()}
                  key={column.id}
                  className="table-heading"
                  onClick={() => handleSort(column)}
                >
                  <span
                    className={`th-inner sortable ${
                      sortedColumn === column.id
                        ? sortDirection === "asc"
                          ? "sort-up"
                          : "sort-down"
                        : "both"
                    }`}
                  >
                    {column.render("Header")}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell: any) => {
                  const isAmazonSeller =
                    cell?.row?.original?.seller?.includes("Amazon.com");
                  const sellerData = cell.row.original;
                  const rating = calculateStars(sellerData.currentRating);

                  return (
                    <td
                      {...cell.getCellProps()}
                      key={cell.column.id}
                      className={
                        isAmazonSeller
                          ? "amazon-seller table-data"
                          : "table-data"
                      }
                    >
                      {cell.column.id === "seller" ? (
                        <div className="seller-name text-left">
                          <a>
                            
                              {cell.render("Cell")}
                              {sellerData.currentRatingCount
                                ? `(${sellerData.currentRatingCount})`
                                : ""}
                            
                            {sellerData.currentRating > 0 && (
                              <div>
                                {Array.from({ length: rating.fullStars }).map(
                                  (_, idx) => (
                                    <IoMdStar
                                      key={`filled-${idx}`}
                                      className="rating-stars"
                                    />
                                  )
                                )}
                                {rating.hasQuarterStar && (
                                  <IoIosStarHalf
                                    key="quarter-star"
                                    className="rating-stars"
                                  />
                                )}
                                {rating.hasHalfStar && (
                                  <IoIosStarHalf
                                    key="half-star"
                                    className="rating-stars"
                                  />
                                )}
                                {rating.hasThreeQuarterStar && (
                                  <IoIosStarHalf
                                    key="three-quarter-star"
                                    className="rating-stars"
                                  />
                                )}
                                {Array.from({ length: rating.emptyStars }).map(
                                  (_, idx) => (
                                    <IoIosStarOutline
                                      key={`empty-${idx}`}
                                      className="rating-stars"
                                    />
                                  )
                                )}
                              </div>
                            )}
                          </a>
                        </div>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
