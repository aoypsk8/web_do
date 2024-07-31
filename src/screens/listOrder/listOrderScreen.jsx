import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuCalendarSearch } from "react-icons/lu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../App.css";
import ListOrderModalComponent from "./modal/listOrderModal";
import { useDispatch, useSelector } from "react-redux";
import { GetAllOrder } from "../../api/orderAPI/orderAction";

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

function ListOrderScreen() {
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState([]);
  const [filteredOrderData, setFilteredOrderData] = useState([]);
  const [orderInsideData, setOrderInsideData] = useState([]);
  const [total, setTotal] = useState();
  const [imgPay, setImgPay] = useState();
  const [userId, setUserId] = useState();
  const [orderID, setOrderID] = useState();
  const { order } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.user);
  const [selectedDate, setSelectedDate] = useState(null); // Initially no date selected

  useEffect(() => {
    setOrderData(order || []);
    if (userInfo) {
      setUserId(userInfo.Emp_ID);
    }
    dispatch(GetAllOrder());
  }, [dispatch]);

  useEffect(() => {
    filterOrdersByDate(selectedDate);
  }, [selectedDate, order]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const totalPages = Math.ceil(filteredOrderData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrderData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  const filterOrdersByDate = (date) => {
    if (date) {
      const formattedDate = formatDate(date.toISOString());
      const filteredSales = order.filter(
        (item) => formatDate(item.order_date) === formattedDate
      );
      setFilteredOrderData(filteredSales);
    } else {
      // If no date selected, show all sales
      setFilteredOrderData(order || []);
      console.log(currentItems);
    }
  };

  return (
    <div className="p-10">
      {isModalOpen && (
        <ListOrderModalComponent
          isOpen={isModalOpen}
          onClose={closeModal}
          order={orderInsideData}
          total={total}
          imgPay={imgPay}
          userID={userId}
          order_id={orderID}
        />
      )}
      <p className="mb-10 text-5xl">
        ລາຍການສັ່ງຊື້ ( {filteredOrderData.length} )
      </p>
      <div className="w-full h-auto border border-lineColor py-3 rounded-md flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center px-5">
            <p className="text-xl w-1/3">ລາຍການສັ່ງຊື້ທັງຫມົດ</p>
            <div className="border w-1/5 border-lineColor px-5 py-2 rounded-md flex items-center justify-between">
              <div className="flex items-center">
                <LuCalendarSearch size={30} color="#625F5F" />
                {isModalOpen ? (
                  <div></div>
                ) : (
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="w-full rounded text-start ml-2 text-unSelectText"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="border border-lineColor w-full py-3 mt-3 bg-ggColor bg-opacity-15 flex justify-between items-center px-5 ">
            <p className="text-base font-light w-1/6">ລຳດັບ</p>
            <p className="text-base font-light w-1/6">ເວລາ</p>
            <p className="text-base font-light w-1/6">ວັນທີ</p>
            <p className="text-base font-light w-1/6">ສັ່ງຊື້ໂດຍ</p>
            <p className="text-base font-light w-1/6">ຍອດລວມ</p>
            <p className="text-base font-light w-1/6">ສະຖານະ</p>
          </div>
          {currentItems.map((item) => (
            <div
              className="w-full py-5 bg-white flex justify-between items-center px-5 border-b border-lineColor"
              onClick={() => {
                openModal();
                setOrderInsideData(item.products);
                setTotal(item.total);
                setImgPay(item.ImagePay);
                setOrderID(item.order_id);
              }}
              key={item.order_id}
            >
              <p className="text-base font-light w-1/6">{item.order_id}</p>
              <p className="text-base font-light w-1/6">
                {formatTime(item.order_date)}
              </p>
              <p className="text-base font-light w-1/6">
                {formatDate(item.order_date)}
              </p>
              <p className="text-base font-light w-1/6">{item.Cus_name}</p>
              <p className="text-xl font-light w-1/6">
                {formatNumber(item.total)} ກີບ
              </p>
              {item.status === 0 ? (
                <p className="text-base font-light w-1/6 text-ggColor">
                  ລໍຖ້າດຳເນີນການ...
                </p>
              ) : (
                <p className="text-base font-light w-1/6 text-greenBottle">
                  ສຳເລັດ
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="w-full flex justify-between px-5 mt-5">
          <div
            className="w-1/12 border border-lineColor bg-white rounded-md items-center justify-center flex"
            onClick={prevPage}
          >
            <p className="text-base font-light text-center">ກັບຄືນ</p>
          </div>
          <div className="text-base font-light">
            {indexOfFirstItem + 1} -{" "}
            {Math.min(indexOfLastItem, filteredOrderData.length)} of{" "}
            {filteredOrderData.length}
          </div>
          <div
            className="w-1/12 border border-lineColor bg-white rounded-md items-center justify-center flex"
            onClick={nextPage}
          >
            <p className="text-base font-light text-center">ຕໍ່ໄປ</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListOrderScreen;
