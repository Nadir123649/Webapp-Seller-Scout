import React, { useEffect, useState } from "react";
import KeepaList from "./keepaList";
import {
  buyBoxColumns,
  valuesPieChart,
  dropdownItems,
} from "../../../constants";
import Dropdown from "react-bootstrap/Dropdown";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { AiOutlineSortDescending } from "react-icons/ai";
import DataTable from "../../Datatable";
import { FaListUl } from "react-icons/fa6";
import {
  calculateStars,
  formatElapsedTime,
  getRatingStarsHtml,
} from "../../../helpers";
import ModalComponent from "./modal";

interface AnalysisProps {
  buyBoxAnalysis: any;
  selectedDay: any;
  setSelectedDay: any;
  setBuyBoxFilter: any;
  buyBoxLoader: any;
  setBuyBoxLoader: any;
}

type Column = {
  id: keyof DataItem;
  order: string;
};

type DataItem = {
  seller: string;
  avgPrice: string;
  won: string;
  lastWon: string;
  stock: string;
  type: string;
  currentRatingCount: number;
  currentRating?: number;
};

type SortDirection = "asc" | "desc";
const Analysis = ({
  buyBoxAnalysis,
  selectedDay,
  setSelectedDay,
  setBuyBoxFilter,
  buyBoxLoader,
  setBuyBoxLoader,
}: AnalysisProps) => {
  const [filteredData, setFilteredData] = useState(buyBoxAnalysis);
  const [chartsData, setChartsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortedColumn, setSortedColumn] = useState("");
  const [sortedData, setSortedData] = useState(filteredData);
  const [selectedColumns, setSelectedColumns] = useState(
    dropdownItems.map((item) => item.id)
  );

  const highchartsOptions = {
    chart: {
      type: "pie",
    },
    tooltip: {
      useHTML: true,
      formatter: function (this: any): string {
        const starsHtml = getRatingStarsHtml(this.point.rating);

        return `
          <div style="display: flex; flex-direction: column; align-items: flex-start; max-width: 155px; width: 100%; min-width: 155px; line-height:1.1">
            <div style="display: flex; justify-content: space-between; width: 100%;">
              <span><b>${this.point.name}</b></span>
            </div>
            ${this.point.rating > 0
            ? `
                <div style="display: flex; justify-content: space-between; width: 100%;">
                  <span>Rating:</span>
                  <span>${starsHtml}</span>
                </div>
                <div style="display: flex; justify-content: space-between; width: 100%;">
                  <span>Rating Count:</span>
                  <span>${this.point.ratingCount}</span>
                </div>
              `
            : ""
          }
            <div style="display: flex; justify-content: space-between; width: 100%;">
              <span>Avg. Price:</span>
              <span>${this.point.avgPrice}</span>
            </div>
            <div style="display: flex; justify-content: space-between; width: 100%;">
              <span>Won:</span>
              <span>${this.point.won}</span>
            </div>
            <div style="display: flex; justify-content: space-between; width: 100%;">
              <span>Last Won:</span>
              <span>${this.point.lastWon}</span>
            </div>
            <div style="display: flex; justify-content: space-between; width: 100%;">
              <span>Type:</span>
              <span>${this.point.type}</span>
            </div>
          </div>
        `;
      },
    },    
    plotOptions: {
      pie: {
        borderWidth: 0,
        slicedOffset: 0,
        borderColor: null,
        shadow: false,
      },
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: [
          {
            enabled: true,
            distance: 20,
          },
          {
            enabled: false,
            distance: -40,
            format: "{point.percentage:.1f}%",
            style: {
              fontSize: "12px",
              textOutline: "none",
              opacity: 0.7,
            },
            filter: {
              operator: ">",
              property: "percentage",
              value: 10,
            },
          },
        ],
      },
    },
    series: [
      {
        name: "Percentage",
        colorByPoint: true,
        data: chartsData,
      },
    ],
  };




  const handleDaySelect = (item: any) => {
    setBuyBoxFilter(item);
    setSelectedDay(item);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSearchChange = (e: any) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = buyBoxAnalysis.filter((item: any) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(searchTerm)
      )
    );
    setFilteredData(filtered);
  };

  const handleCheckboxChange = (id: any) => {
    setSelectedColumns((prevSelectedColumns) =>
      prevSelectedColumns.includes(id)
        ? prevSelectedColumns.filter((columnId) => columnId !== id)
        : [...prevSelectedColumns, id]
    );
  };

  const handleSort = (column: Column) => {
    const direction = column?.order
      ? column?.order
      : sortDirection === "asc"
        ? "desc"
        : "asc";
    setSortDirection(direction);
    setSortedColumn(column.id);

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[column.id] ?? "";
      const bValue = b[column.id] ?? "";

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortedData(sorted);
  };

  const filteredColumns = buyBoxColumns.filter((column, index) =>
    selectedColumns.includes(index + 1)
  );

  useEffect(() => {
    // const transformedChartsData = buyBoxAnalysis?.map((item: any) => ({
    //   name: item.seller,
    //   y: parseFloat(item.won?.toFixed(2)),
    // }));

    const transformedChartsData = buyBoxAnalysis?.map((item: any) => ({
      name: item.seller,
      y: parseFloat(item.won?.toFixed(2)),
      rating: item?.currentRating,
      ratingCount: item?.currentRatingCount,
      avgPrice: item?.avgPrice,
      won: item?.won < 1 ? "<1%" : Math.round(item.won) + "%",
      lastWon: item.lastWon,
      type: item.type,
    }));

    const updatedBuyBoxData = buyBoxAnalysis?.map((item: any) => ({
      ...item,
      won: item?.won < 1 ? "<1%" : Math.round(item.won) + "%",
    }));

    if (transformedChartsData.length > 0) {
      let maxIndex = 0;
      let maxValue = transformedChartsData[0].y;

      for (let i = 1; i < transformedChartsData.length; i++) {
        if (transformedChartsData[i].y > maxValue) {
          maxValue = transformedChartsData[i].y;
          maxIndex = i;
        }
      }

      transformedChartsData[maxIndex].color = "#e67e22";
    }

    setBuyBoxLoader(true);
    setTimeout(() => {
      setFilteredData(updatedBuyBoxData);
      setChartsData(transformedChartsData);
      setBuyBoxLoader(false);
    }, 5000);
  }, [buyBoxAnalysis]);

  return (
    <>
      <KeepaList
        data={valuesPieChart}
        value={valuesPieChart}
        selectedItem={selectedDay}
        onItemSelect={handleDaySelect}
      />
      <div id="chart" className=" appex-chart-high-chart">
        {buyBoxLoader ? (
          <div className="loading-buyBox" style={{ overflow: "hidden" }}></div>
        ) : buyBoxAnalysis?.length > 0 ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={highchartsOptions}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="d-flex gap-1 mt-2">
        <input
          type="search"
          name="search"
          placeholder="Search"
          className="input-group form-control inputs-search"
          onChange={(e) => handleSearchChange(e)}
        />
        <div className="d-flex">
          <Dropdown>
            <Dropdown.Toggle
              variant=""
              className="btn-refresh seller-btn filter-btn d-flex justify-content-center align-items-center "
            >
              <FaListUl />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {dropdownItems.map((item) => (
                <div
                  key={item.id}
                  className="label-items d-flex align-items-center mb-1 gap-1"
                >
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                  <label htmlFor="item">{item.label}</label>
                </div>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <button
            className="btn-refresh seller-btn analysis-btn"
            onClick={() => handleShowModal()}
          >
            <AiOutlineSortDescending size={22} />
          </button>
          <ModalComponent
            showModal={showModal}
            handleCloseModal={handleCloseModal}
            handleSort={handleSort}
          />
        </div>
      </div>
      <div className="mt-2">
        <DataTable
          data={filteredData}
          columns={filteredColumns}
          handleSort={handleSort}
          sortDirection={sortDirection}
          sortedColumn={sortedColumn}
          sortedData={sortedData}
          setSortedData={setSortedData}
        />
      </div>
    </>
  );
};

export default Analysis;
