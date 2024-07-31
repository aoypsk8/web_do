import Swal from "sweetalert2";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getAllProductWhere,
  updateProduct,
} from "../productAPI/productApi";
import { addProduct } from "../../slice/productSlice";

export const GetAllProduct = () => async (dispatch) => {
  try {
    const product = await getAllProduct();
    if (product.status === "ok") {
      dispatch(addProduct(product.data));
      return true;
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
    return false;
  }
};

export const GetAllProductWHERE = () => async (dispatch) => {
  try {
    const product = await getAllProductWhere();
    if (product.status === "ok") {
      dispatch(addProduct(product.data));
      return true;
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
    return false;
  }
};


export const DeleteProduct = (id) => async (dispatch) => {
  try {
    const product = await deleteProduct(id);
    console.log(product);
    if (product.status === "ok") {
      Swal.fire("success", product.message, "success");
      dispatch(GetAllProduct());
      return true;
    } else {
      Swal.fire(product.message);
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
    return false;
  }
};

export const CreateProduct =
  (
    Product_Type_ID,
    Product_Name,
    Description,
    Price,
    ProductQty,
    Unit_ID,
    image
  ) =>
  async (dispatch) => {
    try {
      Swal.fire({
        title: "Loading",
        text: "Please wait...",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      const product = await createProduct(
        Product_Type_ID,
        Product_Name,
        Description,
        Price,
        ProductQty,
        Unit_ID,
        image
      );
      if (product.status === "ok") {
        dispatch(GetAllProduct());
        Swal.fire("Success", product.message, "success");
        return true;
      } else {
        Swal.close();

        Swal.fire("Error", product.message, "error");
        return false;
      }
    } catch (error) {
      Swal.close();

      Swal.fire("Error", error.message, "error");
      return false;
    }
  };

export const UpdateProduct =
  (
    Product_ID,
    Product_Type_ID,
    Product_Name,
    Description,
    Price,
    ProductQty,
    Unit_ID,
    image
  ) =>
  async (dispatch) => {
    try {
      Swal.fire({
        title: "Loading",
        text: "Please wait...",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      const product = await updateProduct(
        Product_ID,
        Product_Type_ID,
        Product_Name,
        Description,
        Price,
        ProductQty,
        Unit_ID,
        image
      );
      if (product.status === "ok") {
        dispatch(GetAllProduct());
        Swal.fire("Success", product.message, "success");
        return true;
      } else {
        Swal.close();

        Swal.fire("Error", product.message, "error");
        return false;
      }
    } catch (error) {
      Swal.close();

      Swal.fire("Error", error.message, "error");
      return false;
    }
  };
