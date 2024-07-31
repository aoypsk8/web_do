// Home.js
import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { LuCalendarSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProduct } from "../api/productAPI/productAction";

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

  return (
    <div className="p-10 flex flex-col justify-between">
      <p className=" mb-6 text-5xl">ລາຍງານສິນຄ້າທັງຫມົດ</p>
      <div className="w-full h-3/4  border border-lineColor py-3 rounded-md flex flex-col justify-between mt-3">
        <div className="flex justify-between items-center px-5 pb-5">
          <p className="text-xl w-1/3">ລາຍການສິນຄ້າທັງຫມົດ</p>
          
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
            ຈຳນວນ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/6">
            ລາຄາ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/6">
            ຄຳບັນຍາຍ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/12">
            ປະເພດ
          </p>
        </div>
        {currentItems.map((item, index) => (
          <div
            className="w-full py-5 bg-white flex justify-between items-center px-5 border-b border-lineColor"
            key={index}
          >
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {item.Product_ID}
            </p>
            <p className="text-base font-light flex justify-center items-center w-1/6">
              {item.Product_Name}
            </p>
            <img
              src={item.Product_img}
              alt=""
              className="w-16 h-16 object-cover"
            />
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {item.ProductQty}
            </p>
            <p className="text-xl font-light flex justify-center items-center w-1/6">
              {formatNumber(item.Price)} ກີບ
            </p>
            <p className="text-base font-light flex justify-center items-center w-1/6">
              {item.Description}
            </p>
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {item.Product_Type_Name}
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
      </div>
    </div>
  );
}

export default ProductReport;
