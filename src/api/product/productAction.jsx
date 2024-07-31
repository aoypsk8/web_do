// import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  UpdateStocklIncreaseProduct,
  UpdateStocklProduct,
  getAllProduct,
  searchProduct,
} from "./productApi";
import { addProduct } from "../../slice/productSlice";
import { addProductEdit } from "../../slice/productEditSlice";
export const GetAllProduct = () => async (dispatch) => {
  try {
    const product = await getAllProduct();
    console.log(product);
    if (product.status == "ok") {
      dispatch(addProduct(product.products));
      return true;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};

export const SearchProduct = (location) => async (dispatch) => {
  try {
    const product = await searchProduct(location);
    console.log(product);
    if (product.status == "ok") {
      dispatch(addProduct(product.products));
      return true;
    } else {
      dispatch(addProduct(null));
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};

export const SearchProductEdit = (location) => async (dispatch) => {
  try {
    const product = await searchProduct(location);
    console.log(product.products);
    console.log(location);
    if (product.status == "ok") {
      dispatch(addProductEdit(product.products));
      return true;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};

export const DecreaseProduct = (stock, productID) => async (dispatch) => {
  try {
    const productUpdate = await UpdateStocklProduct(stock, productID);
    if (productUpdate.status == "ok") {
      return true;
    } else {
      Swal.fire(productUpdate.message);
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};


export const IncreaseProduct = (stock, productID) => async (dispatch) => {
  try {
    const productUpdate = await UpdateStocklIncreaseProduct(stock, productID);
    if (productUpdate.status == "ok") {
      return true;
    } else {
      Swal.fire(productUpdate.message);
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};
