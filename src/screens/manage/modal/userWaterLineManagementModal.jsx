import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import ic_restart from '../../../assets/icons/restart.svg';
import ic_save from '../../../assets/icons/save.svg';
import ic_search from '../../../assets/icons/search.svg';
import ic_edit from '../../../assets/icons/edit.svg';
import ic_delete from '../../../assets/icons/delete.svg';
import '../../../App.css';


// Product Management Modal Component
const UserWaterLineManagementModalComponent = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.modal-content')) {
        console.log("HI");
        onClose();
      }
    };
    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);
    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  //dropdow
  const [selectedUnit, setSelectedUnit] = useState("ເລືອກ");
  const unitData = ["saab", "option2", "option3"];

  const [selectedWaterLine, setSelectedWaterLine] = useState("ເລືອກ");
  const WaterLineData = ["saab", "option2", "option3"];

  const fakeData = [
    {
      id: 1,
      name: "ຕຸກໃຫຍ່ 18ລິດ",
      water_line:"ວັນຈັນ/ວັນພະຫັດ",
      detail:"ບ. ນາສາລາ,ໂພນຕ້ອງ,ໜອງສອງຫ້ອງ, ໂນນສະອາດ"
    },
    {
      id: 2,
      name: "ຕຸກໃຫຍ່ 18ລິດ",
      water_line:"ວັນຈັນ/ວັນພະຫັດ",
      detail:"ບ. ນາສາລາ,ໂພນຕ້ອງ,ໜອງສອງຫ້ອງ, ໂນນສະອາດ"
    }, {
      id: 3,
      name: "ຕຸກໃຫຍ່ 18ລິດ",
      water_line:"ວັນຈັນ/ວັນພະຫັດ",
      detail:"ບ. ນາສາລາ,ໂພນຕ້ອງ,ໜອງສອງຫ້ອງ, ໂນນສະອາດ"
    }, {
      id: 4,
      name: "ຕຸກໃຫຍ່ 18ລິດ",
      water_line:"ວັນຈັນ/ວັນພະຫັດ",
      detail:"ບ. ນາສາລາ,ໂພນຕ້ອງ,ໜອງສອງຫ້ອງ, ໂນນສະອາດ"
    }, {
      id: 5,
      name: "ຕຸກໃຫຍ່ 18ລິດ",
      water_line:"ວັນຈັນ/ວັນພະຫັດ",
      detail:"ບ. ນາສາລາ,ໂພນຕ້ອງ,ໜອງສອງຫ້ອງ, ໂນນສະອາດ"
    }, {
      id: 6,
      name: "ຕຸກໃຫຍ່ 18ລິດ",
      water_line:"ວັນຈັນ/ວັນພະຫັດ",
      detail:"ບ. ນາສາລາ,ໂພນຕ້ອງ,ໜອງສອງຫ້ອງ, ໂນນສະອາດ"
    }, {
      id: 7,
      name: "ຕຸກໃຫຍ່ 18ລິດ",
      water_line:"ວັນຈັນ/ວັນພະຫັດ",
      detail:"ບ. ນາສາລາ,ໂພນຕ້ອງ,ໜອງສອງຫ້ອງ, ໂນນສະອາດ"
    }, {
      id: 8,
      name: "ຕຸກໃຫຍ່ 18ລິດ",
      water_line:"ວັນຈັນ/ວັນພະຫັດ",
      detail:"ບ. ນາສາລາ,ໂພນຕ້ອງ,ໜອງສອງຫ້ອງ, ໂນນສະອາດ"
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set number of items per page
  const totalPages = Math.ceil(fakeData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = fakeData.slice(indexOfFirstItem, indexOfLastItem);
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




  // Custom Dropdown Component
  const CustomDropdown = ({ options, selectedOption, onSelect }) => {
    const [isOpenDropDown, setIsOpenDropDown] = useState(false);
    const toggleDropdown = () => {
      setIsOpenDropDown(!isOpenDropDown);
    };
    const handleSelect = (option) => {
      onSelect(option);
      toggleDropdown();
    };
    return (
      <div className="relative ">
        <div className="hover:cursor-pointer flex w-full border border-lineColor rounded-md my-2 px-5  justify-between items-center py-2" onClick={toggleDropdown}>
          {selectedOption}
          {isOpenDropDown ? <IoIosArrowDown /> : <IoIosArrowBack />}
        </div>
        {isOpenDropDown && (
          <ul className=" absolute border border-lineColor overflow-y-auto z-10 w-full bg-white rounded-md px-3 ">
            {options.map((option, index) => (
              <li key={index} onClick={() => handleSelect(option)} className="text-lg hover:cursor-pointer my-1 ">
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  return (
    <div className="modal-overlay " >
      <div className="modal-content">
        <div className="flex flex-col items-center justify-center">
          <div className="border-b border-lineColor w-full flex justify-center">
            <p className="text-2xl font-medium my-3">ຈັດການຂໍ້ມູນສິນຄ້າ</p>
          </div>
          <div className="w-full my-5 flex px-10">
            <div className="w-1/3 ">
              <div className="w-full border border-lineColor p-5 rounded-md">
               
                <p className="text-xl mt-4">ເລືອກພະນັກງານ</p>
                <CustomDropdown
                  options={unitData}
                  selectedOption={selectedUnit}
                  onSelect={setSelectedUnit}
                />
                 <p className="text-xl mt-4">ເລືອກສາຍນຳ້</p>
                <CustomDropdown
                  options={WaterLineData}
                  selectedOption={selectedWaterLine}
                  onSelect={setSelectedWaterLine}
                />
                
                
                <p className="text-xl mt-4">ລາຍບລະອຽດ</p>
                <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                  <input
                    className="w-full py-2 px-5 rounded text-center"
                    id="price"
                    name="price"
                    type="text"
                    required=""
                    placeholder="ລາຍບລະອຽດ"
                  />
                </div>
                

                <div className="w-full flex justify-between items-center mt-10 mb-3">
                  <div className="w-1/4 bg-restartColor flex justify-between py-1 px-2 rounded-md">
                    <img src={ic_restart} alt="" className=" " />
                    <div className="text-white text-lg">restart</div>
                  </div>
                  <div className="w-1/4 bg-greenBottle flex justify-between py-1 px-2 rounded-md">
                    <img src={ic_save} alt="" className=" " />
                    <div className="text-white text-lg " >ບັນທຶກ</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-2/3 ml-10 h-[600px] border border-lineColor py-3 rounded-md flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center px-5">
                  <p className="text-xl w-1/3">ຂໍ້ມູນທີມສົ່ງນ້ຳ</p>
                  <div className=" border w-1/3 border-lineColor px-5 py-2 rounded-md flex items-center ">
                    <img src={ic_search} alt="" className="w-4 h-4" />
                    <input
                      className="w-full rounded text-start focus:outline-none ml-2"
                      id="name"
                      name="name"
                      required=""
                      placeholder="ຊື່ສິນຄ້າ"
                    />
                  </div>
                </div>
                <div className="border border-lineColor w-full py-3 mt-3 bg-bgHead flex justify-between items-center px-5 ">
                  <p className="text-base font-light w-1/6">ລຳດັບ</p>
                  <p className="text-base font-light w-1/4">ຊື່ສິນຄ້າ</p>
                  <p className="text-base font-light w-1/6">ສາຍນ້ຳ</p>
                  <p className="text-base font-light w-1/6">ລາຍລະອຽດ</p>
                  <p className="text-base font-light w-1/6">ການຈັດການ</p>
                </div>
                {currentItems.map((item) => (
                  <div className="w-full py-1 bg-white flex justify-between items-center px-5 border-b border-lineColor">
                    <p className="text-base font-light w-1/6">{item.id}</p>
                    <p className="text-base font-light w-1/4">{item.name}</p>
                    <p className="text-base font-light w-1/6">{item.water_line}</p>
                    <p className="text-base font-light w-1/6">{item.detail}</p>
                    <div className="flex justify-evenly w-1/6">
                      <div className="flex  mx-1 items-center">
                        <img src={ic_edit} alt="" className="w-4 h-4" />
                        <p className="text-base font-light ml-1">Edit</p>
                      </div>
                      <div className="flex mx-1 items-center">
                        <img src={ic_delete} alt="" className="w-4 h-4" />
                        <p className="text-base font-light ml-1">ລົບ</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full flex justify-between px-5">
                <div className="w-1/12 border border-lineColor bg-white rounded-md items-center justify-center flex" onClick={prevPage}>
                  <p className="text-base font-light text-center ">ກັບຄືນ</p>
                </div>
                <div className="w-1/12 border border-lineColor bg-white rounded-md items-center justify-center flex" onClick={nextPage}>
                  <p className="text-base font-light text-center ">ຕໍ່ໄປ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWaterLineManagementModalComponent;
