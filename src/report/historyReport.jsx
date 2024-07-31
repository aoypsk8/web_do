import React, { useEffect, useState } from "react";
import { LuCalendarSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { GetAllSale } from "../../src/api/saleAPI/saleAction";
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

function HistoryReport() {
  const dispatch = useDispatch();
  const [saleData, setSaleData] = useState([]);
  const [filteredSaleData, setFilteredSaleData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Initially no date selected
  const { sale } = useSelector((state) => state.sale);

  useEffect(() => {
    dispatch(GetAllSale());
  }, [dispatch]);

  useEffect(() => {
    setSaleData(sale || []);
    filterSalesByDate(selectedDate);
  }, [sale, selectedDate]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const totalPages = Math.ceil(filteredSaleData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSaleData.slice(indexOfFirstItem, indexOfLastItem);

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
    if (date) {
      const formattedDate = formatDate(date.toISOString());
      const filteredSales = sale.filter((item) => formatDate(item.order_date) === formattedDate);
      setFilteredSaleData(filteredSales);
    } else {
      // If no date selected, show all sales
      setFilteredSaleData(sale || []);
    }
  };

  return (
    <div className="p-10">
      <p className="mb-10 text-5xl">ລາຍງານການຂາຍ</p>
      <div className="w-full h-[600px] border border-lineColor py-3 rounded-md flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center px-5">
            <p className="text-xl w-1/3">ລາຍການຂາຍທັງຫມົດ</p>
            <div className="border w-1/5 border-lineColor px-5 py-2 rounded-md flex items-center justify-between">
              <LuCalendarSearch size={30} color="#625F5F" />
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                className="w-full rounded text-start ml-2 text-unSelectText"
              />
            </div>
          </div>
          <div className="border border-lineColor w-full py-3 mt-3 bg-ggColor bg-opacity-20 flex justify-between items-center px-5 ">
            <p className="text-base font-light w-1/6">ລຳດັບ</p>
            <p className="text-base font-light w-1/6">ເວລາ</p>
            <p className="text-base font-light w-1/6">ວັນທີ</p>
            <p className="text-base font-light w-1/6">ສັ່ງຊື້ໂດຍ</p>
            <p className="text-base font-light w-1/4">ຍອດລວມ</p>
            <p className="text-base font-light w-1/12">ສະຖານະ</p>
          </div>
          {currentItems.map((item, index) => (
            <div key={index} className="w-full py-5 bg-white flex justify-between items-center px-5 border-b border-lineColor">
              <p className="text-base font-light w-1/6">{index + 1}</p>
              <p className="text-base font-light w-1/6">{formatTime(item.order_date)}</p>
              <p className="text-base font-light w-1/6">{formatDate(item.order_date)}</p>
              <p className="text-base font-light w-1/6">{item.Cus_name}</p>
              <p className="text-xl font-light w-1/4">{formatNumber(item.total)} ກີບ</p>
              {item.status === false ? (
                <p className="text-base font-light w-1/12 text-primaryColor">ລໍຖ້າດຳເນີນການ...</p>
              ) : (
                <p className="text-base font-light w-1/12 text-greenBottle">ສຳເລັດ</p>
              )}
            </div>
          ))}
        </div>
        <div className="w-full flex justify-between px-5">
          <div className="w-1/12 border border-lineColor bg-white rounded-md items-center justify-center flex" onClick={prevPage}>
            <p className="text-base font-light text-center ">ກັບຄືນ</p>
          </div>
          <div className="text-base font-light">
            {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredSaleData.length)} of {filteredSaleData.length}
          </div>
          <div className="w-1/12 border border-lineColor bg-white rounded-md items-center justify-center flex" onClick={nextPage}>
            <p className="text-base font-light text-center ">ຕໍ່ໄປ</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryReport;
