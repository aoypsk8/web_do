// Home.js
import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuCalendarSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { GetAllCustomer } from "../api/cutomerAPI/customerAction";
import * as XLSX from 'xlsx';
function CustomerReport() {
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState([]);
  const { customer } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(GetAllCustomer());
    setCustomerData(customer || []);
  }, [dispatch]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const supplierArray = customer || [];
  const totalPages = Math.ceil(supplierArray.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = supplierArray.slice(indexOfFirstItem, indexOfLastItem);

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
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(customerData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'customerData');
    XLSX.writeFile(wb, 'customerData_data.xlsx');
  };

  return (
    <div className="p-10 flex flex-col justify-between">
      <p className=" mb-6 text-5xl">ລາຍງານລູກຄ້າທັງຫມົດ</p>
      <div className="flex justify-between items-center w-full px-36">
        <p className=" mt-10 text-xl">ລາຍການຂໍ້ມູນລູກຄ້າທັງຫມົດ: {customerData.length} </p>
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
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຊື່</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ນາມສະກຸນ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຮູບພາບ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ເບີໂທ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ທີ່ຢູ່</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{index + 1}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {item.First_name}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {item.Last_name}</td>
                <td className="border-b border-btnn border-opacity-50 px-4 py-2 text-center font-light flex justify-center"> <img
                  src={item.Profile_img}
                  alt=""
                  className="w-16 h-16 object-cover"
                /></td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Phone_Number}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Address}</td>
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
          {Math.min(indexOfLastItem, supplierArray.length)} of{" "}
          {supplierArray.length}
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

export default CustomerReport;
