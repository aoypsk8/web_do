// Home.js
import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuCalendarSearch } from "react-icons/lu";
import ic_save1 from "../../src/assets/icons/save1.svg";
import ic_close1 from "../../src/assets/icons/close1.svg";
import { useDispatch, useSelector } from "react-redux";
import { GetAllImportPro } from "../api/importAPI/importAction";
import DatePicker from "react-datepicker";
import * as XLSX from 'xlsx';

function formatNumber(number) {
  return new Intl.NumberFormat("en-US").format(number);
}

const formatTime = (isoDateString) => {
  const date = new Date(isoDateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`; // Format as HH:mm
};

const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`; // Format as DD-MM-YYYY
};

function ImportReport() {
  const dispatch = useDispatch();
  const [importProData, setImportProData] = useState([]);
  const { importPro } = useSelector((state) => state.importPro);

  const [filteredSaleData, setFilteredSaleData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Initially no date selected

  useEffect(() => {
    dispatch(GetAllImportPro());
  }, [dispatch]);

  useEffect(() => {
    setImportProData(importPro || []);
    filterSalesByDate(selectedDate);
  }, [importPro, selectedDate]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const totalPages = Math.ceil(filteredSaleData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSaleData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle next and previous page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filterSalesByDate = (date) => {
    console.log(importPro);
    if (date) {
      const formattedDate = formatDate(date.toISOString());
      const filteredSales = importPro.filter(
        (item) => formatDate(item.Date_received) === formattedDate
      );
      setFilteredSaleData(filteredSales);
    } else {
      // If no date selected, show all sales
      setFilteredSaleData(importPro || []);
      console.log(currentItems);
    }
  };
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(importProData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'import');
    XLSX.writeFile(wb, 'import_data.xlsx');
  };

  return (
    <div className="p-10 flex flex-col justify-between">
      <p className=" mb-6 text-5xl">ລາຍງານການນຳເຂົ້າ</p>
      <div className="flex justify-between items-center w-full px-36">
        <p className=" mt-10 text-xl">ຈຳນວນນຳເຂົ້າທັງໝົດ: {filteredSaleData.length} </p>
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-blue-500 text-black rounded mt-5 border border-black items-center flex justify-center"
        >
          Export to Excel
        </button>
      </div>
      <form className="w-full px-36 mt-5">
        <table className="w-full mt-10">
          <thead>
            <tr>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold rounded-tl-lg">ລຳດັບ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຊື່ລາຍການ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ເວລາ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ວັນທີ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ລາຄາ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຜູ້ສະຫນອງ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ພະນັກງານ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຈຳນວນ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຍອດລວມ</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{index + 1}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">  {item.Pro_name}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">  {formatTime(item.Date_received)}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {formatDate(item.Date_received)}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {formatNumber(item.Sub_Price)} ກີບ</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {item.First_names}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {item.First_name}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {item.ReceivedQty}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">  {formatNumber(item.Price_Total)} ກີບ</td>

              </tr>
            ))}
          </tbody>
        </table>
      </form>
      <div className="w-full flex justify-center px-5 mt-5">
        <div
          className="items-center justify-center flex cursor-pointer"
          onClick={prevPage}
        >
          <IoIosArrowBack />
        </div>
        <div className="text-base font-light mx-5">
          {indexOfFirstItem + 1} -{" "}
          {Math.min(indexOfLastItem, filteredSaleData.length)} of{" "}
          {filteredSaleData.length}
        </div>
        <div
          className="items-center justify-center flex cursor-pointer"
          onClick={nextPage}
        >
          <IoIosArrowForward />
        </div>
      </div>
    </div>
  );
}

export default ImportReport;
