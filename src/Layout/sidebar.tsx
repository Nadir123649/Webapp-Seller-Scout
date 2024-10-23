import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { routes } from "./routes";
import UploadFile from "../Components/UploadFIle";

interface SiderbarProps {
  isWidgetScan: any;
}

const Sidebar = ({ isWidgetScan }: SiderbarProps) => {
  const handleLinkClick = (link: any, event: any) => {
    if (link === "*") {
      event.preventDefault();
    }
    if (link === "/widgets") {
      isWidgetScan(true);
    }
  };

  useEffect(() => {
    const currentURL = window.location.href;
    if (currentURL.endsWith("/widgets")) {
      isWidgetScan(true);
    }
  }, []);

  return (
    <div>
      <div className="layout">
        <UploadFile />
        <ul className="your-list-class p-0">
          {routes.map((route, index) => {
            return (
              <li key={index} className="list-name">
                <div className="router-name">
                  <NavLink
                    to={route.link}
                    className="route-link"
                    onClick={(e) => handleLinkClick(route.link, e)}
                  >
                    <div className="d-flex align-items-center">
                      <p className="p-0 m-0 mx-1 icon-items">{route.icon}</p>
                      <p className="p-0 m-0 mx-1 icon-items">{route.name}</p>
                    </div>
                  </NavLink>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
