// Home.js
import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { LuCalendarSearch } from "react-icons/lu";
import "../../App.css";
import ic_save1 from "../../assets/icons/save1.svg";
import ic_close1 from "../../assets/icons/close1.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateImportPro,
  GetAllImportPro,
  GetAllSupplier,
} from "../../api/importAPI/importAction";
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

function ImportScreen() {
  const dispatch = useDispatch();
  const [importProData, setImportProData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const { importPro } = useSelector((state) => state.importPro);
  const { supplier } = useSelector((state) => state.supplier);
  const { userInfo } = useSelector((state) => state.user);
  const [userId, setUserId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const { product } = useSelector((state) => state.product);

  const [filteredSaleData, setFilteredSaleData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const [value, setValue] = useState({
    Pro_name: "",
    ReceivedQty: "",
    Sub_Price: "",
  });

  useEffect(() => {
    dispatch(GetAllSupplier());
    dispatch(GetAllImportPro());
    setImportProData(importPro || []);
    setSupplierData(supplier || []);
    setUserId(userInfo.Emp_ID);
    filterSalesByDate(selectedDate);
    // console.log(supplier);
  }, [dispatch, value, selectedDate]);

  const [selectedSupplier, setSelectedSupplier] = useState({
    Sl_ID: null,
    First_names: "Select Supplier",
  });

  const supplierOptions = supplierData.map((supplier) => ({
    Sl_ID: supplier.Sl_ID,
    First_names: supplier.First_names,
  }));

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

  const filterSalesByDate = (date) => {
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
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    console.log(value);
  };
  const handleclear = (e) => {
    setValue({
      Pro_name: "",
      ReceivedQty: "",
      Sub_Price: "",
    });
    console.log(value);
  };

  const handleSubmit = () => {
    console.log(supplierId);
    console.log(userId);
    console.log(value);
    dispatch(
      CreateImportPro(
        userId,
        value.Pro_name,
        value.ReceivedQty,
        value.Sub_Price,
        supplierId
      )
    ).then(() => {
      setValue({
        Pro_name: "",
        ReceivedQty: "",
        Sub_Price: "",
      });
    });
  };
  //dropdow
  const CustomDropdown = ({ options, selectedOption, onSelect }) => {
    const [isOpenDropDown, setIsOpenDropDown] = useState(false);
    const toggleDropdown = () => {
      setIsOpenDropDown(!isOpenDropDown);
    };
    const handleSelect = (option) => {
      setSupplierId(option.Sl_ID);
      onSelect(option);
      toggleDropdown();
    };
    return (
      <div className="relative">
        <div
          className="hover:cursor-pointer flex w-full border border-lineColor rounded-md my-2 px-5 justify-between items-center py-2"
          onClick={toggleDropdown}
        >
          {selectedOption.First_names}
          {isOpenDropDown ? <IoIosArrowDown /> : <IoIosArrowBack />}
        </div>
        {isOpenDropDown && (
          <ul className="absolute border border-lineColor overflow-y-auto z-10 w-full bg-white rounded-md px-3">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="text-lg hover:cursor-pointer my-1"
              >
                {option.First_names}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  return (
    <div className="p-10 flex flex-col justify-between">
      <p className=" mb-6 text-5xl">ການນຳເຂົ້າສິນຄ້າ</p>
      <div className="w-full  grid grid-cols-3  ">
        <div className="  pl-10">
          {" "}
          <p className="text-xl">ຊື່ລາຍການນຳເຂົ້າ</p>
          <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
            <input
              className="w-full py-2 px-5 rounded "
              id="Pro_name"
              name="Pro_name"
              type="text"
              required=""
              placeholder="ຊື່ລາຍການນຳເຂົ້າ"
              onChange={handleChange}
              value={value.Pro_name}
            />
          </div>
        </div>{" "}
        <div className="px-10">
          {" "}
          <p className="text-xl">ຈຳນວນ</p>
          <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
            <input
              className="w-full py-2 px-5 rounded "
              id="ReceivedQty"
              name="ReceivedQty"
              type="text"
              required=""
              placeholder="ຈຳນວນ"
              onChange={handleChange}
              value={value.ReceivedQty}
            />
          </div>
        </div>{" "}
        <div className=" pr-10">
          {" "}
          <p className="text-xl">ລາຄາ</p>
          <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
            <input
              className="w-full py-2 px-5 rounded "
              id="Sub_Price"
              name="Sub_Price"
              type="text"
              required=""
              placeholder="ລາຄາ"
              onChange={handleChange}
              value={value.Sub_Price}
            />
          </div>
        </div>
        <div className="pl-10">
          <p className="text-xl">ຜູ້ສະຫນອງ</p>
          <CustomDropdown
            options={supplierOptions}
            selectedOption={selectedSupplier}
            onSelect={setSelectedSupplier}
          />
        </div>
      </div>
      <div className=" flex justify-end px-5 ">
        <div
          className="w-1/6 bg-redBottle flex justify-between py-1 px-5 rounded-md items-center "
          onClick={() => handleclear()}
        >
          <img src={ic_close1} alt="" className=" " />
          <div className="text-white text-2xl">ຍົກເລີກ</div>
        </div>
        <div className="mx-2"></div>
        <div
          className="w-1/6 bg-greenBottle flex justify-between py-1 px-5 rounded-md items-center "
          onClick={() => handleSubmit()}
        >
          <img src={ic_save1} alt="" className=" " />
          <div className="text-white text-2xl ">ບັນທຶກ</div>
        </div>
      </div>
      <div className="w-full h-3/4  border border-lineColor py-3 rounded-md flex flex-col justify-between mt-3">
        <div className="flex justify-between items-center px-5 pb-5">
          <p className="text-xl w-1/3">ລາຍການນຳເຂົ້າສິນຄ້າທັງຫມົດ</p>
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
            ເວລາ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/12">
            ວັນທີ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/6">
            ລາຄາ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/6">
            ຜູ້ສະຫນອງ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/6">
            ພະນັກງານ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/12">
            ຈຳນວນ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/6">
            ຍອດລວມ
          </p>
        </div>
        {currentItems.map((item, index) => (
          <div
            className="w-full py-5 bg-white flex justify-between items-center px-5 border-b border-lineColor"
            key={index}
          >
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {item.Ip_ID}
            </p>
            <p className="text-base font-light flex justify-center items-center w-1/6">
              {item.Pro_name}
            </p>
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {formatTime(item.Date_received)}
            </p>
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {formatDate(item.Date_received)}
            </p>
            <p className="text-xl font-light flex justify-center items-center w-1/6">
              {formatNumber(item.Sub_Price)} ກີບ
            </p>
            <p className="text-base font-light flex justify-center items-center w-1/6">
              {item.First_names}
            </p>
            <p className="text-base font-light flex justify-center items-center w-1/6">
              {item.First_name}
            </p>
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {item.ReceivedQty}
            </p>
            <p className="text-xl font-light flex justify-center items-center w-1/6">
              {formatNumber(item.Price_Total)} ກີບ
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

export default ImportScreen;
