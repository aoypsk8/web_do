import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import ic_save1 from "../../../assets/icons/save1.svg";
import ic_close1 from "../../../assets/icons/close1.svg";
import product from "../../../assets/lloo-removebg-preview.png";
import "../../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { CreateProduct } from "../../../api/productAPI/productAction";

const iProductManageModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [unitId, setUnitId] = useState("");
  const [typeId, setTypeId] = useState("");
  const [unitData, setUnitData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [value, setValue] = useState({
    Product_Name: "",
    Description: "",
    Price: "",
    ProductQty: "",
    Promotion: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(product);
  const [imageName, setImageName] = useState("ເລືອກຮູບພາບ"); // New state variable for the image name

  const { unit } = useSelector((state) => state.unit);
  const { type } = useSelector((state) => state.type);

  useEffect(() => {
    setUnitData(unit || []);
    setTypeData(type || []);
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".modal-content")) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, value, unit, type]);


  const [selectedType, setSelectedType] = useState({
    Product_Type_ID: null,
    Product_Type_Name: "Select Type",
  });

  const typeOptions = typeData.map((type) => ({
    Product_Type_ID: type.Product_Type_ID,
    Product_Type_Name: type.Product_Type_Name,
  }));

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setImageFile(e.target.files[0]); // File object to be used for form-data
      setImagePreview(URL.createObjectURL(file)); // Data URL for preview
      setImageName(file.name); // Update the image name

      console.log("Image file state after update:", file); // Log file object for debugging
    }
  };

  useEffect(() => {
    console.log("imageFile state:", imageFile);
  }, [imageFile]);

  const triggerFileInput = () => {
    document.getElementById("image").click();
  };

  const handleSubmit = () => {
    var data = dispatch(
      CreateProduct(
        typeId,
        value.Product_Name,
        value.Description,
        value.Price,
        value.ProductQty,
        2,
        imageFile
      )
    );
    console.log(data);
  };

  const CustomDropdownUnit = ({ options, selectedOption, onSelect }) => {
    const [isOpenDropDown, setIsOpenDropDown] = useState(false);
    const toggleDropdown = () => {
      setIsOpenDropDown(!isOpenDropDown);
    };
    const handleSelect = (option) => {
      setUnitId(option.Unit_ID);
      onSelect(option);
      toggleDropdown();
    };
    return (
      <div className="relative">
        <div
          className="hover:cursor-pointer flex w-full border border-lineColor rounded-md my-2 px-5 justify-between items-center py-2"
          onClick={toggleDropdown}
        >
          {selectedOption.Unit_Name}
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
                {option.Unit_Name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const CustomType = ({ options, selectedOption, onSelect }) => {
    const [isOpenDropDown, setIsOpenDropDown] = useState(false);
    const toggleDropdown = () => {
      setIsOpenDropDown(!isOpenDropDown);
    };
    const handleSelect = (option) => {
      setTypeId(option.Product_Type_ID);
      onSelect(option);
      toggleDropdown();
    };
    return (
      <div className="relative">
        <div
          className="hover:cursor-pointer flex w-full border border-lineColor rounded-md my-2 px-5 justify-between items-center py-2"
          onClick={toggleDropdown}
        >
          {selectedOption.Product_Type_Name}
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
                {option.Product_Type_Name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="flex flex-col items-center justify-center">
          <div className="border-b border-lineColor w-full flex justify-center items-center">
            <p className="text-2xl font-medium my-3">ເພີ່ມສິນຄ້າ</p>
          </div>
          <div className="w-full my-5">
            <div className="w-full flex justify-center">
              <div className="w-2/3 px-32 justify-between grid grid-cols-2">
                <div className="pr-5">
                  <p className="text-xl">ຊື່ສິນຄ້າ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="Product_Name"
                      name="Product_Name"
                      type="text"
                      required
                      placeholder="ຊື່ສິນຄ້າ"
                      value={value.Product_Name}
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
                      {imageName} {/* Display the image name */}
                    </button>
                  </div>
                </div>
                <div className="pr-5">
                  <p className="text-xl">ລາຍລະອຽດ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <textarea
                      className="w-full py-2 px-5 rounded text-start"
                      id="Description"
                      name="Description"
                      type="text"
                      required
                      placeholder="ລາຍລະອຽດ"
                      value={value.Description}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="pl-5">
                  <p className="text-xl">ລາຄາ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="Price"
                      name="Price"
                      type="number"
                      required
                      placeholder="ລາຄາ"
                      value={value.Price}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="pr-5">
                  <p className="text-xl">ຈຳນວນ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded text-start"
                      id="ProductQty"
                      name="ProductQty"
                      type="number"
                      required
                      placeholder="ຈຳນວນ"
                      value={value.ProductQty}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="pl-5">
                  <p className="text-xl">ປະເພດສິນຄ້າ</p>
                  <CustomType
                    options={typeOptions}
                    selectedOption={selectedType}
                    onSelect={(option) => setSelectedType(option)}
                  />
                </div>
              </div>
            </div>
            <div className="w-full mt-5 flex justify-center">
              <div className="border border-lineColor rounded-md p-2 flex items-center justify-center h-48 w-48">
                <img
                  src={imagePreview}
                  alt="Selected Preview"
                  className="object-contain max-w-full max-h-full"
                />
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

export default iProductManageModal;
