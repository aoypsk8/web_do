import React, { useEffect, useState } from "react";
import ic_search from "../../assets/icons/search.svg";
import ic_peopleD from "../../assets/ic_fill/people.svg";
import ic_edit from "../../assets/icons/editI.svg";
import ic_delete from "../../assets/icons/deleteI.svg";
import EmployeeManageModal from "./modal/employeeManageModal";
import EmployeeManageEditModal from "./modal/employeeManageEditModal";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteEmployee,
  GetAllEmployee,
} from "../../api/employeeAPI/employeeAction";
import Swal from "sweetalert2";


function EmployeeManageScreen() {
  const dispatch = useDispatch();
  const [employeeData, setEmplyeeData] = useState([]);
  const [deleteID, setDeleteID] = useState("");
  const [refreshData, setRefreshData] = useState(false);

  const { employee } = useSelector((state) => state.employee);
  useEffect(() => {
    dispatch(GetAllEmployee());
    setEmplyeeData(employee || []);
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const filteredProducts = employeeData.filter((item) =>
    item.First_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    console.log(deleteID);
    dispatch(DeleteEmployee(deleteID)).then(() => {
      setRefreshData(!refreshData);
    });
  };

  const [valueEdit, setValueEdit] = useState({
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

  return (
    <div className="p-10 h-full">
      {isModalOpen === true && (
        <EmployeeManageModal isOpen={isModalOpen} onClose={closeModal} />
      )}
      {isEditModalOpen === true && (
        <EmployeeManageEditModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          Emp_ID={valueEdit.Emp_ID}
          First_name={valueEdit.First_name}
          Last_name={valueEdit.Last_name}
          District={valueEdit.District}
          Password={valueEdit.Password}
          Phone_Number={valueEdit.Phone_Number}
          Product_img={valueEdit.Product_img}
          Province={valueEdit.Province}
          Roles={valueEdit.Roles}
          Village={valueEdit.Village}
          gender={valueEdit.gender}
        />
      )}
      <div className="flex items-center justify-between mb-10">
        <p className="text-5xl">ຈັດການຂໍ້ມູນພະນັກງານ</p>
        <div
            className="border border-lineColor px-5 py-2 rounded-md flex items-center bg-secondaryColor"
            onClick={() => openModal()}
          >
            <img src={ic_peopleD} alt="" className="w-7 h-7" />
            <div className="w-full rounded text-white ml-2">ເພີ່ມພະນັກງານ</div>
          </div>
      </div>
      <div className="w-full grid grid-cols-3">
        {filteredProducts.map((item) => (
          <div
            className="bg-white shadow-md p-3 mx-10 rounded-lg mt-10 py-10"
            key={item.Emp_ID}
          >
            <div className="rounded-full flex justify-center items-center py-2  h-[300px] ">
              <img
                src={item.Profile_img}
                alt=""
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex justify-between items-center text-textColor mt-10">
              <div className="flex">
                <p className="text-2xl font-semibold">{item.First_name}</p>
                <div className="mx-1"></div>
                <p className="text-2xl font-semibold">{item.Last_name}</p>
                <div className="mx-1"></div>
                <p className="text-xl font-semibold">( {item.Emp_ID} )</p>
              </div>
              <div className="flex items-center">
                <img
                  src={ic_edit}
                  alt=""
                  className="pr-2"
                  onClick={() => {
                    setValueEdit({
                      Emp_ID: item.Emp_ID,
                      First_name: item.First_name,
                      Last_name: item.Last_name,
                      gender: item.gender,
                      Roles: item.Roles,
                      Village: item.Village,
                      District: item.District,
                      Province: item.Province,
                      Phone_Number: item.Phone_Number,
                      Password: item.Password,
                      Product_img: item.Profile_img,
                    });
                    openEditModal();
                  }}
                />
                <img
                  src={ic_delete}
                  alt=""
                  onClick={() => {
                    Swal.fire({
                      title: "ທ່ານຕ້ອງການລົບ?",
                      text: "ທ່ານຕ້ອງການລົບບໍ່!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "ລົບ  ! ",
                      cancelButtonText: "ຍົກເລີກ",
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        setDeleteID(item.Emp_ID);
                        handleDelete();
                      }
                    });
                  }}
                />
              </div>
            </div>
            <p className="text-textColor text-sm mt-2">ເພດ : {item.gender}</p>
            <p className="text-textColor text-sm mt-2">
              ເບີໂທ : {item.Phone_Number}
            </p>
            <p className="text-textColor text-sm mt-2">ບ້ານ : {item.Village}</p>
            <p className="text-textColor text-sm mt-2">
              ເມືອງ : {item.District}
            </p>
            <p className="text-textColor text-sm mt-2">
              ແຂວງ : {item.Province}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeManageScreen;
