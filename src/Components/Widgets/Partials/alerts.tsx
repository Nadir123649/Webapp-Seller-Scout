import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";

interface AlertProps {
  data: any;
}
const Alerts = ({ data }: AlertProps) => {
  return (
    <>
      {/* <div className="login-sc-msg-box">
        <p className="mb-0 p-0">
          Some alerts require you to be logged in to Seller Central
        </p>
        <button className="btn-refresh seller-btn">Login</button>
      </div> */}

      <table className="table table-bordered table-striped">
        <tbody>
          <tr>
            <td style={{ width: " 38%" }}>
              <span className="seller-description">Amazon Share Buy Box</span>
            </td>
            <td style={{ textAlign: "right", verticalAlign: "middle" }}>
              <span className="good-hl d-flex align-items-center justify-content-end">
                {data?.alerts?.amazonShareBuyBox
                  ? data?.alerts?.amazonShareBuyBox
                  : "-"}
              </span>
            </td>
          </tr>
          <tr>
            <td style={{ width: " 38%" }}>
              <span className="seller-description">Private Label</span>
            </td>
            <td style={{ textAlign: "right", verticalAlign: "middle" }}>
              <span className="good-hl">
                {data?.alerts?.privateLabel ? (
                  <>
                    <RiErrorWarningLine size={16} className="me-1" />
                    data?.alerts?.privateLabel
                  </>
                ) : (
                  "-"
                )}
              </span>
            </td>
          </tr>
          <tr>
            <td style={{ width: " 38%" }}>
              <span className="seller-description">IP Analysis</span>
            </td>
            <td style={{ textAlign: "right", verticalAlign: "middle" }}>
              <span className="good-hl d-flex align-items-center justify-content-end">
                {data?.alerts?.ipAnalysis ? data?.alerts?.ipAnalysis : "-"}
              </span>
            </td>
          </tr>
          <tr>
            <td style={{ width: " 38%" }}>
              <span className="seller-description">Size</span>
            </td>
            <td style={{ textAlign: "right", verticalAlign: "middle" }}>
              <span className="good-hl d-flex align-items-center justify-content-end">
                {data?.alerts?.size ? data?.alerts?.size : "-"}
              </span>
            </td>
          </tr>
          {/* <tr>
            <td style={{ width: " 38%" }}>
              <span className="seller-description">Fulfillment Fee</span>
            </td>
            <td style={{ textAlign: "right", verticalAlign: "middle" }}>
              <span className="warning-hl d-flex align-items-center justify-content-end">
                <RiErrorWarningLine size={16} className=" me-1" />
                FBM Fee is zero
              </span>
            </td>
          </tr> */}
          <tr>
            <td style={{ width: " 38%" }}>
              <span className="seller-description">Meltable</span>
            </td>
            <td style={{ textAlign: "right", verticalAlign: "middle" }}>
              <span className=" good-hl d-flex align-items-center justify-content-end">
                {data?.alerts?.meltable ? "Yes" : "No"}
              </span>
            </td>
          </tr>
          <tr>
            <td style={{ width: " 38%" }}>
              <span className="seller-description">Variations</span>
            </td>
            <td style={{ textAlign: "right", verticalAlign: "middle" }}>
              <span className="warning-hl">
                {data?.alerts?.variations ? (
                  <>
                    <RiErrorWarningLine size={16} className=" me-1" />
                    This listing has {data?.alerts?.variations} variations{" "}
                  </>
                ) : (
                  "-"
                )}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Alerts;
