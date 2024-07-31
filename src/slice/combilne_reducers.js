import { combineReducers } from "@reduxjs/toolkit";
import  userReducer  from "./userSlice";
import orderSlice from "./orderSlice";
import saleSlice from "./saleSlice";
import supplierSlice from "./supplierSlice";
import importPro from "./importPro";
import productSlice from "./productSlice";
import unitSlice from "./unitSlice";
import typeSlice from "./typeSlice";
import employeeSlice from "./employeeSlice";
import customerSlice from "./customerSlice";
import orderTodaySlice from "./orderTodaySlice";
import inSlice from "./inSlice";
import outSlice from "./outSlice";

const rootReducer = combineReducers({
  user: userReducer,
  order: orderSlice,
  orderToday: orderTodaySlice,
  sale: saleSlice,
  supplier: supplierSlice,
  importPro: importPro,
  product: productSlice,
  unit:unitSlice,
  type:typeSlice,
  employee:employeeSlice,
  customer:customerSlice,
  ins:inSlice,
  outs:outSlice
});

export default rootReducer;