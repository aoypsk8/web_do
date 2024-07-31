import React, { useEffect, useState } from "react";
import ic_search from "../../assets/icons/search.svg";
import ic_peopleD from "../../assets/ic_fill/people.svg";
import ic_edit from "../../assets/icons/editI.svg";
import ic_delete from "../../assets/icons/deleteI.svg";
import profile from "../../assets/profileimg.png";
import CustomerManageModal from "./modal/customerManageModal";
import CustomerManageEditModal from "./modal/customerManageEditModal";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteCustomer,
  GetAllCustomer,
} from "../../api/cutomerAPI/customerAction";
import Swal from "sweetalert2";

function CustomerManageScreen() {
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState([]);
  const [deleteID, setDeleteID] = useState("");
  const [refreshData, setRefreshData] = useState(false);

  const { customer } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(GetAllCustomer());
  }, [dispatch, refreshData]);

  useEffect(() => {
    setCustomerData(customer || []);
  }, [customer]);

  const handleDelete = (id) => {
    dispatch(DeleteCustomer(id)).then(() => {
      setRefreshData(!refreshData);
    });
  };

  const [valueEdit, setValueEdit] = useState({
    Cus_ID: "",
    First_name: "",
    Last_name: "",
    Phone_Number: "",
    Profile_img: "",
    Address: "",
    Password: "",
  });

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

  const filteredProducts = customerData.filter((item) =>
    item.First_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-10 h-full">
      {isModalOpen && (
        <CustomerManageModal isOpen={isModalOpen} onClose={closeModal} />
      )}
      {isEditModalOpen && (
        <CustomerManageEditModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          Address={valueEdit.Address}
          Cus_ID={valueEdit.Cus_ID}
          First_name={valueEdit.First_name}
          Last_name={valueEdit.Last_name}
          Password={valueEdit.Password}
          Phone_Number={valueEdit.Phone_Number}
          Profile_img={valueEdit.Profile_img}
          
        />
      )}
      <div className="flex items-center justify-between mb-10">
        <p className="text-5xl">ຈັດການຂໍ້ມູນຜູ້ໃຊ້</p>
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
            key={item.Cus_ID}
          >
            <div className="rounded-full flex justify-center items-center py-2 h-[300px] ">
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
                <div className="mx-1"></div>
                <p className="text-xl font-semibold">( {item.Cus_ID} )</p>
              </div>
              <div className="flex items-center">
                <img
                  src={ic_edit}
                  alt=""
                  className="pr-2"
                  onClick={() => {
                    setValueEdit({
                      Cus_ID: item.Cus_ID,
                      First_name: item.First_name,
                      Last_name: item.Last_name,
                      Phone_Number: item.Phone_Number,
                      Profile_img: item.Profile_img,
                      Address: item.Address,
                      Password: item.Password,
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
                        setDeleteID(item.Cus_ID);
                        handleDelete(item.Cus_ID);
                      }
                    });
                    
                  }}
                />
              </div>
            </div>
            <p className="text-textColor text-sm mt-2">
              ຊື່ : {item.First_name}
            </p>
            <p className="text-textColor text-sm mt-2">
              ນາມສະກຸນ : {item.Last_name}
            </p>
            <p className="text-textColor text-sm mt-2">
              ເບີໂທ : {item.Phone_Number}
            </p>
            <p className="text-textColor text-sm mt-2">
              ທີ່ຢູ່ : {item.Address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerManageScreen;
