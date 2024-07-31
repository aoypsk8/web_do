import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import ic_restart from '../../../assets/icons/restart.svg';
import ic_save from '../../../assets/icons/save.svg';
import ic_search from '../../../assets/icons/search.svg';
import ic_edit from '../../../assets/icons/edit.svg';
import ic_delete from '../../../assets/icons/delete.svg';
import '../../../App.css';

const ProvinceManagementModalComponent = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.modal-content')) {
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

  if (!isOpen) return null;



  const fakeData = [
    {
      id: 1,
      province: "ນະຄອນຫຼວງວຽງຈັນ",
    },
    {
      id: 2,
      province: "ນະຄອນຫຼວງວຽງຈັນ",

    }, {
      id: 3,
      province: "ນະຄອນຫຼວງວຽງຈັນ",

    }, {
      id: 4,
      province: "ນະຄອນຫຼວງວຽງຈັນ",

    }, {
      id: 5,
      province: "ນະຄອນຫຼວງວຽງຈັນ",

    }, {
      id: 6,
      province: "ນະຄອນຫຼວງວຽງຈັນ",

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

  return (
    <div className="modal-overlay " >
      <div className="modal-content">
        <div className="flex flex-col items-center justify-center">
          <div className="border-b border-lineColor w-full flex justify-center">
            <p className="text-2xl font-medium my-3">ຈັດການຂໍ້ມູນແຂວງ</p>
          </div>
          <div className="w-full my-5 flex px-10">
            <div className="w-1/3 ">
              <div className="w-full border border-lineColor p-5 rounded-md">
                <p className="text-xl">ຂໍ້ມູນແຂວງ</p>
                <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                  <input
                    className="w-full py-2 px-5 rounded text-center"
                    id="name"
                    name="name"
                    type="text"
                    required=""
                    placeholder="ຂໍ້ມູນແຂວງ"
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
                  <p className="text-xl w-1/3">ຂໍ້ມູນຕຳແໜ່ງ</p>
                  <div className=" border w-1/3 border-lineColor px-5 py-2 rounded-md flex items-center ">
                    <img src={ic_search} alt="" className="w-4 h-4" />
                    <input
                      className="w-full rounded text-start focus:outline-none ml-2"
                      id="name"
                      name="name"
                      required=""
                      placeholder="ຄົ້ນຫາ"
                    />
                  </div>
                </div>
                <div className="border border-lineColor w-full py-3 mt-3 bg-bgHead flex justify-between items-center px-5 ">
                  <p className="text-base font-light w-1/6">ລຳດັບ</p>
                  <p className="text-base font-light w-1/6">ແຂວງ</p>
                  <p className="text-base font-light w-1/6">ການຈັດການ</p>
                </div>
                {currentItems.map((item) => (
                <div className="w-full pt-3 pb-5 mt-3 mb-1 bg-white flex justify-between items-center px-5 border-b border-lineColor">
                  <p className="text-base font-light w-1/6">{item.id}</p>
                  <p className="text-base font-light w-1/6">{item.province}</p>
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




export default ProvinceManagementModalComponent;

