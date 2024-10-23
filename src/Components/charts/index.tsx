import React, { useEffect, useRef, useState } from "react";
import Highcharts, { Point, color, chart } from "highcharts";
import HCMore from "highcharts/highcharts-more";
import HighchartsReact from "highcharts-react-official";
import "./index.css";
import { useLocation } from "react-router-dom";

if (typeof Highcharts === "object") {
  HCMore(Highcharts);
}

interface CustomPoint extends Point {
  highlight(event: MouseEvent): void;
}
type DebouncedFunction = (...args: any[]) => void;

declare module "highcharts" {
  interface Point {
    highlight(event: MouseEvent): void;
  }
}
interface ChartsProps {
  chartsData: any;
  legendStyle: any;
}
interface CSVData {
  date: Date;
  price: number;
}

const ChartDemo = ({ chartsData, legendStyle }: ChartsProps) => {

  var gChartX = 0;
  const location = useLocation();

  const [chartData, setChartData] = useState<CSVData[]>([]);
  const [options, setOptions] = useState({});
  const [chartThree, setChartThree] = useState({});
  const [chartTwo, setChartTwo] = useState({});
  const [twoCheck, setTwoCheck] = useState(true);
  const priceChartRef = useRef<Highcharts.Chart | null>(null);
  const CHART_TYPES = {
    PRICE: 0,
    COUNTS: 1
  }
  const formatAbbrThousands = function (this: any) {
    return ("#" + (this.value >= 10000 ? `${this.value / 1000}k` : this.value));
  };

  const getXAxisCommon = function () {
    return {
      title: {
        text: undefined,
      },
      type: "datetime",
      gridLineWidth: 1,
      gridZIndex: 2,
      labels: {
        padding: 20,
        style: {
          color: '#333333',
          fontSize: '9px',
          textAlign: 'right'
        },
      },

      crosshair: {
        snap: false,
        width: 2,
        zIndex: 15,
        dashStyle: 'Dash'

      },
      dateTimeLabelFormats: {
        //day: '%e. %b %y', to include year
        day: "%e. %b",
        week: "%e. %b",
        month: "%b '%y",
        year: "%Y",
      },
      accessibility: {
        rangeDescription: "Dates",
      },
    };
  }


  document.getElementById('container')?.addEventListener('mouseleave', () => {
    setTimeout(() => {
      Highcharts.each(Highcharts.charts, (chart: any) => {
        if (chart) {
          chart.tooltip.hide();
        }
      });
    }, 1000);
  });
  const formatDateToUTC = (dateString: any) => {
    const date = new Date(dateString);
    return date.getTime();
  };

  function syncExtremes(this: any, e: any) {
    const thisChart = this.chart;

    if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
      Highcharts.each(Highcharts.charts, function (chart: any) {
        if (chart && chart !== thisChart) {
          if (chart.xAxis[0].setExtremes) { // It is null while updating
            chart.xAxis[0].setExtremes(
              e.min,
              e.max,
              undefined,
              false,
              { trigger: 'syncExtremes' }
            );
          }
        }
      });
    }
  }

  function debounce<T extends DebouncedFunction>(func: T, wait: number): T {
    let timeout: NodeJS.Timeout | undefined;

    return function (this: any, ...args: Parameters<T>): void {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => func.apply(this, args), wait);
    } as T;
  }




  useEffect(() => {

    const debuncedEventHandler = debounce(((e: any) => {
      gChartX = e.chartX;
      for (let i = 0; i < Highcharts.charts.length; i++) {
        let chart: any = Highcharts.charts[i];
        if (chart) {
          if (!(Object.keys(chart).length === 0 || chart?.container?.contains(e.target))) {

            let event = chart.pointer.normalize(e);
            // point = chart.series[0].searchPoint(event, true);
            let point = chart.series.map((series: any) => series.searchPoint(event, true));
            let visiblePoints = point.filter((point: any) => point !== undefined && point.series.visible);


            chart.tooltip?.refresh(visiblePoints[0] || {});
            chart.xAxis[0].drawCrosshair(e, visiblePoints[0]);
          }
        }
      }
    }), 0.1);
    ['mousemove', 'touchmove', 'touchstart'].forEach((eventType) => {
      document.getElementById('container')?.addEventListener(eventType, debuncedEventHandler)
    });
    let AmazonData = chartsData[0];
    const FBAData = chartsData[1]
    const FBMData = chartsData[2]
    const buyBoxData = chartsData[3]
    const newData = chartsData[4]
    const salesRankData = chartsData[5]
    const monthlySoldData = chartsData[6]
    const offersCountData = chartsData[7]
    const ratingData = chartsData[8]
    const reviewCountData = chartsData[9]

    const container = document.getElementById("chart-container");
    const formatAbbrWholeCurrency = function (this: any) {
      return ('$' + this.value);
    };

    Highcharts.Pointer.prototype.reset = function () {
      return undefined;
    };
    const SMALLEST_FONT_SIZE = "9px";
    const getHcResponsiveRules = function (aChartType: any) {
      return ({
        rules: [
          {
            condition: {
              maxWidth: 500
            },

            chartOptions: {
              plotOptions: {
                series: {
                  lineWidth: 1,
                },
              },

              legend: {
                itemStyle: {
                  fontSize: SMALLEST_FONT_SIZE,
                }
              },

              chart: {
                marginLeft: 25,
                marginRight: 25,
                //marginTop: aChartType == CHART_TYPES.PRICE ? 30 : 0,
                //marginBottom: aChartType == CHART_TYPES.PRICE ? 20 : 30,
              },

              yAxis: [
                {

                  labels: {
                    x: -2,
                    y: 10,
                    style: {
                      fontSize: SMALLEST_FONT_SIZE,
                    }
                  }
                },
                {
                  opposite: true,
                  labels: {
                    x: 2,
                    y: 10,
                    style: {
                      fontSize: SMALLEST_FONT_SIZE,

                    }
                  }
                },
                {
                  opposite: true,
                  labels: {
                    x: 2,
                    y: 10,
                    style: {
                      fontSize: SMALLEST_FONT_SIZE,

                    }
                  }
                }
              ]
              ,
              xAxis: {
                labels: {
                  style: {
                    fontSize: SMALLEST_FONT_SIZE
                  }
                }
              },
            },
          },

          {
            condition: {
              maxWidth: 400,
            },
            chartOptions: {
              chart: {
                //marginTop: aChartType == CHART_TYPES.PRICE ? 50 : 0,
                //marginBottom: aChartType == CHART_TYPES.PRICE ? 20 : 50,
              },
            }
          }
        ]
      });
    };
    Highcharts.Point.prototype.highlight = function (event: any) {
      if (this.series && this.series.chart) {
        event = this.series.chart.pointer.normalize(event);
        this.onMouseOver();
        this.series.chart.tooltip.refresh(this);
        this.series.chart.xAxis[0].drawCrosshair(event, this);
      }
    };

    function syncExtremes(this: any, e: any) {
      const thisChart = this.chart;

      if (e.trigger !== "syncExtremes") {
        Highcharts.each(Highcharts.charts, function (chart: any) {
          if (chart !== thisChart) {
            if (chart.xAxis[0].setExtremes) {
              chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {
                trigger: "syncExtremes",
              });
            }
          }
        });
      }
    }

    const activity = {
      xData: Array.from({ length: 500 }, (_, i) => i + 1),
      datasets: [
        {
          name: "Amazon",
          data:
            AmazonData?.map((item: any) => ({
              x: formatDateToUTC(item?.date),
              y: item?.price,
            })) || [],
          type: "area",
          date: AmazonData?.map((item: any) => item?.date) || [],
          valueDecimals: 2,
          unit: "$",
          color: "#F9AF44",
        },
        {
          name: "FBA",
          data:
            FBAData?.map((item: any) => ({
              x: formatDateToUTC(item?.date),
              y: item?.price,
            })) || [],
          date: FBAData?.map((item: any) => item?.date) || [],
          type: "line",
          valueDecimals: 2,
          unit: "$",
          color: "#FF764B",
        },
        {
          name: "FBM",
          data:
            FBMData?.map((item: any) => ({
              x: formatDateToUTC(item?.date),
              y: item?.price,
            })) || [],
          date: FBMData?.map((item: any) => item?.date) || [],
          type: "line",
          valueDecimals: 2,
          unit: "$",
          color: "#22A7E8",
        },
        {
          name: "BuyBox",
          data:
            buyBoxData?.map((item: any) => ({
              x: formatDateToUTC(item?.date),
              y: item?.price,
            })) || [],
          date: buyBoxData?.map((item: any) => item?.date) || [],
          type: "line",
          valueDecimals: 2,
          unit: "$",
          color: "#FF00B4",
        },
        {
          name: "New",
          data:
            newData?.map((item: any) => ({
              x: formatDateToUTC(item?.date),
              y: item?.price,
            })) || [],
          date: newData?.map((item: any) => item?.date) || [],
          type: "line",
          valueDecimals: 2,
          unit: "$",
          color: "#8888DD",
        },
        {
          name: "Sale Rank",
          data:
            salesRankData?.map((item: any) => ({
              x: formatDateToUTC(item?.date),
              y: item?.price,
            })) || [],
          date: salesRankData?.map((item: any) => item?.date) || [],
          type: "spline",
          valueDecimals: 2,
          unit: "$",
          color: "#9DC59D",
        },
        {
          name: "Monthly Sold",
          data:
            monthlySoldData?.map((item: any) => ({
              x: formatDateToUTC(item?.date),
              y: item?.price,
            })) || [],
          date: monthlySoldData?.map((item: any) => item?.date) || [],
          type: "line",
          valueDecimals: 2,
          unit: "m",
          color: "#D9A420",
        },
        {
          name: "Offer Count",
          data:
            offersCountData?.map((item: any) => ({
              x: formatDateToUTC(item?.date),
              y: item?.price,
            })) || [],
          date: offersCountData?.map((item: any) => item?.date) || [],
          type: "line",
          valueDecimals: 2,
          unit: "m",
          color: "#8888DD",
        },
        {
          name: "Rating",
          data:
            ratingData?.map((item: any) => ({
              x: formatDateToUTC(item?.date),
              y: item?.price,
            })) || [],
          date: ratingData?.map((item: any) => item?.date) || [],
          type: "line",
          valueDecimals: 2,
          unit: "m",
          color: "#3FB0A5",
        },
        {
          name: "Review Count",
          data:
            reviewCountData?.map((item: any) => ({
              x: formatDateToUTC(item?.date),
              y: item?.price,
            })) || [],
          date: reviewCountData?.map((item: any) => item?.date) || [],
          type: "line",
          valueDecimals: 2,
          unit: "m",
          color: "#8AB300",
        },
      ],
    };

    const datasets = activity.datasets.map((dataset: any, i: number) => {
      return {
        data: Highcharts.map(dataset?.data, (val: any, j: number) => [
          val.x,
          val.y,
        ]),
        name: dataset.name,
        type: dataset.type,
        color: dataset?.color || "defaultColor",
        fillOpacity: 0.3,
        opacity: 1,
        tooltip: {
          valueSuffix: " " + dataset.unit,
        },
        states: {
          inactive: {
            opacity: 1,
          },
        },
      };
    });

    const chartDiv1 = document.createElement("div");
    chartDiv1.className = "chart";
    container?.appendChild(chartDiv1);

    const legend = legendStyle ? legendStyle : {
      itemStyle: {
        fontSize: '10px'
      },
      enabled: true,
      verticalAlign: 'top',
      align: 'center',
      borderWidth: 1,
    };

    const getClosestValue = function (aData: any, aTimestamp: any, key?: string) {
      for (var i = aData.length - 1; i > 0; i--) {
        if (aData[i].x <= aTimestamp) {
          return aData[i];
        }
      }

      if (key === 'Rating') return aData[aData.length - 1];
      if (key === 'Amazon') return aData[aData.length - 1];
      if (key === 'Sales Rank') return aData[aData.length - 1];
      return false;
    }
    const hcTooltipFormatter = function (this: any) {
      let tooltip = '<div style="font-size: 8px; padding: 0; width:140px">';

      this.points[0].series.chart.series.forEach((series: any) => {
        if (series.visible) {
          const lClosest = getClosestValue(series.data, this.x, series.name);
          if (lClosest && lClosest.y != null) {
            let lVal = Highcharts.numberFormat(lClosest.y, 0, '.', ',');

            if (["FBA", "FBM", "Amazon", "Buy Box", "New"].includes(series.name)) {
              lVal = '$' + Highcharts.numberFormat(lClosest.y, 2, '.', ',');
            }

            if (series.name == "Rating") lVal = ' <i class="fa fa-star fa-fw"></i>' + Highcharts.numberFormat(lClosest.y, 1, '.', ',');

            if (series.name == "Monthly Sold") lVal += '+';

            tooltip += `
                  <div style="display: flex; justify-content: space-between; margin: 0px; padding: 0px; line-height: 1">
                      <span style="color: ${series.color}; font-size: 9px; font-weight: 500;">
                          ${series.name}
                      </span>
                      <span style="color: ${series.color}; font-size: 9px;">
                          ${series.name == 'Rating' ? '<span style="color:' + series.color + '">★</span>' : ''}
                          <b>${lVal}</b>
                      </span>
                  </div>
                  ${series.name == "Monthly Sold" ? `
                      <div style="color: #333333; font-size: 8px;">
                          <span style="font-size: 0.5rem; font-weight: 400;color:black !important;opacity:1 !important;">Metric from Amazon search pages</span>
                      </div>
                  ` : ''}
              `;
          }
        }
      });

      tooltip += `
          <div style="text-align: right; margin-top: 5px; color: #333333; font-size: 10px;">
              <small>${Highcharts.dateFormat('%l:%M %a %b %e, %Y', this.x)}</small>
          </div>
      </div>`;

      return tooltip;
    };

    const getHcTooltip = function (this: any) {
      return {
        shared: true,
        crosshairs: true,
        followPointer: true,
        useHTML: true,
        outside: true,
        positioner: function (this: any, w: any, h: any, aPoint: any) {


          let y = this.chart.chartHeight - w + 55;
          const lcSpacer = 5;
          let lXpos = lcSpacer + gChartX;
          if (lXpos + w > this.chart.plotLeft + this.chart.clipBox.width) {
            lXpos = gChartX - w - lcSpacer;
          }

          if (location.pathname === '/view-charts')
            return { x: Math.min(Math.abs(lXpos), Math.abs(lXpos)), y: y };

          return { x: Math.min(aPoint.plotX + 35, aPoint.plotX + 35), y: y };
        },
        formatter: hcTooltipFormatter,
      };
    };



    setOptions({
      responsive: { ...getHcResponsiveRules(CHART_TYPES.COUNTS) },
      chart: {
        type: 'line',
        // marginLeft: 60,
        // marginRight: 60,
        // spacingTop: 20,
        // spacingBottom: 20,
        zoomType: 'x'
      },
      title: {
        text: 'datasets 1-5',
        align: 'left',
        margin: 0,
        x: 30
      },
      credits: {
        enabled: false
      },
      legend: legend,
      xAxis: {
        ...getXAxisCommon(),
      },
      yAxis: [
        {
          gridZIndex: 2,
          title: {
            text: undefined,
          },
          labels: {
            x: -2,
            y: 10,
            style: {
              //width: '40px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              color: "#333333",
              fontSize: '9px',
              textAlign: 'left'
            },
            format: "{value}",
            formatter: formatAbbrWholeCurrency,
          },
        },
        { // sales rank axis
          gridZIndex: 2,
          title: {
            text: undefined,
          },
          reversed: false,
          opposite: true,
          labels: {
            x: 2,
            y: 10,
            style: {
              color: "#333333",
              fontSize: '9px',
              textAlign: 'right'
            },
            formatter: formatAbbrThousands,

          },
        }
      ],
      tooltip: getHcTooltip(),
      plotOptions: {
        series: {
          states: {
            hover: {
              enabled: false
            },
            inactive: {
              opacity: 1
            },
          },
          lineWidth: 1.5,
          step: 'left',
          opacity: 1,
          fillOpacity: 0.3,
          events: {
            mouseOut: function (this: any) {
              this.update({
                marker: {
                  enabled: false
                }
              });
            }
          }
        },
        area: {
          fillOpacity: 0.3
        }
      },
      series: [
        {
          type: "area",
          name: "Amazon",
          data: datasets[0].data,
          visible: true,
          custom: {
            type: 'money',
          },

          color: "#FF9900",
          fillColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, '#FEE2C5'], // start
              //					[0, '#FEE6CE'], // start
              //	[0.5, '#FEE6CE'], // middle
              [1, '#FEEFE0'] // end
            ]
          },

          zIndex: 1,

          fillOpacity: 0.2,
          //lineWidth: DEFAULT_LINE_WIDTH,
          marker: {
            enabled: false,
          },
          yAxis: 0,
        },
        {
          name: "FBA",
          data: datasets[1].data,
          color: "#ff5722",
          //	lineWidth: DEFAULT_LINE_WIDTH,
          custom: {
            type: 'money',
          },

          marker: {
            enabled: false,
            //	lineWidth: 1,
            lineColor: null, // inherit from series
            fillColor: "#ffffff00",
            symbol: "triangle"
          },
          states: {
            hover: {
              enabled: true,
              lineWidth: 1
            }
          },
          zIndex: 5,
          yAxis: 0,

        },

        {
          name: "FBM",
          data: datasets[2].data,
          visible: true,
          custom: {
            type: 'money',
          },

          color: "#039be5",
          //		lineWidth: DEFAULT_LINE_WIDTH,
          marker: {
            enabled: false,
            //	lineWidth: 1,
            lineColor: null, // inherit from series
            fillColor: "#ffffff00",
            symbol: "square"
          },
          states: {
            hover: {
              enabled: true,
              lineWidth: 1
            }
          },
          zIndex: 5,

        },


        {
          name: "Buy Box",
          data: datasets[3].data,
          color: "#ff00b4",
          custom: {
            type: 'money',
          },

          //	lineWidth: 1,

          marker: {
            enabled: false,
          },

          states: {
            hover: {
              enabled: true,
              lineWidth: 1
            }
          },
          zIndex: 5,

        },
        {
          name: "New",
          data: datasets[4].data,
          color: "#8888DD",
          //lineWidth: DEFAULT_LINE_WIDTH,
          visible: false,
          custom: {
            type: 'money',
          },

          states: {
            hover: {
              enabled: true,
              lineWidth: 1
            }
          },
          zIndex: 5,

        },
        {
          name: "Sales Rank",
          yAxis: 1,
          visible: true,
          data: datasets[5].data,
          //        color: "#ff00b4",
          color: "#8fbc8f",
          //lineWidth: DEFAULT_LINE_WIDTH,
          marker: {
            enabled: false,
          },
          zIndex: 1,
        },
      ],
    });
    // Updated getStart function
    if (datasets[6].data.length) {
      setTwoCheck(true);
    } else {
      setTwoCheck(false);
    }

    setChartTwo({
      responsive: { ...getHcResponsiveRules(CHART_TYPES.COUNTS) },
      chart: {
        type: 'line',
        // marginLeft: 60,
        // marginRight: 60,
        spacingTop: 20,
        // spacingBottom: 20,
        zoomType: 'x'
      },
      title: {
        text: "Dataset 6",
        align: 'left',
        margin: 0,
        x: 30
      },
      credits: {
        enabled: false
      },
      legend: legend,
      xAxis: {
        ...getXAxisCommon(),
      },
      yAxis: [
        {
          style: {
            width: '40px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          },
          gridZIndex: 2,
          allowDecimals: false,
          reversed: false,
          title: {
            text: undefined,
          },
          labels: {
            x: -2,
            y: 10,
            enabled: true,
            formatter: formatAbbrThousands,
            style: {
              color: "#333333",
              fontSize: '9px',
              textAlign: 'right'
            },
          },
        },
        {
          title: {
            text: "Sold in past month",
            style: {
              color: "#333333",
              fontSize: '8px',
              textAlign: 'right'
            },
          },
          opposite: true,
        },
      ],
      tooltip: getHcTooltip(),
      plotOptions: {
        series: {
          states: {
            hover: {
              enabled: false
            },
            inactive: {
              opacity: 1
            },

          },
          marker: {
            enabled: false,
            symbol: 'square',
            radius: 4
          },
          lineWidth: 1.5,
          step: 'left',
          opacity: 1,
          fillOpacity: 0.3,
          events: {
            mouseOut: function (this: any) {
              this.update({
                marker: {
                  enabled: false
                }
              });
            }
          }
        },
        area: {
          fillOpacity: 0.3
        }
      },
      series: [
        {
          name: "Monthly Sold",
          data: datasets[6].data,
          color: "#DAA520",
          lineWidth: 1,
          marker: {
            enabled: false,
          },
          custom: {
            type: 'monthly_sold',
          },
          zIndex: 5,
          yAxis: 0,
        },
      ],
    });


    setChartThree({
      responsive: { ...getHcResponsiveRules(CHART_TYPES.COUNTS) },
      chart: {
        type: 'line',
        // marginLeft: 60,
        // marginRight: 60,
        spacingTop: 20,
        // spacingBottom: 20, 
        zoomType: 'x'
      },
      title: {
        text: "Combined Datasets 7-9",
        align: 'left',
        margin: 0,
        x: 30
      },
      credits: {
        enabled: false
      },
      legend: legend,
      xAxis: {
        ...getXAxisCommon(),
      },
      yAxis: [{
        style: {
          width: '40px',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        },
        gridZIndex: 2,
        allowDecimals: false,
        reversed: false,
        title: {
          text: undefined, //'Offers',
        },
        labels: {
          x: -2,
          y: 10,
          format: "{value}",
          style: {
            color: "#333333",
            fontSize: '9px',
            textAlign: 'left'
          },
        },
      },
      { // rating, on a different scale
        visible: false,
        style: {
          //	width: '40px',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        },
        title: {
          text: undefined, //'Rating',
        },
        labels: {
          format: "{value}*",
          style: {
            color: "#333333",
          },
        },
        max: 5,
        softMin: 1,
        //			tickAmount: 5
        tickPositions: [1, 2, 3, 4, 5],
      },
      { //Review counts
        reversed: false,
        opposite: true,
        title: {
          text: undefined,
        },
        labels: {
          x: 2,
          y: 10,
          style: {
            color: "#333333",
            fontSize: '9px',
            textAlign: 'right'
          },
          formatter: formatAbbrThousands,
        },
      }
      ],
      tooltip: getHcTooltip(),
      plotOptions: {
        series: {
          states: {
            hover: {
              enabled: false
            },
            inactive: {
              opacity: 1
            },
          },
          marker: {
            enabled: false,
            symbol: 'square',
            radius: 4
          },
          lineWidth: 1.5,
          step: 'left',
          opacity: 1,
          fillOpacity: 0.3,
          events: {
            mouseOut: function (this: any) {
              this.update({
                marker: {
                  enabled: false
                }
              });
            }
          }
        },
        area: {
          fillOpacity: 0.3
        }
      },
      series: [
        {
          name: "Offer Count",
          data: datasets[7].data,
          color: "#8888dd",
          lineWidth: 1,
          marker: {
            enabled: false,
          },
          zIndex: 5,
          yAxis: 0,
        },
        {
          name: "Rating",
          yAxis: 1, // different Y axis for scale
          data: datasets[8].data,
          color: "#009688",
          lineWidth: 1,
          custom: {
            type: 'rating',
          },
          marker: {
            enabled: false,
          },
          zIndex: 5,
        },
        {
          name: "Review Count",
          yAxis: 2,
          data: datasets[9].data,
          color: "#8ab300",
          lineWidth: 1,
          marker: {
            enabled: false,
          },
          zIndex: 15,
        },
      ],
    });
    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [chartsData]);

  return (
    <div id="container" style={{ width: '100%', height: '600px !important' }}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: '230px' } }}
      />
      {twoCheck && (
        <HighchartsReact highcharts={Highcharts} options={chartTwo}
          containerProps={{ style: { height: '180px' } }}
        />
      )}
      <HighchartsReact highcharts={Highcharts} options={chartThree}
        containerProps={{ style: { height: '180px' } }}
      />

    </div>
  );
};

export default ChartDemo;
