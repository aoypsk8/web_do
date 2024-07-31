import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import ic_save1 from "../../../assets/icons/save1.svg";
import ic_close1 from "../../../assets/icons/close1.svg";
import product from "../../../assets/pro.png";
import "../../../App.css";
import { useDispatch } from "react-redux";
import { UpdateCustomer } from "../../../api/cutomerAPI/customerAction";
// Product Management Modal Component

const CustomerManageEditModal = ({
  isOpen,
  onClose,
  First_name,
  Last_name,
  Phone_Number,
  Profile_img,
  Address,
  Password,
  Cus_ID,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    Cus_ID,
    First_name,
    Last_name,
    Phone_Number,
    Address,
    Password,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(Profile_img);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".modal-content")) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    document.getElementById("image").click();
  };

  const handleSubmit = () => {
    dispatch(
      UpdateCustomer(
        value.Cus_ID,
        value.First_name,
        value.Last_name,
        value.Phone_Number,
        value.Address,
        value.Password,
        imageFile
      )
    );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="flex flex-col items-center justify-center">
          <div className="border-b border-lineColor w-full flex justify-center items-center">
            <p className="text-2xl font-medium my-3">ລູກຄ້າ (ແກ້ໄຂ)</p>
          </div>
          <div className="w-full my-5">
            <div className="w-full flex justify-center">
              <div className="w-2/3 px-32 justify-between grid grid-cols-2">
                <div className="pr-5">
                  <p className="text-xl">ຊື່ຜູ້ໃຊ້</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="First_name"
                      name="First_name"
                      type="text"
                      required
                      placeholder="ຊື່ຜູ້ໃຊ້"
                      value={value.First_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="pl-5">
                  <p className="text-xl">ຮູບພາບ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="hidden"
                      id="image"
                      name="image"
                      type="file"
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
                <div className="pr-5">
                  <p className="text-xl">ນາມສະກຸນ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="Last_name"
                      name="Last_name"
                      type="text"
                      required
                      placeholder="ນາມສະກຸນ"
                      value={value.Last_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="pl-5">
                  <p className="text-xl">ທີ່ຢູ່</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center pb-28">
                    <input
                      className="w-full py-2 px-5 rounded text-start focus:outline-none focus:border-none focus:shadow-none"
                      id="Address"
                      name="Address"
                      type="text"
                      required
                      placeholder="ທີ່ຢູ່"
                      value={value.Address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="pr-5">
                  <p className="text-xl">ເບີໂທ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="Phone_Number"
                      name="Phone_Number"
                      type="text"
                      required
                      placeholder="ເບີໂທ"
                      value={value.Phone_Number}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="pl-5">
                  <p className="text-xl">ລະຫັດຜ່ານ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="Password"
                      name="Password"
                      type="password"
                      required
                      value={value.Password}
                      onChange={handleChange}
                      placeholder="ລະຫັດຜ່ານ"
                    />
                  </div>
                </div>
              </div>
              <div className="w-1/3 flex justify-center items-center">
                <img
                  src={imagePreview}
                  alt="Customer"
                  className="w-full object-contain items-center"
                />
              </div>
            </div>
            <div className="flex justify-end mt-28 px-5">
              <div
                className="w-1/6 bg-redBottle flex justify-between py-1 px-5 rounded-md items-center cursor-pointer"
                onClick={onClose}
              >
                <img src={ic_close1} alt="Close" />
                <div className="text-white text-2xl">ຍົກເລີກ</div>
              </div>
              <div className="mx-2"></div>
              <div
                className="w-1/6 bg-greenBottle flex justify-between py-1 px-5 rounded-md items-center cursor-pointer"
                onClick={handleSubmit}
              >
                <img src={ic_save1} alt="Save" />
                <div className="text-white text-2xl">ບັນທຶກ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerManageEditModal;