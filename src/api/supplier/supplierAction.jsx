// import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  createSupplier,
  deleteSupplier,
  editSupplier,
  getAllSupplier,
} from "./supplierApi";
import { addSupplier } from "../../slice/supplierSlice";
export const GetAllSupplier = () => async (dispatch) => {
  try {
    const supplier = await getAllSupplier();
    console.log(supplier);
    if (supplier.status == "ok") {
      dispatch(addSupplier(supplier.data));
      return true;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};

export const CreateSupplier =
  (First_name, Phone_Number, Village, District, Province) =>
  async (dispatch) => {
    try {
      const supplier = await createSupplier(
        First_name,
        Phone_Number,
        Village,
        District,
        Province
      );
      if (supplier.status == "ok") {
        dispatch(GetAllSupplier());
        Swal.fire("success", supplier.message, "success");
        return true;
      } else {
        Swal.fire(supplier.message);
        return false;
      }
    } catch (error) {
      Swal.fire(error.message);
      return false;
    }
  };

export const EditSupplier =
  (Sl_ID, First_name, Phone_Number, Village, District, Province) =>
  async (dispatch) => {
    try {
      const supplier = await editSupplier(
        Sl_ID,
        First_name,
        Phone_Number,
        Village,
        District,
        Province
      );
      if (supplier.status == "ok") {
        dispatch(GetAllSupplier());
        Swal.fire("success", supplier.message, "success");
        return true;
      } else {
        Swal.fire(supplier.message);
        return false;
      }
    } catch (error) {
      Swal.fire(error.message);
      return false;
    }
  };

export const DeleteSupplier = (id) => async (dispatch) => {
  try {
    const supplier = await deleteSupplier(id);
    console.log(supplier);
    if (supplier.status == "ok") {
      dispatch(GetAllSupplier());
      Swal.fire("Success", supplier.message, "success");
      return true;
    } else {
      Swal.fire(supplier.message);
      return false;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};
