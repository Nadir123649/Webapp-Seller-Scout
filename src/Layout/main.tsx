import React, { useEffect, useState } from "react";
import "./layout.css";
import "../App.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Contact from "../Components/Contact";


const Main: React.FunctionComponent = () => {
  const [isOpen, setSidebarCollapsed] = useState<any>(true);
  const [isWidgetScan, setisWidgetScan] = useState<any>(false);

  const toggleSidebar = () => {

    setSidebarCollapsed(!isOpen);

  };

  useEffect(() => {
    if (isWidgetScan) {
      setSidebarCollapsed(false);
    }
    setTimeout(() => {
      setisWidgetScan(false)
    }, 100);
  }, [isWidgetScan]);
  return (
    <div>
      <FontAwesomeIcon
        icon={faBars}
        onClick={toggleSidebar}
        className="toggle"
      />
      <div className={`layout-fixed ${isOpen ? "open" : ""}`}>
        <Sidebar isWidgetScan={setisWidgetScan} />
      </div>
      <div className={`outlet-layout ${isOpen ? "shifted" : ""}`}>
        <Outlet />
      </div>
      <div className="contact-query">
        <Contact />
      </div>
    </div>
  );
};

export default Main;
