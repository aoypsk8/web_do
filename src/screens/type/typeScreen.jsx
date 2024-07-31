// Home.js
import React, { useEffect, useState } from "react";
import "../../App.css";
import ic_save1 from "../../assets/icons/save1.svg";
import ic_close1 from "../../assets/icons/close1.svg";
import ic_edit from "../../assets/icons/editI.svg";
import ic_delete from "../../assets/icons/deleteI.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateTypeProduct,
  DeleteType,
  GetAlltype,
} from "../../api/typeAPI/typeAction";
import product from "../../../src/assets/lloo-removebg-preview.png";
import TypeEditModal from "./modal/typeEditModal";
import Swal from "sweetalert2";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const formatTime = (isoDateString) => {
  const date = new Date(isoDateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`; // Format as HH:mm
};
//2024-06-28T17:00:00.000Z
const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`; // Format as DD-MM-YYYY
};

function TypeScreen() {
  const dispatch = useDispatch();
  const [typeData, setTypeData] = useState([]);
  const { type } = useSelector((state) => state.type);

  useEffect(() => {
    dispatch(GetAlltype());
    setTypeData(type || []);
  }, [dispatch]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const supplierArray = type || [];
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
    Product_Type_ID: "",
    Product_Type_Name: "",
  });
  const [valueEdit, setValueEdit] = useState({
    Product_Type_ID: "",
    Product_Type_Name: "",
    img: "",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(CreateTypeProduct(value.Product_Type_Name, imageFile));
  };
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(product);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setImageFile(e.target.files[0]); // File object to be used for form-data
      setImagePreview(URL.createObjectURL(file)); // Data URL for preview

      console.log("Image file state after update:", file); // Log file object for debugging
    }
  };

  useEffect(() => {
    console.log("imageFile state:", imageFile);
  }, [imageFile]);

  const triggerFileInput = () => {
    document.getElementById("image").click();
  };

  return (
    <div className="p-10 flex flex-col justify-between">
      {isEditModalOpen === true && (
        <TypeEditModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          Product_Type_ID={valueEdit.Product_Type_ID}
          Product_Type_Name={valueEdit.Product_Type_Name}
          img={valueEdit.img}
        />
      )}
      <p className=" mb-6 text-5xl">ປະເພດສິນຄ້າ</p>
      <div className="w-full  flex justify-center   ">
        <div className="">
          {" "}
          <p className="text-xl">ຊື່ປະເພດສິນຄ້າ</p>
          <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
            <input
              className="w-full py-2 px-5 rounded "
              id="Product_Type_Name"
              name="Product_Type_Name"
              type="text"
              required=""
              placeholder="ຊື່ປະເພດສິນຄ້າ"
              onChange={handleChange}
              value={value.Product_Type_Name}
            />
          </div>
        </div>{" "}
        <div className="pl-5">
          <p className="text-xl">ຮູບພາບ</p>
          <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
            <input
              className="hidden"
              id="image"
              name="image"
              type="file"
              required
              onChange={handleFileChange}
            />
            <button
              className="w-full py-2 px-5 rounded text-start bg-gray-200 hover:bg-gray-300"
              onClick={triggerFileInput}
            >
              ເລືອກຮູບພາບ
            </button>
          </div>
        </div>
        <img
          src={imagePreview}
          alt=""
          className="object-cover items-center w-52 h-52"
        />
      </div>
      <div className="w-full flex justify-center px-5 py-6">
        <div
          className=" bg-redBottle flex justify-between py-1 px-5 rounded-md items-center "
          onClick={() => {
            setValue({ Product_Type_Name: "" });
            setImageFile(null);
            setImagePreview(product);
          }}
        >
          <img src={ic_close1} alt="" className=" " />
          <div className="text-white text-2xl">ຍົກເລີກ</div>
        </div>
        <div className="mx-2"></div>
        <div
          className=" bg-greenBottle flex justify-between py-1 px-5 rounded-md items-center "
          onClick={handleSubmit}
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
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ເວລາ</th>
              <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ວັນທີ</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{index + 1}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {item.Product_Type_Name}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light"> {formatTime(item.timeStamp)}</td>
                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">  {formatDate(item.timeStamp)}</td>
                <div className="flex items-center justify-around">
                  <img
                    src={ic_edit}
                    alt=""
                    className="pr-2"
                    onClick={() => {
                      setValueEdit({
                        Product_Type_ID: item.Product_Type_ID,
                        Product_Type_Name: item.Product_Type_Name,
                        img: item.img,
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
                        confirmButtonText: "ລົບ  ! ",
                        cancelButtonText: "ຍົກເລີກ",
                      }).then(async (result) => {
                        if (result.isConfirmed) {
                          dispatch(DeleteType(item.Product_Type_ID));
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

export default TypeScreen;
