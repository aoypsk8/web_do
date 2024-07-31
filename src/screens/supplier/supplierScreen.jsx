// Home.js
import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuCalendarSearch } from "react-icons/lu";
import "../../App.css";
import ic_save1 from "../../assets/icons/save1.svg";
import ic_close1 from "../../assets/icons/close1.svg";
import ic_edit from "../../assets/icons/editI.svg";
import ic_delete from "../../assets/icons/deleteI.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateSupplier,
  DeleteSupplier,
  GetAllSupplier,
} from "../../api/supplier/supplierAction";
import Swal from "sweetalert2";
import SupplierEditModal from "./modal/supplierEditModal";

function SupplierScreen() {
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

  const [value, setValue] = useState({
    First_name: "",
    Phone_Number: "",
    Village: "",
    District: "",
    Province: "",
  });

  const [valueEdit, setValueEdit] = useState({
    Sl_ID: "",
    First_name: "",
    Phone_Number: "",
    Village: "",
    District: "",
    Province: "",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(
      CreateSupplier(
        value.First_name,
        value.Phone_Number,
        value.Village,
        value.District,
        value.Province
      )
    ).then(() => {
      setValue({
        First_name: "",
        Phone_Number: "",
        Village: "",
        District: "",
        Province: "",
      });
    });
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="p-10 flex flex-col justify-between">
      {isEditModalOpen === true && (
        <SupplierEditModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          Sl_ID={valueEdit.Sl_ID}
          First_name={valueEdit.First_name}
          Phone_Number={valueEdit.Phone_Number}
          Village={valueEdit.Village}
          District={valueEdit.District}
          Province={valueEdit.Province}
        />
      )}
      <p className=" mb-6 text-5xl">ຜູ້ສະຫນອງ</p>
      <div className="w-full  grid grid-cols-4  ">
        <div className="  pl-10">
          {" "}
          <p className="text-xl">ຊື່ຜູ້ສະຫນອງ</p>
          <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
            <input
              className="w-full py-2 px-5 rounded "
              id="First_name"
              name="First_name"
              type="text"
              required=""
              placeholder="ຊື່ຜູ້ສະຫນອງ"
              onChange={handleChange}
              value={value.First_name}
            />
          </div>
        </div>{" "}
        <div className="px-10">
          {" "}
          <p className="text-xl">ເບີໂທ</p>
          <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
            <input
              className="w-full py-2 px-5 rounded "
              id="Phone_Number"
              name="Phone_Number"
              type="number"
              required=""
              placeholder="ເບີໂທ"
              onChange={handleChange}
              value={value.Phone_Number}
            />
          </div>
        </div>{" "}
        <div className=" pr-10">
          {" "}
          <p className="text-xl">ບ້ານ</p>
          <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
            <input
              className="w-full py-2 px-5 rounded "
              id="Village"
              name="Village"
              type="text"
              required=""
              placeholder="ບ້ານ"
              onChange={handleChange}
              value={value.Village}
            />
          </div>
        </div>
        <div className="pl-10">
          {" "}
          <p className="text-xl">ເມືອງ</p>
          <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
            <input
              className="w-full py-2 px-5 rounded "
              id="District"
              name="District"
              type="text"
              required=""
              placeholder="ເມືອງ"
              onChange={handleChange}
              value={value.District}
            />
          </div>
        </div>
        <div className="pl-10">
          {" "}
          <p className="text-xl">ແຂວງ</p>
          <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
            <input
              className="w-full py-2 px-5 rounded "
              id="Province"
              name="Province"
              type="text"
              required=""
              placeholder="ແຂວງ"
              onChange={handleChange}
              value={value.Province}
            />
          </div>
        </div>
      </div>
      <div className=" flex justify-end px-5 ">
        <div
          className="w-1/6 bg-redBottle flex justify-between py-1 px-5 rounded-md items-center "
          onClick={() => {
            setValue({
              First_name: "",
              Phone_Number: "",
              Village: "",
              District: "",
              Province: "",
            });
          }}
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
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {item.First_names}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {item.Phone_Number}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {item.Village}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">  {item.District}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">  {item.Province}</td>
                <div className="flex items-center justify-around">
                  <img
                    src={ic_edit}
                    alt=""
                    className="pr-2"
                    onClick={() => {
                      console.log(item.First_name);
                      setValueEdit({
                        Sl_ID: item.Sl_ID,
                        First_name: item.First_names,
                        Phone_Number: item.Phone_Number,
                        Village: item.Village,
                        District: item.District,
                        Province: item.Province,
                      });
                      openEditModal();
                    }}
                  />
                  <img
                    src={ic_delete}
                    alt=""
                    onClick={() => {
                      Swal.fire({
                        title: "ທ່ານຕ້ອງການລົບ?",
                        text: "ທ່ານຕ້ອງການລົບບໍ່!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "ລົບ ! ",
                        cancelButtonText: "ຍົກເລີກ",
                      }).then(async (result) => {
                        if (result.isConfirmed) {
                          dispatch(DeleteSupplier(item.Sl_ID));
                        }
                      });
                    }}
                  />
                </div>
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

export default SupplierScreen;
