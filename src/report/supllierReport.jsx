// Home.js
import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuCalendarSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { GetAllSupplier } from "../api/supplier/supplierAction";
import * as XLSX from 'xlsx';

function SupplierReport() {
  const dispatch = useDispatch();
  const [supplierData, setSupplierData] = useState([]);
  const { supplier } = useSelector((state) => state.supplier);

  useEffect(() => {
    dispatch(GetAllSupplier());
    setSupplierData(supplier || []);
  }, [dispatch]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const supplierArray = supplier || [];
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
    const ws = XLSX.utils.json_to_sheet(supplierData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'supplierData');
    XLSX.writeFile(wb, 'supplierData_data.xlsx');
  };


  return (
    <div className="p-10 flex flex-col justify-between">
      <p className=" mb-6 text-5xl">ລາຍງານຜູ້ສະຫນອງທັງຫມົດ</p>
      {/* <div className="w-full h-3/4  border border-lineColor py-3 rounded-md flex flex-col justify-between mt-3">
        <div className="flex justify-between items-center px-5 pb-5">
          <p className="text-xl w-1/3">ລາຍການຜູ້ສະຫນອງທັງຫມົດ</p>
         
        </div>
        <div className="border border-lineColor w-full py-3  bg-ggColor bg-opacity-20 flex justify-between items-center px-5 ">
          <p className="text-base font-light flex justify-center items-center w-1/12 ">
            ລຳດັບ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/12">
            ຊື່ລາຍການ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/12">
            ເບີໂທ
          </p>

          <p className="text-base font-light flex justify-center items-center w-1/12">
            ບ້ານ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/12">
            ເມືອງ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/6">
            ແຂວງ
          </p>
        </div>
        {currentItems.map((item, index) => (
          <div
            className="w-full py-5 bg-white flex justify-between items-center px-5 border-b border-lineColor"
            key={index}
          >
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {item.Sl_ID}
            </p>
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {item.First_names}
            </p>
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {item.Phone_Number}
            </p>

            <p className="text-base font-light flex justify-center items-center w-1/12">
              {item.Village}
            </p>
            <p className="text-xl font-light flex justify-center items-center w-1/12">
              {item.District}
            </p>

            <p className="text-base font-light flex justify-center items-center w-1/6">
              {item.Province}
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
            {Math.min(indexOfLastItem, supplierArray.length)} of{" "}
            {supplierArray.length}
          </div>
          <div
            className="w-1/12 border border-lineColor bg-white rounded-md items-center justify-center flex"
            onClick={nextPage}
          >
            <p className="text-base font-light text-center ">ຕໍ່ໄປ</p>
          </div>
        </div>
      </div> */}
      <div className="flex justify-between items-center w-full px-36">
        <p className=" mt-10 text-xl">ລາຍການຜູ້ສະຫນອງທັງຫມົດ: {supplierData.length} </p>
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
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ເບີໂທ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ບ້ານ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ເມືອງ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ແຂວງ</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{index + 1}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.First_names}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {item.Phone_Number}</td>
                <td className="border-b border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {item.Village}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.District}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Province}</td>
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

export default SupplierReport;
