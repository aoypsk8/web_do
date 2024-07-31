// Home.js
import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { LuCalendarSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { GetAllIn, GetAllOut } from "../api/in-out/in-out";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker CSS
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

function OutReport() {
  const dispatch = useDispatch();
  const [outData, setOutData] = useState([]);
  const { outs } = useSelector((state) => state.outs);

  const [filteredSaleData, setFilteredSaleData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Initially no date selected

  useEffect(() => {
    dispatch(GetAllOut());
  }, [dispatch]);

  useEffect(() => {
    setOutData(outs || []);
    filterSalesByDate(selectedDate);
  }, [outs, selectedDate]);

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
    console.log(date);
    if (date) {
      const formattedDate = formatDate(date.toISOString());
      const filteredSales = outs.filter(
        (item) => formatDate(item.Date_received) === formattedDate
      );
      setFilteredSaleData(filteredSales);
    } else {
      // If no date selected, show all sales
      setFilteredSaleData(outs || []);
      console.log(currentItems);
    }
  };

  const calculateTotal = () => {
    return filteredSaleData.reduce((total, item) => total + Number(item.Price_Total), 0);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredSaleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'filteredSaleData');
    XLSX.writeFile(wb, 'filteredSaleData_data.xlsx');
  };

  return (
    <div className="p-10 flex flex-col justify-between">
      <p className=" mb-6 text-5xl">ລາຍງານລາຍຈ່າຍທັງຫມົດ</p>
      <div className="border w-1/6 border-lineColor px-5 py-2 rounded-md flex items-center justify-end bg-opacity-0">
        <div className="flex items-center justify-end">
          <LuCalendarSearch size={30} color="#625F5F" />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            className="w-full rounded text-start ml-2 "
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full px-36">
        <p className=" mt-10 text-xl">ລາຍຈ່າຍທັງຫມົດ: {filteredSaleData.length} </p>
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
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ເວລາ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ວັນທີ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຊື້ສິນຄ້າ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຊື່ຜູ້ສະຫນອງ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ລາຍຈ່າຍ</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{index + 1}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {formatTime(item.Date_received)}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {formatDate(item.Date_received)}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{(item.Pro_name)}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.First_names}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{formatNumber(item.Price_Total)} ກີບ</td>
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
      <div className="w-full flex justify-center px-5 my-3">
        <p className="text-2xl font-light">
          ລາຍຈ່າຍທັງຫມົດ: {formatNumber(calculateTotal())} ກີບ
        </p>
      </div>
    </div>
  );
}

export default OutReport;
