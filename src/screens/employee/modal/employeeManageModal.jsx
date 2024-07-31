import React, { useEffect, useState } from "react";
import ic_save1 from "../../../assets/icons/save1.svg";
import ic_close1 from "../../../assets/icons/close1.svg";
import product from "../../../assets/lloo-removebg-preview.png";
import "../../../App.css";
import { useDispatch } from "react-redux";
import { CreateEmployee } from "../../../api/employeeAPI/employeeAction";

const EmployeeManageModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    First_name: "",
    Last_name: "",
    gender: "",
    Roles: "",
    Village: "",
    District: "",
    Province: "",
    Phone_Number: "",
    Password: "",
    Product_img: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(product);

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
      CreateEmployee(
        value.First_name,
        value.Last_name,
        value.gender,
        value.Roles,
        value.Village,
        value.District,
        value.Province,
        value.Phone_Number,
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
            <p className="text-2xl font-medium my-3">ເພີ່ມພະນັກງານ</p>
          </div>
          <div className="w-full my-5">
            <div className="w-full flex justify-center">
              <div className="w-2/3 px-32 grid grid-cols-2 gap-5">
                <div className="pr-5">
                  <p className="text-xl">ລະຫັດພະນັກງານ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="employee_code"
                      name="employee_code"
                      type="text"
                      placeholder="ລະຫັດພະນັກງານ"
                      disabled
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
                  <p className="text-xl">ຊື່ພະນັກງານ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="First_name"
                      name="First_name"
                      type="text"
                      placeholder="ຊື່ພະນັກງານ"
                      value={value.First_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="pl-5">
                  <p className="text-xl">ບ້ານ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="Village"
                      name="Village"
                      type="text"
                      placeholder="ບ້ານ"
                      value={value.Village}
                      onChange={handleChange}
                      required
                    />
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
                      placeholder="ນາມສະກຸນ"
                      value={value.Last_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="pl-5">
                  <p className="text-xl">ເມືອງ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="District"
                      name="District"
                      type="text"
                      placeholder="ເມືອງ"
                      value={value.District}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="pr-5">
                  <p className="text-xl">ເພດ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <select
                      className="w-full py-2 px-5 rounded text-start"
                      id="gender"
                      name="gender"
                      value={value.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        ເລືອກເພດ
                      </option>
                      <option value="male">ຊາຍ</option>
                      <option value="female">ຍິງ</option>
                      <option value="other">ອື່ນໆ</option>
                    </select>
                  </div>
                </div>
                <div className="pl-5">
                  <p className="text-xl">ແຂວງ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="Province"
                      name="Province"
                      type="text"
                      placeholder="ແຂວງ"
                      value={value.Province}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="pr-5">
                  <p className="text-xl">ບົດບາດ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <select
                      className="w-full py-2 px-5 rounded text-start"
                      id="Roles"
                      name="Roles"
                      value={value.Roles}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        ເລືອກບົດບາດ
                      </option>
                      <option value="admin">Admin</option>
                      <option value="employee">Employee</option>
                    </select>
                  </div>
                </div>
                <div className="pl-5">
                  <p className="text-xl">ເບີໂທ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="Phone_Number"
                      name="Phone_Number"
                      type="text"
                      placeholder="ເບີໂທ"
                      value={value.Phone_Number}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="pr-5">
                  <p className="text-xl">ລະຫັດຜ່ານ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="Password"
                      name="Password"
                      type="password"
                      placeholder="ລະຫັດຜ່ານ"
                      value={value.Password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="pl-5">
                  <p className="text-xl">ຮູບພາບ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <img
                      src={imagePreview}
                      alt="Employee"
                      className="w-full h-auto rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full flex justify-center mt-5">
              <button
                className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 bg-greenBottle"
                onClick={handleSubmit}
              >
                <img src={ic_save1} alt="Save" className="inline mr-2" />
                ບັນທຶກ
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded bg-redBottle"
                onClick={onClose}
              >
                <img src={ic_close1} alt="Close" className="inline mr-2" />
                ຍົກເລີກ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManageModal;
