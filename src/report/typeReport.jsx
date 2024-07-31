// Home.js
import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { LuCalendarSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProduct } from "../api/productAPI/productAction";
import { GetAlltype } from "../api/typeAPI/typeAction";
import DatePicker from "react-datepicker";

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

function TypeReport() {
  const dispatch = useDispatch();
  const [typeData, setTypeData] = useState([]);
  const { type } = useSelector((state) => state.type);

  const [filteredSaleData, setFilteredSaleData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Initially no date selected

  useEffect(() => {
    dispatch(GetAlltype());
  }, [dispatch]);

  useEffect(() => {
    setTypeData(type || []);
    filterSalesByDate(selectedDate);
  }, [type, selectedDate]);

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
      const filteredSales = type.filter(
        (item) => formatDate(item.timeStamp) === formattedDate
      );
      setFilteredSaleData(filteredSales);
    } else {
      // If no date selected, show all sales
      setFilteredSaleData(type || []);
      console.log(currentItems);
    }
  };

  return (
    <div className="p-10 flex flex-col justify-between">
      <p className=" mb-6 text-5xl">ລາຍງານປະເພດສິນຄ້າທັງຫມົດ</p>
      <div className="w-full h-3/4  border border-lineColor py-3 rounded-md flex flex-col justify-between mt-3">
        <div className="flex justify-between items-center px-5 pb-5">
          <p className="text-xl w-1/3">ລາຍການປະເພດສິນຄ້າທັງຫມົດ</p>
          <div className=" border w-1/5 border-lineColor px-5 py-2 rounded-md flex items-center justify-between">
            <LuCalendarSearch size={30} color="#625F5F" />
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              className="w-full rounded text-start ml-2 text-unSelectText"
            />
          </div>
        </div>
        <div className="border border-lineColor w-full py-3  bg-ggColor bg-opacity-20 flex justify-between items-center px-5 ">
          <p className="text-base font-light flex justify-center items-center w-1/12 ">
            ລຳດັບ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/6">
            ຊື່ລາຍການ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/12">
            ຮູບພາບ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/12">
            ຈຳນວນສິນຄ້າປະເພດນີ້
          </p>

          <p className="text-base font-light flex justify-center items-center w-1/12">
            ເວລາ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/6">
            ວັນທີ
          </p>
        </div>
        {currentItems.map((item, index) => (
          <div
            className="w-full py-5 bg-white flex justify-between items-center px-5 border-b border-lineColor"
            key={index}
          >
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {item.Product_Type_ID}
            </p>
            <p className="text-base font-light flex justify-center items-center w-1/6">
              {item.Product_Type_Name}
            </p>
            <img src={item.img} alt="" className="w-16 h-16 object-cover" />
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {(item.Total_ProductQty)}
            </p>
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {formatTime(item.timeStamp)}
            </p>
            <p className="text-xl font-light flex justify-center items-center w-1/6">
              {formatDate(item.timeStamp)}
            </p>
          </div>
        ))}
        <div className="w-full flex justify-between px-5 my-3">
          <div
            className="w-1/12 border border-lineColor bg-white rounded-md items-center justify-center flex"
            onClick={prevPage}
          >
            <p className="text-base font-light text-center ">ກັບຄືນ</p>
          </div>
          <div className="text-base font-light">
            {indexOfFirstItem + 1} -{" "}
            {Math.min(indexOfLastItem, filteredSaleData.length)} of{" "}
            {filteredSaleData.length}
          </div>
          <div
            className="w-1/12 border border-lineColor bg-white rounded-md items-center justify-center flex"
            onClick={nextPage}
          >
            <p className="text-base font-light text-center ">ຕໍ່ໄປ</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TypeReport;
