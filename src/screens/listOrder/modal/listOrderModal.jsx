import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import "../../../App.css";
import { useDispatch } from "react-redux";
import { UpdateStatusOrder } from "../../../api/orderAPI/orderAction";
function formatNumber(number) {
  return new Intl.NumberFormat("en-US").format(number);
}
// Product Management Modal Component
const ListOrderModalComponent = ({
  isOpen,
  onClose,
  order,
  total,
  imgPay,
  userID,
  order_id,
}) => {
  const [selectedStatus, setSelectedStatus] = useState("ລໍຖ້າດຳເນີນການ...");
  const StatusData = ["ລໍຖ້າດຳເນີນການ...", "ສຳເລັດ"];
  const [selectedStatusUpdate, setSelectedStatusUpdate] = useState(false);
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
  }, [isOpen, onClose, selectedStatus]);
  // Handle status update when selectedStatus changes to "ສຳເລັດ"
  useEffect(() => {
    if (selectedStatus === "ສຳເລັດ" && !selectedStatusUpdate) {
      dispatch(UpdateStatusOrder(order_id, userID)).then((success) => {
        if (success) {
          setSelectedStatusUpdate(true);
        }
      });
    }
  }, [selectedStatus, selectedStatusUpdate, dispatch, order_id, userID]);
  // Custom Dropdown Component
  const CustomDropdown = ({ options, selectedOption, onSelect }) => {
    const [isOpenDropDown, setIsOpenDropDown] = useState(false);
    const toggleDropdown = () => {
      setIsOpenDropDown(!isOpenDropDown);
    };
    const handleSelect = (option) => {
      if (selectedStatusUpdate == true) {
      } else {
        onSelect(option);
        toggleDropdown();
      }
    };
    return (
      <div className="relative px-10 items-center">
        <div
          className={`hover:cursor-pointer flex w-full border border-lineColor rounded-xl my-2 px-10  justify-between items-center py-1 ${
            selectedStatusUpdate == true
              ? "text-scueecssColor"
              : "text-ggColor"
          }`}
          onClick={selectedStatusUpdate == true ? "" : toggleDropdown}
        >
          {selectedOption}
          {selectedStatusUpdate == true ? (
            ""
          ) : isOpenDropDown ? (
            <IoIosArrowDown />
          ) : (
            <IoIosArrowBack />
          )}
        </div>
        {isOpenDropDown && (
          <ul className=" absolute border border-lineColor overflow-y-auto z-10 w-full bg-white rounded-md px-3 ">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="text-lg hover:cursor-pointer my-1 "
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="modal-overlay ">
      <div className="modal-content">
        <div className="flex flex-col items-center justify-center">
          <div className="border-b border-lineColor w-full flex justify-center items-center">
            <p className="text-2xl font-medium my-3">ລາຍລະອຽດການສັ່ງຊື້</p>
            <CustomDropdown
              options={StatusData}
              selectedOption={selectedStatus}
              onSelect={setSelectedStatus}
            />
          </div>
          <div className="w-full my-5 flex px-10 justify-between pb-10 ">
            <div className="w-full  border border-lineColor rounded-md flex flex-col justify-between ml-3">
              <div className="border border-lineColor w-full py-3  bg-head flex justify-between items-center px-5 ">
                <p className="text-base font-light  flex justify-center w-1/6">
                  ລຳດັບ
                </p>
                <p className="text-base font-light  flex justify-center w-2/6">
                  ຊື່ສິນຄ້າ
                </p>
                <p className="text-base font-light  flex justify-center w-1/6">
                  ຮູບພາບ
                </p>
                <p className="text-base font-light  flex justify-center w-2/6">
                  ລາຄາ
                </p>
                <p className="text-base font-light  flex justify-center w-1/6">
                  ຈຳນວນ
                </p>
                <p className="text-base font-light  flex justify-center w-2/6">
                  ລວມ
                </p>
              </div>
              {order.map((item, index) => (
                <div
                  className="w-full py-5 bg-white flex justify-between items-center px-5 border-b border-lineColor"
                  key={index}
                >
                  <p className="text-base font-light  flex justify-center w-1/6">
                    {index + 1}
                  </p>
                  <p className="text-base font-light  flex justify-center w-2/6">
                    {item.Product_Name}
                  </p>
                  <div className="flex justify-center w-1/6 h-20">
                    <img src={item.Product_img} alt="" className=" " />
                  </div>

                  <p className="text-xl font-light  flex justify-center w-2/6">
                    {formatNumber(item.Price)} ກີບ
                  </p>

                  <p className="text-base font-light  flex justify-center w-1/6">
                    {item.quantity}
                  </p>

                  <p className="text-xl font-light  flex justify-center w-2/6">
                    {formatNumber(item.totalProduct)} ກີບ
                  </p>
                </div>
              ))}
              <div className="w-full flex justify-between px-5 bg-bgbg h-20 items-center">
                <p className="text-2xl font-medium my-3">ຍອດລວມ</p>
                <p className="text-3xl font-medium my-3">
                  {formatNumber(total)} ກີບ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOrderModalComponent;
