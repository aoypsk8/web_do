import React, { useEffect, useState } from "react";
import ic_save1 from "../../../assets/icons/save1.svg";
import ic_close1 from "../../../assets/icons/close1.svg";
import "../../../App.css";
import { useDispatch } from "react-redux";
import { UpdateType } from "../../../api/typeAPI/typeAction";
// Product Management Modal Component
const TypeEditModal = ({
  isOpen,
  onClose,
  Product_Type_ID,
  Product_Type_Name,
  img,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".modal-content")) {
        console.log("HI");
        onClose();
      }
    };
    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const [value, setValue] = useState({
    Product_Type_Name: Product_Type_Name,
  });
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(img);
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

  const handleSubmit = () => {
    dispatch(UpdateType(Product_Type_ID, value.Product_Type_Name, imageFile));
  };
  return (
    <div className="modal-overlay ">
      <div className="modal-content">
        <div className="flex flex-col items-center justify-center">
          <div className="border-b border-lineColor w-full flex justify-center items-center">
            <p className="text-2xl font-medium my-3">ປະເພດສິນຄ້າ (ແກ້ໄຂ)</p>
          </div>
          <div className="w-full my-5  ">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="w-2/3 px-32 justify-between grid grid-cols-2  ">
                <div className="  pl-10">
                  {" "}
                  <p className="text-xl">ຊື່ປະເພດສິນຄ້າ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded "
                      id="Product_Type_Name"
                      name="Product_Type_Name"
                      type="text"
                      required=""
                      value={value.Product_Type_Name}
                      placeholder="ຊື່ຜູ້ສະຫນອງ"
                      onChange={handleChange}
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
              </div>
              <img
                src={imagePreview}
                alt=""
                className="object-cover items-center w-52 h-52 my-10"
              />
            </div>
            <div className=" flex justify-end  mt-10 px-5 ">
              <div
                className="w-1/6 bg-redBottle flex justify-between py-1 px-5 rounded-md items-center "
                onClick={() => onClose()}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeEditModal;
