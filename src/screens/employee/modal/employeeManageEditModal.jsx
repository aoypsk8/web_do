import React, { useEffect, useState } from "react";
import ic_save1 from "../../../assets/icons/save1.svg";
import ic_close1 from "../../../assets/icons/close1.svg";
import "../../../App.css";
import { useDispatch } from "react-redux";
import { UpdateEmployee } from "../../../api/employeeAPI/employeeAction";

const EmployeeManageEditModal = ({
  isOpen,
  onClose,
  Emp_ID,
  First_name,
  Last_name,
  gender,
  Roles,
  Village,
  District,
  Province,
  Phone_Number,
  Password,
  Product_img,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    Emp_ID: "",
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

  useEffect(() => {
    setValue({
      Emp_ID,
      First_name,
      Last_name,
      gender,
      Roles,
      Village,
      District,
      Province,
      Phone_Number,
      Password,
      Product_img,
    });
    setImagePreview(Product_img);
  }, [Emp_ID, First_name, Last_name, gender, Roles, Village, District, Province, Phone_Number, Password, Product_img]);

  const [imageFile, setImageFile] = useState(Product_img);
  const [imagePreview, setImagePreview] = useState(Product_img);

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
      UpdateEmployee(
        value.Emp_ID,
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
            <p className="text-2xl font-medium my-3">ເພີ່ມພະນັກງານ (ແກ້ໄຂ)</p>
          </div>
          <div className="w-full my-5">
            <div className="w-full flex justify-center">
              <div className="w-2/3 px-32 justify-between grid grid-cols-2">
                <div className="pr-5">
                  <p className="text-xl">ລະຫັດພະນັກງານ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="Emp_ID"
                      name="Emp_ID"
                      type="text"
                      placeholder="ລະຫັດພະນັກງານ"
                      value={value.Emp_ID}
                      disabled={true}
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
                  <p className="text-xl">ຊື່ພະນັກງານ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="First_name"
                      name="First_name"
                      type="text"
                      required
                      placeholder="ຊື່ພະນັກງານ"
                      value={value.First_name}
                      onChange={handleChange}
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
                      required
                      placeholder="ບ້ານ"
                      value={value.Village}
                      onChange={handleChange}
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
                      required
                      placeholder="ນາມສະກຸນ"
                      value={value.Last_name}
                      onChange={handleChange}
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
                      required
                      placeholder="ເມືອງ"
                      value={value.District}
                      onChange={handleChange}
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
                      required
                      value={value.gender}
                      onChange={handleChange}
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
                      required
                      placeholder="ແຂວງ"
                      value={value.Province}
                      onChange={handleChange}
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
                      required
                      value={value.Roles}
                      onChange={handleChange}
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
                  <p className="text-xl">ເບີໂທລະສັບ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="Phone_Number"
                      name="Phone_Number"
                      type="text"
                      required
                      placeholder="ເບີໂທລະສັບ"
                      value={value.Phone_Number}
                      onChange={handleChange}
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
                      required
                      placeholder="ລະຫັດຜ່ານ"
                      value={value.Password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-5">
              <div className="w-full px-10 flex justify-between">
                <button
                  className="flex items-center bg-greenBottle hover:bg-green-600 text-white py-2 px-4 rounded-md"
                  onClick={handleSubmit}
                >
                  <img src={ic_save1} className="w-5 h-5 mr-2" alt="save" />
                  Save
                </button>
                <div className="w-5 h-1"></div>
                <button
                  className="flex items-center bg-redBottle hover:bg-red-600 text-white py-2 px-4 rounded-md"
                  onClick={onClose}
                >
                  <img src={ic_close1} className="w-5 h-5 mr-2" alt="close" />
                  Close
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManageEditModal;
