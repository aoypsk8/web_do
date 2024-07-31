import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import "../../App.css";
import ic_save1 from "../../assets/icons/save1.svg";
import ic_close1 from "../../assets/icons/close1.svg";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProductWHERE } from "../../api/productAPI/productAction";
import { GetAllCustomer } from "../../api/cutomerAPI/customerAction";
import { CreateOrder } from "../../api/orderAPI/orderAction";
import Bill from "./bill";

function formatNumber(number) {
  return new Intl.NumberFormat("en-US").format(number);
}

function SellFrontScreen() {
  const [visibleBill, setVisibleBill] = useState(false);
  const hideDialogBill = () => {
    setVisibleBill(false);
  };

  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [value, setValue] = useState({ phone: "" });
  const [orderSummary, setOrderSummary] = useState(null);
  const billRef = useRef();

  const { product } = useSelector((state) => state.product);
  const { customer } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(GetAllProductWHERE());
    dispatch(GetAllCustomer());
  }, [dispatch]);

  useEffect(() => {
    setCustomerData(customer || []);
    setProductData(product || []);
  }, [customer, product]);

  const [selectedCustomer, setSelectedCustomer] = useState({
    Cus_ID: null,
    First_name: "Select Customer",
    Last_name: "Select Customer",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductSelect = (product) => {
    const alreadySelected = selectedProducts.find((p) => p.Product_ID === product.Product_ID);
    if (alreadySelected) {
      setSelectedProducts(selectedProducts.filter((p) => p.Product_ID !== product.Product_ID));
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (product, quantity) => {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.Product_ID === product.Product_ID
          ? { ...p, quantity: parseInt(quantity, 10) || 1 }
          : p
      )
    );
  };

  const handleSubmit = () => {
    const formattedProducts = selectedProducts.map((product) => ({
      Product_ID: product.Product_ID,
      quantity: product.quantity || 1,
      Price: product.Price,
    }));
    const totalAmount = formattedProducts.reduce((total, product) => total + (product.quantity * product.Price), 0);

    const summaryData = {
      Cus_ID: selectedCustomer.Cus_ID,
      customerName: `${selectedCustomer.First_name} ${selectedCustomer.Last_name}`,
      Phone: value.phone,
      Location: "Store Address",
      Products: formattedProducts,
      totalAmount,
    };

    dispatch(CreateOrder(
      summaryData.Cus_ID,
      summaryData.Phone,
      summaryData.Location,
      summaryData.Products
    ))
      .then(() => {
        setVisibleBill(true);
        setOrderSummary(summaryData);
      })
      .catch((error) => {
        console.error('Error creating order:', error);
      });
  };

  const CustomDropdown = ({ options, selectedOption, onSelect }) => {
    const [isOpenDropDown, setIsOpenDropDown] = useState(false);
    const toggleDropdown = () => setIsOpenDropDown(!isOpenDropDown);

    const handleSelect = (option) => {
      onSelect(option);
      toggleDropdown();
    };

    return (
      <div className="relative">
        <div
          className="hover:cursor-pointer flex w-full border border-lineColor rounded-md my-2 px-5 justify-between items-center py-2"
          onClick={toggleDropdown}
        >
          {selectedOption.First_name}
          {isOpenDropDown ? <IoIosArrowDown /> : <IoIosArrowBack />}
        </div>
        {isOpenDropDown && (
          <ul className="absolute border border-lineColor overflow-y-auto z-10 w-full bg-white rounded-md px-3">
            {options.map((option, index) => (
              <li
                key={index}
                className="flex items-center text-lg hover:cursor-pointer my-1"
                onClick={() => handleSelect(option)}
              >
                <p>
                  {option.First_name} {option.Last_name}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  return (
    <div className="flex flex-col items-center w-full h-full px-10 mb-20">
      <h1 className="text-3xl font-bold mt-10">ຂາຍຫນ້າຮ້ານ</h1>
      <div className="flex flex-col justify-center w-full mt-10 border border-lineColor rounded-lg px-5 py-10">
        <div className="grid grid-cols-2 gap-4 w-full mb-10 px-10">
          <div>
            <p className="text-xl mb-2">ຊື່ລູກຄ້າ</p>
            <CustomDropdown
              options={customerData}
              selectedOption={selectedCustomer}
              onSelect={setSelectedCustomer}
            />
          </div>
          <div>
            <p className="text-xl mb-2">ເບີໂທລູກຄ້າ</p>
            <input
              type="text"
              name="phone"
              value={value.phone}
              onChange={handleChange}
              className="w-full border border-lineColor rounded-md p-2"
            />
          </div>
        </div>

        <p className="text-xl mb-2">ລາຍການສິນຄ້າ</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {productData.map((product) => (
            <div key={product.Product_ID} className="border border-lineColor rounded-md p-4 flex flex-col items-center">
              {product.Product_img && (
                <img
                  src={product.Product_img}
                  alt={product.Product_img}
                  className="w-24 h-24 object-cover mb-2"
                />
              )}
              <p className="text-lg font-semibold">{product.Product_Name}</p>
              <p className="text-gray-600">ລາຄາ: {formatNumber(product.Price)} ກີບ</p>
              <p className="text-gray-600">(ຍັງເຫລືອ : {product.ProductQty})</p>
              <button
                onClick={() => handleProductSelect(product)}
                className={`mt-2 px-4 py-2 rounded ${selectedProducts.some((p) => p.Product_ID === product.Product_ID) ? 'bg-redBottle text-white' : 'bg-gray-300 text-black'}`}
              >
                {selectedProducts.some((p) => p.Product_ID === product.Product_ID) ? 'Remove' : 'Add'}
              </button>
              {selectedProducts.some((p) => p.Product_ID === product.Product_ID) && (
                <input
                  type="number"
                  value={selectedProducts.find((p) => p.Product_ID === product.Product_ID).quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(product, e.target.value)}
                  className="w-full border border-lineColor rounded-md mt-2 p-1"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end w-full mt-10">
          <button
            onClick={handleSubmit}
            className="bg-primaryColor text-white py-2 px-6 rounded-full"
          >
            Save
          </button>
        </div>
      </div>

      {visibleBill && orderSummary && (
        <Bill
          ref={billRef}
          hideDialogBill={hideDialogBill}
          summaryData={orderSummary}
          productData={productData}
        />
      )}
    </div>
  );
}

export default SellFrontScreen;
