import React, { useEffect, useState } from "react";
import "./index.css";
import Offers from "./Partials/offers";
import ProfitCalculator from "./Partials/profitCalculator";
import Product from "./Partials/product";
import { notesButton } from "../../constants";
import QuickInfo from "./Partials/quickInfo";
import RanksAndPrices from "./Partials/ranksAndPrices";
import {
  getBuyBoxAnalysis,
  getCharts,
  getNotes,
  getProductInfo,
  getProductVariations,
  getRanksAndPrices,
  getSellerOffers,
  profitCalculate,
} from "../../Service/services";
import toast from "react-hot-toast";
import Loader from "../Loader";
import {
  formatElapsedTime,
  handleOfferValues,
  handleRoiValues,
  handleSaleValue,
  handleValues,
} from "../../helpers";
import Widget from "./widget";
import Analysis from "./Partials/analysis";
import Charts from "./Partials/charts";
import Alerts from "./Partials/alerts";
import SellerCentral from "./Partials/sellerCentral";
import Ebay from "./Partials/ebay";
import VatSettings from "./Partials/vatSettings";
import Notes from "./Partials/notes";
import Marketplace from "./Partials/marketplace";
type DropdownState = {
  productDetails: boolean;
  quickInfo: boolean;
  profitCalculator: boolean;
  offers: boolean;
  ranks: boolean;
  sellerCentral: boolean;
  eBay: boolean;
  search: boolean;
  notesTags: boolean;
  geolocation: boolean;
  vatSettings: boolean;
  discounts: boolean;
  europeanMarketPlaces: boolean;
  roi: boolean;
  lookupDetails: boolean;
  alerts: boolean;
  keepa: boolean;
  variationBeta: boolean;
  buyBoxAnalysis: boolean;
  charts: boolean;
};
interface resultprops {
  searchResult: string;
}
interface errorResponse {
  data: {
    ErrorMessage?: string;
  };
}
interface ProfitCalculator {
  costPrice?: number;
  salePrice?: number;
  totalFees?: any;
  FBMCost?: any;
}

interface ProductDetails {
  profitCalculator?: ProfitCalculator;
  quickInfo?: any;
}
interface CSVData {
  date: Date;
  price: number;
}
const Widgets = ({ searchResult }: resultprops) => {
  const [offers, setOffers] = useState<any>({});
  const [roi, setRoi] = useState<any>([]);
  const [ebay, setEbay] = useState<any>([]);
  const [productDetails, setProductDetails] = useState<any>({});
  const [fulFillmentType, setFulFillmentType] = useState<any>(0);
  const [offersFilter, setOffersFilter] = useState<any>({});
  const [buyBoxAnalysis, setBuyBoxAnalysis] = useState([]);
  const [productVariation, setProductVariation] = useState<any>([]);
  const [selectedDay, setSelectedDay] = useState<any>("90");
  const [processedData, setProcessedData] = useState<any>({});
  const [orignalData, setOrignalDate] = useState<any>({});

  const [dropdownStates, setDropdownStates] = useState({
    productDetails: false,
    quickInfo: false,
    profitCalculator: false,
    offers: false,
    ranks: false,
    sellerCentral: false,
    eBay: false,
    search: false,
    notesTags: false,
    geolocation: false,
    vatSettings: false,
    discounts: false,
    europeanMarketPlaces: false,
    roi: false,
    lookupDetails: false,
    alerts: false,
    keepa: false,
    variationBeta: false,
    buyBoxAnalysis: false,
    charts: false,
  });
  //   const [activeKey, setActiveKey] = useState("1");
  const [loading, setLoading] = useState(false);
  const [ranksAndPrices, setRanksAndPrices] = useState({});
  const [ranksLoader, setRanksLoader] = useState(false);
  const [sellerCentral, setSellerCentral] = useState<any>([]);
  const [notes, setAllNotes] = useState<any>([]);
  const [buyBoxLoader, setBuyBoxLoader] = useState(false);
  const [chartsData, setChartsData] = useState<any>([]);

  const [rankFilter, setRankFilter] = useState(0);
  const [chartsFilter, setChartsFilter] = useState(0);
  const [chartsLoader, setChartsLoader] = useState(false);

  const [buyBoxFilter, setBuyBoxFilter] = useState(90);

  const [totalDiscount, setTotalDiscount] = useState<any>("");
  const [referralFeePercentage, setReferralFeePercentage] = useState(0);
  let earliestKeepaTimestamp: any = null, latestKeepaTimestamp: any = null;
  const getProductDetails = async () => {
    try {
      setLoading(true);
      setRankFilter(0);

      const response = await getProductInfo(searchResult);
      if (response) {
        const salesValue = handleSaleValue(response?.data, "quickInfo");
        const updatedValue = handleValues(salesValue, "quickInfo", 0);
        setProductDetails(updatedValue);

        const ebayLinks = [
          {
            type: "text",
            title: "Search eBay",
            link: response?.data?.eBay?.searchEBay,
            target: "_blank",
          },
          {
            type: "text",
            title: "Sold on eBay",
            link: response?.data?.eBay?.soldOnEBay,
            target: "_blank",
          },
        ];


        const sellerCentralLinks = [
          {
            type: "icon",
            icon: "TiHome",
            link: response?.data?.sellerCentral?.home,
            target: "_blank",
          },
          {
            type: "text",
            title: "Add Product",
            link: response?.data?.sellerCentral?.addProduct,
            target: "_blank",
          },
          {
            type: "text",
            title: "Inventory",
            link: response?.data?.sellerCentral?.inventory,
            target: "_blank",
          },
          {
            type: "text",
            title: "Orders",
            link: response?.data?.sellerCentral?.orders,
            target: "_blank",
          },
        ];

        setEbay(ebayLinks);
        setSellerCentral(sellerCentralLinks);
        await getRanks();
        await getAllNotes();
        await getOffers(
          response?.data,
          false,
          false,
          updatedValue?.quickInfo?.costPrice
        );
        await getBuyBox();
        await getProductVariation();
        getChartsData();
        setDropdownStates((prevState) => ({
          ...prevState,
          productDetails: true,
          quickInfo: true,
          profitCalculator: true,
          offers: true,
          ranks: true,
          sellerCentral: true,
          eBay: true,
          search: true,
          notesTags: true,
          geolocation: true,
          vatSettings: true,
          discounts: true,
          europeanMarketPlaces: true,
          roi: true,
          lookupDetails: true,
          alerts: true,
          keepa: true,
          variationBeta: true,
          buyBoxAnalysis: true,
          charts: true,
        }));
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.ErrorMessage);
    } finally {
      setLoading(false);
    }
  };


  const getRanks = async () => {
    try {
      setRanksLoader(true);

      const response = await getRanksAndPrices(searchResult, rankFilter);

      if (response) {
        setRanksAndPrices(response?.data);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.title);
    } finally {
      setRanksLoader(false);
    }
  };

  const getOffers = async (
    productData: any,
    prime: any,
    live: any,
    cost: any
  ) => {
    try {
      setOffersFilter({
        prime: prime === "true" ? true : false,
        live,
      });
      const response = await getSellerOffers(searchResult, prime, live, cost);
      if (response) {
        // const offerValues = await handleOfferValues(
        //   response?.data,
        //   productData ?? productDetails,
        //   "quickInfo"
        // );
        setOffers(response?.data);
        return response?.data;
      }
    } catch (error: any) {
      console.log(
        error?.response?.data?.ErrorMessage ?? error?.response?.data?.title
      );
      // toast.error(
      //   error?.response?.data?.ErrorMessage ?? error?.response?.data?.title
      // );
    }
  };

  const getBuyBox = async () => {
    try {
      setBuyBoxLoader(true);
      const response = await getBuyBoxAnalysis(searchResult, buyBoxFilter);

      if (response) {
        const transformedData = response?.data?.map((item: any) => {
          const currentTime = new Date().getTime();
          const lastWonTime = new Date(item?.data?.lastWon).getTime();
          const elapsedTime = currentTime - lastWonTime;
          return {
            seller: item.sellerName,
            avgPrice: "$" + (item.data.avePrice / 100).toFixed(2),
            won: item?.data?.wonPercentage,

            lastWon: formatElapsedTime(elapsedTime),
            stock: item.data.stock,
            type: item.data.type,
            currentRatingCount: item.currentRatingCount,
            currentRating: item.currentRating,
          };
        });

        setBuyBoxAnalysis(transformedData);
      }
    } catch (error: any) {
      setBuyBoxLoader(false);
      toast.error(error?.response?.data?.ErrorMessage);
    } finally {
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await getNotes(searchResult);
      if (response) {
        setAllNotes(response?.data);
      }
    } catch (error: any) {
      console.error(
        error?.response?.data?.ErrorMessage ?? error?.response?.data?.title
      );
    }
  };

  const getChartsData = async () => {
    try {

      setChartsLoader(true);

      const response = await getCharts(searchResult, chartsFilter);

      if (response) {
        setChartsData(response?.data);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.ErrorMessage);
    } finally {
      setChartsLoader(false);
    }
  };

  const getProductVariation = async () => {
    try {
      const response = await getProductVariations(searchResult);
      if (response) {
        setProductVariation(response?.data);
      }
    } catch (error: any) {
      console.error(
        error?.response?.data?.ErrorMessage ?? error?.response?.data?.title
      );
    }
  };

  const calculateProfit = async (
    updatedValues?: ProductDetails,
    type?: any,
    saleType?: any
  ) => {
    const data =
      fulFillmentType === 0
        ? {
          asin: searchResult,
          cost: updatedValues
            ? updatedValues?.profitCalculator?.costPrice
            : productDetails?.profitCalculator?.costPrice,
          price:
            updatedValues && type === "quickInfo"
              ? updatedValues?.quickInfo?.salePrice
              : updatedValues && type === "profitCalculator"
                ? updatedValues?.profitCalculator?.salePrice
                : productDetails && type === "quickInfo"
                  ? productDetails?.quickInfo?.salePrice
                  : productDetails?.profitCalculator?.salePrice,
          fulfillmentMethod: fulFillmentType,
        }
        : {
          asin: searchResult,
          cost: updatedValues
            ? updatedValues?.profitCalculator?.costPrice
            : productDetails?.profitCalculator?.costPrice,
          price:
            updatedValues && type === "quickInfo"
              ? updatedValues?.quickInfo?.salePrice
              : updatedValues && type === "profitCalculator"
                ? updatedValues?.profitCalculator?.salePrice
                : productDetails && type === "quickInfo"
                  ? productDetails?.quickInfo?.salePrice
                  : productDetails?.profitCalculator?.salePrice,
          fulfillmentMethod: fulFillmentType,
          fbmCost:
            updatedValues && updatedValues?.profitCalculator?.FBMCost
              ? updatedValues?.profitCalculator?.FBMCost
              : productDetails?.profitCalculator?.FBMCost
                ? productDetails?.profitCalculator?.FBMCost
                : 0,
        };

    if (productDetails?.profitCalculator) {
      try {
        const response = await profitCalculate(data);
        if (response?.status === 200) {
          let productValues: ProductDetails;
          setReferralFeePercentage(response?.data?.referralFeePercentage);
          if (updatedValues) {
            productValues = { ...updatedValues };
          } else {
            productValues = { ...productDetails };
          }
          if (!productValues.profitCalculator) {
            productValues.profitCalculator = {};
          }
          if (response?.data?.totalFees) {
            if (fulFillmentType == 1) {
              productValues.profitCalculator.totalFees = {
                ...response.data.totalFees,
                fulfilment_FBM: response.data.totalFees.fulfilment_FBA,
              };
              delete productValues.profitCalculator.totalFees.fulfilment_FBA;
            } else {
              productValues.profitCalculator.totalFees =
                response.data.totalFees;
            }
          }
          const salesValue = handleSaleValue(productValues, "quickInfo");
          const updatedValue = handleValues(salesValue, type, totalDiscount);
          setProductDetails(updatedValue);
          if (!saleType) {
            const offerValues = await handleOfferValues(
              offers,
              productValues,
              type
            );
            setOffers(offerValues);
            const roiValues = handleRoiValues(roi, productValues, type);
            setRoi(roiValues);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleToggle = (dropDownName: keyof DropdownState) => {
    setDropdownStates((prevState: DropdownState) => ({
      ...prevState,
      [dropDownName]: !prevState[dropDownName],
    }));
  };

  useEffect(() => {
    if (searchResult && rankFilter >= 0) getRanks();
  }, [rankFilter]);

  useEffect(() => {
    if (searchResult) getChartsData();
  }, [chartsFilter]);
  useEffect(() => {
    if (searchResult) getProductDetails();
  }, [searchResult]);

  useEffect(() => {
    if (fulFillmentType == 0 || fulFillmentType == 1) {
      calculateProfit(productDetails, "quickInfo");
    }
  }, [fulFillmentType]);

  useEffect(() => {
    if (searchResult && buyBoxFilter) getBuyBox();
  }, [buyBoxFilter]);

  const processCSVData = (csvData: number[], type?: any, key?: any): CSVData[] => {
    if (!csvData || csvData.length === 0) {
      return [];
    }
    const keepaMinutesToDate = (keepaMinutes: number): Date => {
      const epochTime = (keepaMinutes + 21564000) * 60000;
      return new Date(epochTime);
    };

    const testData: CSVData[] = [];
    let date: any, price: number;
    for (let i = 0; i < csvData?.length;) {
      const date = keepaMinutesToDate(csvData[i]);
      const price = (() => {
        if (type === 'rating') {
          return csvData[i + 1] / 10;
        } else if (type === 'ReviewCount') {
          return csvData[i + 1];
        } else if (type) {
          return csvData[i + 1];
        } else {
          return csvData[i + 1] / 100;
        }
      })();

      const year = new Date(date).getFullYear();
      if (price > 0) {
        testData.push({ date, price });
      }
      key !== 'buyBoxData' ? i += 2 : i += 3;
    }


    return testData;
  };
  const keepaTimeToUnixDateTime = (keepaMinutes: number): number => {
    return (keepaMinutes + 21564000) * 60000;
  };

  const transformKeepaCsv = (keepaCsv: any[], key: string): any[] => {
    const transformedKeepaData: any[] = [];
    let lMinTimestamp = 0;
    let latestKeepaTimestamp = -1;
    let earliestKeepaTimestamp = -1;

    if (keepaCsv) {
      let previousFinalValue = 0;

      for (let valueIndex = 0; valueIndex < keepaCsv.length; valueIndex += 2) {
        const lUnixDateTime = keepaTimeToUnixDateTime(keepaCsv[valueIndex]);

        if (lUnixDateTime < lMinTimestamp) {
          // Ignore data points that are older than the limit
          continue;
        }

        let rawValue1 = keepaCsv[valueIndex + 1];
        rawValue1 = (rawValue1 !== null && rawValue1 !== undefined) ? rawValue1 : 0;
        rawValue1 = rawValue1 <= 0 ? -1 : rawValue1;

        let finalValue = (rawValue1 <= 0) ? null : rawValue1;

        if (key === "RATING") {
          finalValue = finalValue / 10;
        }

        if (finalValue === null) {
          // Ensure the array at valueIndex is initialized
          if (!transformedKeepaData[valueIndex]) {
            transformedKeepaData[valueIndex] = [];
          }
          // Hack the data to inject a dummy point at the previous value 1 tick before the null
          const dummyValue = [lUnixDateTime - 1, previousFinalValue];
          transformedKeepaData[valueIndex].push(dummyValue);
        }

        const transformedValue = [lUnixDateTime, finalValue];

        latestKeepaTimestamp = Math.max(latestKeepaTimestamp, transformedValue[0]);
        earliestKeepaTimestamp = earliestKeepaTimestamp === -1 ? transformedValue[0] : Math.min(earliestKeepaTimestamp, transformedValue[0]);

        let lPrev: any = null;

        if (transformedKeepaData.length) {
          lPrev = transformedKeepaData[transformedKeepaData.length - 1]?.slice();
        } else {
          lPrev = transformedValue.slice();
        }


        lPrev[0] = transformedValue[0] - 1;
        transformedKeepaData.push(lPrev);

        transformedKeepaData.push(transformedValue);
        previousFinalValue = finalValue;

        // let lPrev: any = null;

        // if (transformedKeepaData[valueIndex]) {
        //   lPrev = transformedKeepaData[transformedKeepaData[valueIndex].length - 1]?.slice();
        // } else {
        //   transformedKeepaData[valueIndex] = [];
        //   lPrev = transformedValue.slice();
        // }

        // lPrev[0] = transformedValue[0] - 1;

        // transformedKeepaData.push({ 
        //   date: new Date(transformedValue[0]),
        //   price: transformedValue[1]
        // });
        // previousFinalValue = finalValue;
      }
    }

    return transformedKeepaData;
  };

  useEffect(() => {

    const AmazonData = processCSVData(chartsData?.csv?.[0]);
    const FBAData = processCSVData(chartsData?.csv?.[10]);
    const FBMData = processCSVData(chartsData?.csv?.[7]);
    const buyBoxData = processCSVData(chartsData?.csv?.[18], null, 'buyBoxData');
    const newData = processCSVData(chartsData?.csv?.[1]);
    const salesRankData = processCSVData(chartsData?.csv?.[3], "notPrice");
    const monthlySoldData = processCSVData(
      chartsData?.monthlySoldHistory,
      "notPrice"
    );
    const offersCountData = processCSVData(
      chartsData?.csv?.[11],
      "notPrice",
      "offersCountData",
    );
    const currentUnixTime = Math.floor(Date.now() / 1000);
    const date = new Date(currentUnixTime * 1000);
    const formattedDate = date.toString();
    // const ratingData2 = processCSVData(chartsData?.csv?.[16], 'notPrice', 'rating');
    const transformedData = transformKeepaCsv(chartsData?.csv?.[16], 'RATING');
    let ratingData = transformedData.map(([dateStr, price]) => ({
      date: new Date(dateStr),
      price
    }));
    if (ratingData.length > 0) {
      let lastObject = ratingData[ratingData.length - 1];
      ratingData.push({
        date: date,
        price: lastObject.price,
      });
    }

    const reviewCountData = processCSVData(chartsData?.csv?.[17], "ReviewCount");


    const monthlySold = {
      date: new Date(formattedDate),
      price: chartsData?.monthlySold || 0,
    };
    if(monthlySoldData.length) monthlySoldData.push(monthlySold);
    const allProcessedData = [
      AmazonData,
      FBAData,
      FBMData,
      buyBoxData,
      newData,
      salesRankData,
      monthlySoldData,
      offersCountData,
      ratingData,
      reviewCountData
    ];
    setProcessedData(allProcessedData);
    setOrignalDate(allProcessedData);

  }, [chartsData]);
  return (
    <>
      {loading ? (
        <div className="loading-loader">
          <Loader />
        </div>
      ) : (
        <div className=" mb-3 grid-container">
          <div className="grid-item d-flex flex-column gap-2">
            <div className="product-container">
              <Product
                productDetails={productDetails?.productDetails}
                activeKey={dropdownStates}
                setActiveKey={setDropdownStates}
                handleToggle={handleToggle}
              />
            </div>
            <div className="offers-container">
              <Widget
                title="Offers"
                icon="shoppingcart"
                activeKey={dropdownStates}
                setActiveKey={setDropdownStates}
                handleToggle={handleToggle}
                children={
                  <Offers
                    offers={offers}
                    getOffers={getOffers}
                    productDetails={productDetails}
                  />
                }
              />
            </div>
            <div className="ebay-container">
              <Widget
                title="Seller Central"
                icon="amazon"
                activeKey={dropdownStates}
                setActiveKey={setDropdownStates}
                handleToggle={handleToggle}
                children={<SellerCentral data={sellerCentral} />}
              />
            </div>
            <div className="ebay-container">
              <Widget
                title="eBay"
                icon="e"
                activeKey={dropdownStates}
                setActiveKey={setDropdownStates}
                handleToggle={handleToggle}
                children={<Ebay data={ebay} />}
              />
            </div>
          </div>
          <div className="grid-item d-flex flex-column gap-2">
            <div className="profit-calculator">
              <ProfitCalculator
                productDetails={productDetails}
                setProductDetails={setProductDetails}
                activeKey={dropdownStates}
                setActiveKey={setDropdownStates}
                handleToggle={handleToggle}
                offers={offers}
                setOffers={setOffers}
                roi={roi}
                setRoi={setRoi}
                totalDiscount={totalDiscount}
                setFulFillmentType={setFulFillmentType}
                calculateProfit={calculateProfit}
                referralFee={referralFeePercentage}
                getOffers={getOffers}
                offersFilter={offersFilter}
              />
            </div>
            <div className="ebay-container">
              <Widget
                title="Buy Box Analysis"
                icon="piechart"
                activeKey={dropdownStates}
                setActiveKey={setDropdownStates}
                handleToggle={handleToggle}
                children={
                  <Analysis
                    buyBoxAnalysis={buyBoxAnalysis}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    setBuyBoxFilter={setBuyBoxFilter}
                    buyBoxLoader={buyBoxLoader}
                    setBuyBoxLoader={setBuyBoxLoader}
                  />
                }
              />
            </div>
            <div className="ebay-container">
              <Widget
                title="Vat Settings"
                icon="scale"
                activeKey={dropdownStates}
                setActiveKey={setDropdownStates}
                handleToggle={handleToggle}
                children={<VatSettings data={[]} />}
              />
            </div>
          </div>
          <div className="grid-item d-flex flex-column gap-2">
            <div className="quick-info">
              <QuickInfo
                productDetails={productDetails}
                setProductDetails={setProductDetails}
                offers={offers}
                setOffers={setOffers}
                roi={roi}
                setRoi={setRoi}
                activeKey={dropdownStates}
                setActiveKey={setDropdownStates}
                handleToggle={handleToggle}
                totalDiscount={totalDiscount}
                calculateProfit={calculateProfit}
                getOffers={getOffers}
                offersFilter={offersFilter}
              />
            </div>
            <div className="ebay-container">
              <Widget
                title="Charts"
                icon="charts"
                activeKey={dropdownStates}
                setActiveKey={setDropdownStates}
                handleToggle={handleToggle}
                children={
                  <Charts
                    chartsData={processedData}
                    orignalData={orignalData}
                    chartsFilter={chartsFilter}
                    chartsLoader={chartsLoader}
                    setChartsLoader={setChartsLoader}
                  />
                }
              />
            </div>
            <div className="ebay-container">
              <Widget
                title="European Marketplaces"
                icon="market"
                activeKey={dropdownStates}
                setActiveKey={setDropdownStates}
                handleToggle={handleToggle}
                children={<Marketplace />}
              />
            </div>
          </div>
          <div className="grid-item d-flex flex-column gap-2">
            <div className="ranks-and-prices">
              <RanksAndPrices
                ranksAndPrices={ranksAndPrices}
                rankFilter={rankFilter}
                setRankFilter={setRankFilter}
                activeKey={dropdownStates}
                loading={ranksLoader}
                setActiveKey={setDropdownStates}
                getRanksAndPrices={getRanks}
                handleToggle={handleToggle}
              />
            </div>
            <div className="ebay-container">
              <Widget
                title="Alerts"
                icon="alert"
                activeKey={dropdownStates}
                setActiveKey={setDropdownStates}
                handleToggle={handleToggle}
                data={productVariation}
                children={<Alerts data={productVariation} />}
              />
            </div>
            <div className="ebay-container">
              <Widget
                title="Notes & Tags"
                icon="flag"
                activeKey={dropdownStates}
                setActiveKey={setDropdownStates}
                handleToggle={handleToggle}
                children={
                  <Notes
                    data={notesButton}
                    productDetails={productDetails}
                    getAllNotes={getAllNotes}
                    notes={notes}
                    setAllNotes={setAllNotes}
                  />
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Widgets;
