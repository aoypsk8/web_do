import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import ic_restart from '../../../assets/icons/restart.svg';
import ic_save from '../../../assets/icons/save.svg';
import ic_search from '../../../assets/icons/search.svg';
import ic_edit from '../../../assets/icons/edit.svg';
import ic_pintter from '../../../assets/icons/pintter.svg';
import ic_delete from '../../../assets/icons/delete.svg';
import location from '../../../assets/icons/location.png';
import ic_add from '../../../assets/icons/add.svg';
import '../../../App.css';
import AddConsumerManagementModalComponent from './addConsumerManagementModal.jsx';

// Product Management Modal Component
const CustomerManagementModalComponent = ({ isOpen, onClose }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [forceRender, setForceRender] = useState(false);

    const closeModal = () => {
        setForceRender(prev => !prev); // Toggle forceRender
        console.log(isModalOpen);
        setIsModalOpen(false);
    };
    useEffect(() => {
        console.log("isModalOpen is now:", isModalOpen);
        if (isModalOpen == false) {
            const handleClickOutside = (event) => {
                if (isOpen && !event.target.closest('.modal-content')) {
                    console.log("onClose customer");
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
    //dropdow
    const [selectedUnit, setSelectedUnit] = useState("ສາຍນ້ຳ");
    const unitData = ["saab", "option2", "option3"];

    const fakeData = [
        {
            id: 1,
            district: "ໄຊທານີ",
            province: "ນະຄອນຫຼວງວຽງຈັນ"
        },
        {
            id: 2,
            district: "ໄຊທານີ",
            province: "ນະຄອນຫຼວງວຽງຈັນ"
        }, {
            id: 3,
            district: "ໄຊທານີ",
            province: "ນະຄອນຫຼວງວຽງຈັນ"
        }, {
            id: 4,
            district: "ໄຊທານີ",
            province: "ນະຄອນຫຼວງວຽງຈັນ"
        }, {
            id: 5,
            district: "ໄຊທານີ",
            province: "ນະຄອນຫຼວງວຽງຈັນ"
        }, {
            id: 6,
            district: "ໄຊທານີ",
            province: "ນະຄອນຫຼວງວຽງຈັນ"
        }, {
            id: 7,
            district: "ໄຊທານີ",
            province: "ນະຄອນຫຼວງວຽງຈັນ"
        }, {
            id: 8,
            district: "ໄຊທານີ",
            province: "ນະຄອນຫຼວງວຽງຈັນ"
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
                        <p className="text-2xl font-medium my-3">ຈັດການຂໍ້ມູນລູກຄ້າ</p>
                    </div>
                    <div className="w-full my-5 h-[600px] px-14 py-1  ">
                        <div className="h-[100%] border border-lineColor rounded-md">
                            <div className="p-5">
                                <p className="text-xl">ເລືອກທີມ</p>
                                <div className="w-[100%] flex justify-between">
                                    <div className="w-1/4 border border-lineColor rounded-md my-2 flex justify-center items-center">
                                        <input
                                            className="w-full py-2 px-5 rounded text-start"
                                            id="price"
                                            name="price"
                                            type="text"
                                            required=""
                                            placeholder="ທ້າວ ເລັນ"
                                        />
                                    </div>
                                    <div className="w-1/4 ">
                                        <CustomDropdown
                                            options={unitData}
                                            selectedOption={selectedUnit}
                                            onSelect={setSelectedUnit}
                                        />
                                    </div>
                                    <div className="w-1/4 border border-lineColor rounded-md my-2 flex justify-center items-center px-2">
                                        <img src={ic_search} alt="" className="w-4 h-4" />
                                        <input
                                            className="w-full rounded text-start focus:outline-none ml-2"
                                            id="name"
                                            name="name"
                                            required=""
                                            placeholder="ຄົ້ນຫາ"
                                        />
                                    </div>
                                    <div className="w-1/6 bg-greenBottle rounded-md my-2 px-5 flex justify-center items-center ">
                                        <img src={ic_pintter} alt="h-[100%] " className="w-6 h-6 " />
                                        <div className="text-white text-lg pl-2" >ພິມອອກ</div>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-lineColor w-full py-3  bg-lineColor flex justify-between items-center px-5 ">
                                <p className="text-base font-light w-1/6">ລຳດັບ</p>
                                <p className="text-base font-light w-1/6">ທີ່ຢູ່</p>
                                <p className="text-base font-light w-1/6">ສາຍນ້ຳ</p>
                                <p className="text-base font-light w-1/6">ລະຫັດ</p>
                                <p className="text-base font-light w-1/5">ຊື່ ແລະ ນາມສະກຸນ</p>
                                <p className="text-base font-light w-1/6">ຮ່ອມ</p>
                                <p className="text-base font-light w-1/6">ເລກເຮືອນ</p>
                                <p className="text-base font-light w-1/6">ບ້ານ</p>
                                <p className="text-base font-light w-1/6">ເບີໂທ</p>
                                <p className="text-base font-light w-1/6">ຕຸກປະຈຳ</p>
                                <p className="text-base font-light w-1/6">ການຈັດການ</p>
                                <p className="text-base font-light w-1/6"></p>
                            </div>
                            <div className="w-full pt-3 pb-5 mt-3 mb-1 bg-white flex justify-between items-center px-5 border-b border-lineColor">
                                <p className="text-base font-light w-1/6">01</p>
                                <p className="text-base font-light w-1/6"><img src={location} alt="" /></p>
                                <p className="text-base font-light w-1/6">ວັນຈັນ</p>
                                <p className="text-base font-light w-1/6">C00061</p>
                                <p className="text-base font-light w-1/5">ແມ່ຍັນ</p>
                                <p className="text-base font-light w-1/6">01</p>
                                <p className="text-base font-light w-1/6">201</p>
                                <p className="text-base font-light w-1/6">ລາດຄວາຍ</p>
                                <p className="text-base font-light w-1/6">78578755</p>
                                <p className="text-base font-light w-1/6">04</p>
                                <div className="flex justify-evenly w-1/6">
                                    <img src={ic_edit} alt="" className="w-6 h-6" />
                                    <img src={ic_delete} alt="" className="w-6 h-6" />
                                </div>
                                <div className="w-1/6 flex flex-col justify-center items-center " onClick={() => {
                                    console.log(isModalOpen);
                                    setIsModalOpen(true);
                                    setForceRender(prev => !prev); // Toggle forceRender
                                    console.log(isModalOpen);
                                }} >
                                    <div className="flex justify-center items-center bg-restartColor rounded-md py-1 px-2">
                                        <img src={ic_add} alt="h-[100%] " className="w-6 h-6 " />
                                        <div className="text-white  pl-2" >ເພີ່ມໃໝ່</div>
                                    </div>
                                    <IoIosArrowDown className="w-6 h-6 text-restartColor" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen === true && <AddConsumerManagementModalComponent onClose={() => {
                closeModal();
            }}
            />}
        </div>
    );
};

export default CustomerManagementModalComponent;
