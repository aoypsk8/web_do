import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "../../App.css";
import ic_save1 from "../../assets/icons/save1.svg";
import ic_close1 from "../../assets/icons/close1.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateImportPro,
  GetAllImportPro,
  GetAllSupplier,
} from "../../api/importAPI/importAction";
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
  }, [dispatch]);

  useEffect(() => {
    setImportProData(importPro || []);
    setSupplierData(supplier || []);
    setUserId(userInfo.Emp_ID);
    filterSalesByDate(selectedDate);
  }, [importPro, supplier, userInfo, selectedDate]);

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

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(importProData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'importProData');
    XLSX.writeFile(wb, 'importProData_data.xlsx');
  };

  return (
    <div className="p-10 flex flex-col justify-between">
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
      <div className="flex px-10 items-center">
        <button
          className="bg-buttonColor flex items-center text-center text-white rounded py-2 px-8 mx-5"
          onClick={handleSubmit}
        >
          <img className="w-5 h-5 mr-1 " src={ic_save1} />
          <p>Save</p>
        </button>
        <button
          className="bg-buttonColor flex items-center text-center text-white rounded py-2 px-8 mx-5"
          onClick={handleclear}
        >
          <img className="w-5 h-5 mr-1 " src={ic_close1} />
          <p>Cancel</p>
        </button>
        <div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded ml-4"
            onClick={exportToExcel}
          >
            Export to Excel
          </button>
        </div>
      </div>

      <div className="flex justify-between mx-10 ">
        <div>
          {" "}
          <p className="text-2xl font-bold">ລາຍການຂາຍສິນຄ້າ</p>
        </div>
        <div className="px-4">
          <input
            type="date"
            value={selectedDate ? selectedDate.toISOString().substr(0, 10) : ""}
            onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
      </div>
      <form className="w-full px-36 mt-5">
        <table className="w-full mt-10">
          <thead>
            <tr>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold rounded-tl-lg">ລຳດັບ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຊື່ລາຍການ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ເວລາ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ວັນທີ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ລາຄາ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຜູ້ສະຫນອງ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ພະນັກງານ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຈຳນວນ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຍອດລວມ</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentItems.map((item, index) => (
              <tr key={index} className="hover:cursor-pointer hover:bg-ggColor hover:bg-opacity-20">
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{index + 1}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">  {item.Pro_name}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">  {formatTime(item.Date_received)}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {formatDate(item.Date_received)}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {formatNumber(item.Sub_Price)} ກີບ</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {item.First_names}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {item.First_name}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {item.ReceivedQty}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">  {formatNumber(item.Price_Total)} ກີບ</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </form>
      <div className="flex justify-between mx-10">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-buttonColor text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          <IoIosArrowBack />
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="bg-buttonColor text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}

export default ImportScreen;
