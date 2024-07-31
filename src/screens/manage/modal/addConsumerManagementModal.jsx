import React, {  useState } from "react";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import '../../../App.css';


// Product Management Modal Component
const addConsumerManagementModalComponent = ({ isOpen, onClose }) => {
    const [selectedUnit, setSelectedUnit] = useState("ເລືອກ");
    const unitData = ["saab", "option2", "option3"];
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
            <div className="second-modal-content">
                <div className="flex flex-col items-center justify-center">
                    <div className="border-b border-lineColor w-full flex justify-center">
                        <p className="text-2xl font-medium my-3">ຈັດການຂໍ້ມູນລູກຄ້າ</p>
                    </div>
                    <div className="w-full my-5 h-[600px] px-14 py-1  ">
                        <div className="w-[100%]  grid grid-cols-3  gap-5">
                            <p className="text-xl w-[100%]">ຊື່ ແລະ ນາມສະກຸນ</p>
                            <p className="text-xl w-[100%]">ເມືອງ</p>
                            <p className="text-xl w-[100%]">ບ້ານ</p>
                        </div>
                        <div className="w-[100%]    grid grid-cols-3 gap-5">
                            <div className="w-[100%] border border-lineColor rounded-md my-2 flex justify-center items-center">
                                <input
                                    className="w-full py-2 px-5 rounded text-start"
                                    id="price"
                                    name="price"
                                    type="text"
                                    required=""
                                    placeholder="ທ້າວ ເລັນ"
                                />
                            </div>
                            <div className="w-[100%] ">
                                <CustomDropdown
                                    options={unitData}
                                    selectedOption={selectedUnit}
                                    onSelect={setSelectedUnit}
                                />
                            </div>
                            <div className="w-[100%] ">
                                <CustomDropdown
                                    options={unitData}
                                    selectedOption={selectedUnit}
                                    onSelect={setSelectedUnit}
                                />
                            </div>

                        </div>
                        {/*  */}
                        <div className="w-[100%]  grid grid-cols-3  gap-5">
                            <div className="flex justify-between ">
                                <p className="text-xl w-1/2  ">ຮ່ອມ</p>
                                <p className="text-xl w-1/2">ເຮືອນເລກທີ</p>
                            </div>
                            <p className="text-xl ">ເມືອງ</p>
                            <p className="text-xl ">ທີ່ຢູ່</p>
                        </div>
                        {/*  */}
                        <div className="w-[100%]  grid grid-cols-3  gap-5">
                            <div className="flex justify-between">
                                <div className="w-1/2 border border-lineColor rounded-md my-2 flex justify-center items-center">
                                    <input
                                        className="w-full py-2 px-5 rounded text-start"
                                        id="price"
                                        name="price"
                                        type="text"
                                        required=""
                                        placeholder="ທ້າວ ເລັນ"
                                    />
                                </div>
                                <div className="w-1/2 border border-lineColor rounded-md my-2 flex justify-center items-center mx-5">
                                    <input
                                        className="w-full py-2 px-5 rounded text-start"
                                        id="price"
                                        name="price"
                                        type="text"
                                        required=""
                                        placeholder="ທ້າວ ເລັນ"
                                    />
                                </div>
                            </div>
                            <div className=" border border-lineColor rounded-md my-2 flex justify-center items-center">
                                <input
                                    className="w-full py-2 px-5 rounded text-start"
                                    id="price"
                                    name="price"
                                    type="text"
                                    required=""
                                    placeholder="ທ້າວ ເລັນ"
                                />
                            </div>
                            <div className=" border border-lineColor rounded-md my-2 flex justify-center items-center ml-5">
                                <input
                                    className="w-full py-2 px-5 rounded text-start"
                                    id="price"
                                    name="price"
                                    type="text"
                                    required=""
                                    placeholder="ທ້າວ ເລັນ"
                                />
                            </div>

                        </div>

                        <p className="text-xl">ຈຳນວນຕຸກທີ່ຕ້ອງການ</p>
                        <div className=" w-1/3 border border-lineColor rounded-md my-2 flex justify-center items-center">
                            <input
                                className="w-full py-2 px-5 rounded text-start"
                                id="price"
                                name="price"
                                type="text"
                                required=""
                                placeholder="ຈຳນວນຕຸກ"
                            />
                        </div>
                        <div className="w-full flex justify-end items-center mt-20">
                            <div className="w-1/6 bg-lineColor bg-opacity-50 flex justify-center py-1 px-2 rounded-md shadow-sm hover:cursor-pointer" onClick={()=>onClose()}>
                                <div className="text-redBottle text-lg">ຍົກເລີກ</div>
                            </div>
                            <div className="w-5"></div>
                            <div className="w-1/6 bg-scueecssColor flex justify-center py-1 px-2 rounded-md" >
                                <div className="text-white text-lg " >ບັນທຶກ</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default addConsumerManagementModalComponent;
