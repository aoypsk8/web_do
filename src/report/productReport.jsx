// Home.js
import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuCalendarSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProduct } from "../api/productAPI/productAction";
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

function ProductReport() {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(GetAllProduct());
    setProductData(product || []);
  }, [dispatch]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const supplierArray = product || [];
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
    const ws = XLSX.utils.json_to_sheet(productData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'productData');
    XLSX.writeFile(wb, 'productData_data.xlsx');
  };

  return (
    <div className="p-10 flex flex-col justify-between">
      <p className=" mb-6 text-5xl">ລາຍງານສິນຄ້າທັງຫມົດ</p>
      <div className="flex justify-between items-center w-full px-36">
        <p className=" mt-10 text-xl">ຈຳນວນນສິນຄ້າທັງໝົດ: {productData.length} </p>
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
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຮູບພາບ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຈຳນວນ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ລາຄາ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຄຳບັນຍາຍ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ປະເພດ</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{index + 1}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {item.Product_Name}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"><img
                  src={item.Product_img}
                  alt=""
                  className="w-16 h-16 object-cover"
                /></td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {item.ProductQty}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {formatNumber(item.Price)} ກີບ</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">  {item.Description}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Product_Type_Name}</td>
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

export default ProductReport;
