import React, { useEffect, useState } from "react";
import ic_search from "../../assets/icons/search.svg";
import ic_cart from "../../assets/icons/addcart.svg";
import ic_edit from "../../assets/icons/editI.svg";
import ic_delete from "../../assets/icons/deleteI.svg";
import soldout from "../../assets/soldout.png";
import ProductManageModal from "./modal/productManageModal";
import ProductManageEditModal from "./modal/productManageEditModal";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteProduct,
  GetAllProduct,
} from "../../api/productAPI/productAction";
import { GetAllUnit } from "../../api/unitAPI/unitAction";
import { GetAlltype } from "../../api/typeAPI/typeAction";
import Swal from "sweetalert2";

function formatNumber(number) {
  return new Intl.NumberFormat("en-US").format(number);
}

function ProductManageScreen() {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [deleteID, setDeleteID] = useState("");
  const [refreshData, setRefreshData] = useState(false);

  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(GetAllProduct());
    dispatch(GetAllUnit());
    dispatch(GetAlltype());
    setProductData(product || []);
  }, [dispatch, deleteID]);

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

  const filteredProducts = productData.filter((item) =>
    item.Product_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [unitEditId, setUnitId] = useState("");
  const [typeEditId, setTypeId] = useState("");

  const [valueEdit, setValueEdit] = useState({
    Product_ID: "",
    Product_Name: "",
    Description: "",
    Price: "",
    ProductQty: "",
    Product_img: "",
  });

  const handleDelete = () => {
    dispatch(DeleteProduct(deleteID)).then(() => {
      setRefreshData(!refreshData);
    });
  };

  return (
    <div className="p-10 h-full">
      {isModalOpen === true && (
        <ProductManageModal isOpen={isModalOpen} onClose={closeModal} />
      )}

      {isEditModalOpen === true && (
        <ProductManageEditModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          unitEditId={unitEditId}
          typeEditId={typeEditId}
          Product_Name={valueEdit.Product_Name}
          Description={valueEdit.Description}
          Price={valueEdit.Price}
          ProductQty={valueEdit.ProductQty}
          Product_img={valueEdit.Product_img}
          Product_ID={valueEdit.Product_ID}
        />
      )}
      <div className="flex items-center justify-between mb-10">
        <p className="text-5xl">ຈັດການຂໍ້ມູນສິນຄ້າ</p>
        <div className="flex items-center">
          <div className="border border-lineColor px-5 py-2 rounded-md flex items-center mr-5">
            <img src={ic_search} alt="" className="w-4 h-4" />
            <input
              className="w-full rounded text-start focus:outline-none ml-2"
              id="name"
              name="name"
              required=""
              placeholder="ຄົ້ນຫາ"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div
            className="border border-lineColor px-5 py-2 rounded-md flex items-center bg-secondaryColor"
            onClick={() => openModal()}
          >
            <img src={ic_cart} alt="" className="w-7 h-7" />
            <div className="w-full rounded text-white ml-2">ເພີ່ມສິນຄ້າ</div>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-3">
        {filteredProducts.map((item) => (
          <div
            className="bg-white shadow-md p-3 mx-10 rounded-lg mt-10"
            key={item.Product_ID}
          >
            <div className="bg-bgPro rounded-md py-8 h-80">
              <div className="w-full h-full">
                {isModalOpen || isEditModalOpen ? (
                  <img src={item.Product_img} alt="" className="object-cover h-48 w-full" />
                ) : item.ProductQty === 0 ? (
                  <div className="relative items-center h-full w-full">
                    <img
                      src={item.Product_img}
                      alt=""
                      className="object-cover absolute  h-full w-full  "
                    />
                    <img
                      src={soldout}
                      alt=""
                      className="object-cover absolute h-full w-full"
                    />
                  </div>
                ) : (
                  <img src={item.Product_img} alt="" className="object-contain h-full w-full" />
                )}
              </div>
            </div>
            <div className="flex justify-between items-center text-textColor mt-5">
              <p className="text-2xl font-semibold">{item.Product_Name}</p>
              <p className="text-xl font-semibold">( {item.ProductQty} )</p>
            </div>
            <p className="text-textColor text-sm mt-2">{item.Description}</p>
            <p className="text-textColor text-sm mt-2">
              ປະເພດ : {item.Product_Type_Name}
            </p>
            <div className="flex items-center justify-between py-5 mb-2">
              <div className="flex items-end justify-between w-full">
                <div className="flex items-end">
                  <p className="text-textColor text-3xl mt-2">
                    {formatNumber(item.Price)}
                  </p>
                  <p className="text-textColor text-lg mt-2 ml-2">ກີບ</p>
                </div>
                <div className="flex items-center">
                  <img
                    src={ic_edit}
                    alt=""
                    className="pr-2"
                    onClick={() => {
                      setTypeId(item.Product_Type_ID);
                      setUnitId(item.Unit);
                      setValueEdit({
                        Product_ID: item.Product_ID,
                        Product_Name: item.Product_Name,
                        Description: item.Description,
                        Price: item.Price,
                        ProductQty: item.ProductQty,
                        Product_img: item.Product_img,
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
                          setDeleteID(item.Product_ID);
                          handleDelete();
                        }
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductManageScreen;
