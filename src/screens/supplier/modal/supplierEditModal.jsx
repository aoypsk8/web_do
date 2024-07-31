import React, { useEffect, useState } from "react";
import ic_save1 from "../../../assets/icons/save1.svg";
import ic_close1 from "../../../assets/icons/close1.svg";
import "../../../App.css";
import { useDispatch } from "react-redux";
import { EditSupplier } from "../../../api/supplier/supplierAction";
// Product Management Modal Component
const SupplierEditModal = ({
  isOpen,
  onClose,
  Sl_ID,
  First_name,
  Phone_Number,
  Village,
  District,
  Province,
}) => {
  console.log(First_name);
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
    First_name: First_name,
    Phone_Number: Phone_Number,
    Village: Village,
    District: District,
    Province: Province,
  });
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    dispatch(
      EditSupplier(
        Sl_ID,
        value.First_name,
        value.Phone_Number,
        value.Village,
        value.District,
        value.Province
      )
    );
  };

  return (
    <div className="modal-overlay ">
      <div className="modal-content">
        <div className="flex flex-col items-center justify-center">
          <div className="border-b border-lineColor w-full flex justify-center items-center">
            <p className="text-2xl font-medium my-3">ຜູ້ສະຫນອງ (ແກ້ໄຂ)</p>
          </div>
          <div className="w-full my-5  ">
            <div className="w-full flex justify-center">
              <div className="w-2/3 px-32 justify-between grid grid-cols-2  ">
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
                      value={value.First_name}
                      placeholder="ຊື່ຜູ້ສະຫນອງ"
                      onChange={handleChange}
                    />
                  </div>
                </div>{" "}
                <div className="pl-10">
                  {" "}
                  <p className="text-xl">ເບີໂທ</p>
                  <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                    <input
                      className="w-full py-2 px-5 rounded "
                      id="Phone_Number"
                      name="Phone_Number"
                      type="number"
                      required=""
                      value={value.Phone_Number}
                      placeholder="ເບີໂທ"
                      onChange={handleChange}
                    />
                  </div>
                </div>{" "}
                <div className=" pl-10">
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
                      value={value.Village}
                      onChange={handleChange}
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
                      value={value.District}
                      onChange={handleChange}
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
                      value={value.Province}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex justify-end  mt-36 px-5 ">
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

export default SupplierEditModal;
