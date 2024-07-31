import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ic_save1 from "../../../assets/icons/save1.svg";
import ic_close1 from "../../../assets/icons/close1.svg";
import product from "../../../assets/lloo-removebg-preview.png";
import "../../../App.css";
import { CreateCustomer } from "../../../api/cutomerAPI/customerAction";

// Product Management Modal Component
const CustomerManageModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    First_name: "",
    Last_name: "",
    Phone_Number: "",
    Address: "",
    Password: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(product);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setImageFile(file); // File object to be used for form-data
      setImagePreview(URL.createObjectURL(file)); // Data URL for preview
    }
  };

  const triggerFileInput = () => {
    document.getElementById("image").click();
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      await dispatch(
        CreateCustomer(
          value.First_name,
          value.Last_name,
          value.Phone_Number,
          value.Address,
          value.Password,
          imageFile
        )
      );
      onClose(); // Close the modal on success
    } catch (err) {
      setError("Failed to create customer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="flex flex-col items-center justify-center">
          <div className="border-b border-lineColor w-full flex justify-center items-center">
            <p className="text-2xl font-medium my-3">ເພີ່ມຜູ້ໃຊ້</p>
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
                  <p className="text-xl">ຄຳບັນຍາຍ</p>
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
                      type="text"
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
                  alt="Profile Preview"
                  className="w-full object-contain items-center"
                />
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-center my-4">
                {error}
              </div>
            )}
            <div className="flex justify-end mt-28 px-5">
              <div
                className="w-1/6 bg-redBottle flex justify-between py-1 px-5 rounded-md items-center"
                onClick={() => onClose()}
              >
                <img src={ic_close1} alt="Close" />
                <div className="text-white text-2xl">ຍົກເລີກ</div>
              </div>
              <div className="mx-2"></div>
              <div
                className="w-1/6 bg-greenBottle flex justify-between py-1 px-5 rounded-md items-center"
                onClick={handleSubmit}
                disabled={loading}
              >
                <img src={ic_save1} alt="Save" />
                <div className="text-white text-2xl">
                  {loading ? "ກະລຸນາເບິ່ງ..." : "ບັນທຶກ"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerManageModal;
