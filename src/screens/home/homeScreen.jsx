import React, { useEffect, useState } from "react";
import ic_customer from "../../assets/icons/allCustomerD.svg";
import ic_type from "../../assets/icons/typeD.svg";
import ic_people from "../../assets/icons/peopleD.svg";
import ic_allPro from "../../assets/icons/allProD.svg";
import ic_list_Order from "../../assets/icons/listD.svg";
import { useDispatch, useSelector } from "react-redux";
import { GetAllCustomer } from "../../api/cutomerAPI/customerAction";
import { GetAllOrderToday } from "../../api/orderAPI/orderAction";
import { GetAllProduct } from "../../api/productAPI/productAction";
import { GetAllEmployee } from "../../api/employeeAPI/employeeAction";
import { GetAlltype } from "../../api/typeAPI/typeAction";
import { GetAllSupplier } from "../../api/supplier/supplierAction";

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import InventoryIcon from '@mui/icons-material/Inventory';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';

function HomeScreen() {
  const dispatch = useDispatch();
  const { customer } = useSelector((state) => state.customer);
  const { orderToday } = useSelector((state) => state.orderToday);
  const { product } = useSelector((state) => state.product);
  const { employee } = useSelector((state) => state.employee);
  const { type } = useSelector((state) => state.type);
  const { supplier } = useSelector((state) => state.supplier);

  const [customerData, setCustomerData] = useState([]);
  const [orderTodayData, setTorderTodayData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [employeeData, setEmplyeeData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);


  useEffect(() => {
    dispatch(GetAllCustomer());
    dispatch(GetAllOrderToday());
    dispatch(GetAllProduct());
    dispatch(GetAllEmployee());
    dispatch(GetAlltype());
    dispatch(GetAllSupplier());



    setCustomerData(customer || []);
    setTorderTodayData(orderToday || []);
    setProductData(product || []);
    setEmplyeeData(employee || []);
    setTypeData(type || []);
    setSupplierData(supplier || []);
  }, [dispatch, customer]);

  return (
    <div className="text-5xl px-5 py-7">
      <p>Dashboard</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <div className="py-5 flex shadow-md shadow-subTextColor px-4 rounded-xl">
          <PeopleAltIcon sx={{ fontSize: 80 }} />
          <div className="ml-2">
            <div className="text-4xl">{customerData.length}</div>
            <div className="text-2xl text-unSelectText">ລູກຄ້າທັງຫມົດ</div>
          </div>
        </div>
        <div className="py-5 flex shadow-md shadow-subTextColor px-4 rounded-xl">
          <PlaylistAddCheckIcon sx={{ fontSize: 80 }} />
          <div className="ml-2">
            <div className="text-4xl">{orderTodayData.length}</div>
            <div className="text-2xl text-unSelectText">
              ລາຍການທີ່ໄດ້ຂາຍ
            </div>
          </div>
        </div>
        <div className="py-5 flex shadow-md shadow-subTextColor px-4 rounded-xl">
          <InventoryIcon sx={{ fontSize: 80 }} />
          <div className="ml-2">
            <div className="text-4xl">{productData.length}</div>
            <div className="text-2xl text-unSelectText">ສິນຄ້າທັງຫມົດ</div>
          </div>
        </div>
        <div className="py-5 flex shadow-md shadow-subTextColor px-4 rounded-xl">
          <InterpreterModeIcon sx={{ fontSize: 80 }} />
          <div className="ml-2">
            <div className="text-4xl">{employeeData.length}</div>
            <div className="text-2xl text-unSelectText">ພະນັກງານທັງຫມົດ</div>
          </div>
        </div>
        <div className="py-5 flex shadow-md shadow-subTextColor px-4 rounded-xl">
          <FormatColorFillIcon sx={{ fontSize: 80 }} />
          <div className="ml-2">
            <div className="text-4xl">{typeData.length}</div>
            <div className="text-2xl text-unSelectText">ປະເພດສິນຄ້າທັງຫມົດ</div>
          </div>
        </div>
        <div className="py-5 flex shadow-md shadow-subTextColor px-4 rounded-xl">
          <PeopleAltIcon sx={{ fontSize: 80 }} />
          <div className="ml-2">
            <div className="text-4xl">{supplierData.length}</div>
            <div className="text-2xl text-unSelectText">ຜູ້ສະຫນອງທັງຫມົດ</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
