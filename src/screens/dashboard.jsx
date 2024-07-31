// Home.js
import React, { useState } from "react";
import Aside from "./component/aside.jsx";
import HomeScreen from "./home/homeScreen.jsx";
import ListOrderScreen from "./listOrder/listOrderScreen.jsx";
import HistorySoldScreen from "./historySold/historyScreen.jsx";
import ImportScreen from "./import/importScreen.jsx";
import SellFrontScreen from "./import/sellFront.jsx";
import ProductManageScreen from "./product/productManageScreen.jsx";
import EmployeeManageScreen from "./employee/employeeManageScreen.jsx";
import CustomerManageScreen from "./customer/customerManageScreen.jsx";
import TypeScreen from "./type/typeScreen.jsx";
import SupplierScreen from "./supplier/supplierScreen.jsx";
import HistoryReport from "../report/historyReport.jsx";
import ImportReport from "../report/importReport.jsx";
import ProductReport from "../report/productReport.jsx";
import EmployeeReport from "../report/employeeReport.jsx";
import CustomerReport from "../report/customerReport.jsx";
import TypeReport from "../report/typeReport.jsx";
import SupplierReport from "../report/supllierReport.jsx";
import InReport from "../report/inReport.jsx";
import OutReport from "../report/outReport.jsx";

function Dashboard() {
  const [selectedItem, setSelectedItem] = useState("home");
  const handleItemSelected = (selectedItem) => {
    setSelectedItem(selectedItem);
  };
  const renderContent = () => {
    switch (selectedItem) {
      case "home":
        return <HomeScreen />;
      case "sellFront":
        return <SellFrontScreen />;
      case "listOrder":
        return <ListOrderScreen />;
      case "historySold":
        return <HistorySoldScreen />;
      case "import":
        return <ImportScreen />;
      case "manage-product":
        return <ProductManageScreen />;
      case "manage-employee":
        return <EmployeeManageScreen />;
      case "customer-employee":
        return <CustomerManageScreen />;
      case "type":
        return <TypeScreen />;
      case "provider":
        return <SupplierScreen />;
      case "report-history":
        return <HistoryReport />;
      case "report-import":
        return <ImportReport />;
      case "report-product":
        return <ProductReport />;
      case "report-employee":
        return <EmployeeReport />;
      case "report-customer":
        return <CustomerReport />;
      case "report-type":
        return <TypeReport />;
      case "report-supplier":
        return <SupplierReport />;
      case "report-in":
        return <InReport />;
      case "report-out":
        return <OutReport />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 flex">
      {/* Side */}
      <Aside onItemSelected={handleItemSelected} />

      <div className="w-full flex flex-col overflow-y-hidden bg-bgColor">
        {/* <!-- Desktop Header --> */}
        <div className="w-full items-center bg-white py-4 px-6 hidden sm:flex shadow-lg">
          <div className="w-1/2 bg-slate-400 h-16 "> </div>
          <div className="relative w-1/2 flex justify-end "></div>
        </div>
        {/* content here */}
        <div className="overflow-y-auto flex-grow">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Dashboard;
