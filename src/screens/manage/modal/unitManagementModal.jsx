import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import ic_restart from '../../../assets/icons/restart.svg';
import ic_save from '../../../assets/icons/save.svg';
import ic_search from '../../../assets/icons/search.svg';
import ic_edit from '../../../assets/icons/edit.svg';
import ic_delete from '../../../assets/icons/delete.svg';
import '../../../App.css';
import { CreateUnit, DeleteUnit, GetAllUnit } from "../../../api/unit/unitAction";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UnitModalComponent = ({ isOpen, onClose, children }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forceRender, setForceRender] = useState(false);
  const [value, setValue] = useState({ unitname: "" });
  const dispatch = useDispatch();
  const unitData = useSelector(state => state.unit.unit);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const deleteUnitFunc = (id) => {
    setIsModalOpen(true);
    setForceRender(prev => !prev);
    Swal.fire({
      title: 'ທ່ານຕ້ອງການລົບ?',
      text: 'ທ່ານຕ້ອງການລົບບໍ່!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ລົບ ! ',
      cancelButtonText: "ຍົກເລີກ",
    }).then(async (result) => {
      console.log(result);
      if (result.isConfirmed) {
        Swal.clickConfirm();
        const messageReturn = await DeleteUnit(id);
        if (messageReturn.success) {
          toast.success(messageReturn.message);
        } else {
          toast.error(messageReturn.message);
        }
      }
      setIsModalOpen(false);
      setForceRender(prev => !prev);
    });

  }


  const createUnitFunc = async () => {
    const messageReturn = await CreateUnit(value);
    if (messageReturn.success) {
      toast.success(messageReturn.message);
    } else {
      toast.error(messageReturn.message);
    }
    setForceRender(prev => !prev);
  }

  useEffect(() => {
    // fetch data(unit)
    dispatch(GetAllUnit());
    if (isModalOpen == false) {
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

    }
  }, [isOpen, onClose, forceRender]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set number of items per page
  const totalPages = Math.ceil(unitData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = unitData.slice(indexOfFirstItem, indexOfLastItem);
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
      <ToastContainer />
      <div className="modal-content">
        <div className="flex flex-col items-center justify-center">
          <div className="border-b border-lineColor w-full flex justify-center">
            <p className="text-2xl font-medium my-3">ຈັດການຂໍ້ມູນຫົວໜ່ວຍ</p>
          </div>
          <div className="w-full my-5 flex px-10">
            <div className="w-1/3 ">
              <div className="w-full border border-lineColor p-5 rounded-md">
                <p className="text-xl">ຊື່ຫົວໜ່ວຍ</p>
                <div className="w-full border border-lineColor rounded-md my-2 flex justify-center items-center">
                  <input
                    className="w-full py-2 px-5 rounded text-center"
                    name="unitname"
                    autoComplete="off"
                    type="text"
                    required=""
                    placeholder="ຊື່ຫົວໜ່ວຍ"
                    onChange={handleChange}
                  />
                </div>


                <div className="w-full flex justify-between items-center mt-10 mb-3">
                  <div className="w-1/4 bg-restartColor flex justify-between py-1 px-2 rounded-md">
                    <img src={ic_restart} alt="" className=" " />
                    <div className="text-white text-lg">restart</div>
                  </div>
                  <div className="w-1/4 bg-greenBottle flex justify-between py-1 px-2 rounded-md" onClick={() => { createUnitFunc(); }}>
                    <img src={ic_save} alt="" className=" " />
                    <div className="text-white text-lg " >ບັນທຶກ</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-2/3 ml-10 h-[600px] border border-lineColor py-3 rounded-md flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center px-5">
                  <p className="text-xl w-1/3">ຂໍ້ມູນຫົວໜ່ວຍ</p>
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
                  <p className="text-base font-light w-1/6">ຊື່ຫົວໜ່ວຍ</p>
                  <p className="text-base font-light w-1/6">ການຈັດການ</p>
                </div>
                {currentItems.map((item, index) => (
                  <div className="w-full pt-3 pb-5 mt-3 mb-1 bg-white flex justify-between items-center px-5 border-b border-lineColor" key={item.id}>
                    <p className="text-base font-light w-1/6">{indexOfFirstItem + index + 1}</p>
                    <p className="text-base font-light w-1/6">{item.unit}</p>
                    <div className="flex justify-evenly w-1/6">
                      <div className="flex  mx-1 items-center" onClick={() => { }}>
                        <img src={ic_edit} alt="" className="w-4 h-4" />
                        <p className="text-base font-light ml-1">Edit</p>
                      </div>
                      <div className="flex mx-1 items-center" onClick={() => {
                        deleteUnitFunc(item.id);

                      }}>
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

export default UnitModalComponent;
