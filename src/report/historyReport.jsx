import React, { useEffect, useState } from "react";
import { LuCalendarSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { GetAllSale } from "../../src/api/saleAPI/saleAction";
import DatePicker from "react-datepicker";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
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

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(saleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'history');
    XLSX.writeFile(wb, 'history_data.xlsx');
  };
  return (
    <div className="p-10">
      <p className="mb-10 text-5xl">ລາຍງານການຂາຍ</p>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-between items-center w-full px-36">
          <p className=" mt-10 text-xl">ຈຳນວນປະຫວັດທັງໝົດ: {filteredSaleData.length} ຄົນ</p>
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
                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ສັ່ງຊື້ໂດຍ</th>
                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຍອດລວມ</th>
                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ສະຖານະ</th>
              </tr>
            </thead>
            <tbody className="bg-white">

              {currentItems.map((item, index) => (
                <tr key={item.order_id}>
                  <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{index + 1}</td>
                  <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {formatTime(item.order_date)}</td>
                  <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{formatDate(item.order_date)}</td>
                  <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Cus_name}</td>
                  <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {formatNumber(item.total)} ກີບ</td>
                  <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {item.status === 0 ? (
                    <p className="text-base font-light  text-ggColor">
                      ລໍຖ້າດຳເນີນການ...
                    </p>
                  ) : (
                    <p className="text-base font-light  text-greenBottle">
                      ສຳເລັດ
                    </p>
                  )}</td>
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
    </div>
  );
}

export default HistoryReport;
