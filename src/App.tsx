import React, { useContext, useState } from "react";
import logo from "./logo.svg";
import Main from "./Layout/main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Setting from "./Components/Setting";
import ProductFolder from "./Components/ProductsFolder";
import Scan from "./Components/Scan";
import ParticularItem from "./Components/ParticularItem";
import MyScan from "./Components/ScanProduct";
import Login from "./UserLoginFlow/login";
import ResetPassword from "./UserLoginFlow/resetPassword";
import Register from "./UserLoginFlow/register";
import Header from "./Layout/header";
import Widgets from "./Components/Widgets";
import { SearchContext } from "./context/searchContext";
import BigCharts from "./Components/Widgets/Partials/bigCharts";
const accessToken = localStorage.getItem("accessToken");
function App() {
  const { searchValue, setSearchValue } =
    useContext(SearchContext) ??
    (() => {
      throw new Error(
        "SearchContext is undefined. Ensure the component is within SearchState."
      );
    })();

  // const [searchResult, setSearchResult] = useState("");
  const handleSearch = (searchTerm: any) => {
    setSearchValue(searchTerm);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route
          path="/"
          element={
            <React.Fragment>
              <Header onSearch={handleSearch} />
              <Main />
            </React.Fragment>
          }
        >
          <Route
            path="/dashboard"
            element={<Dashboard searchResult={searchValue} />}
          />
          <Route path="/setting" element={<Setting />} />
          <Route path="/product-folder" element={<ProductFolder />} />
          <Route path="/scans" element={<Scan />} />
          <Route
            path="/widgets"
            element={<Widgets searchResult={searchValue} />}
          />
          <Route
            path="/product-details/:id/:code/:time/:file"
            element={<ParticularItem searchResult={searchValue} />}
          />
          <Route
            path="/my-scan/:id/:asin/:code/:paramid/"
            element={<MyScan />}
          />
            <Route
            path="/view-charts"
            element={<BigCharts />}
          />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
