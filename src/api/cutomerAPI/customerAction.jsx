import Swal from "sweetalert2";
import { createCustomer, deleteCutomer, getAllCustomer, updateCustomer } from "./customerApi";
import { addCustomer } from "../../slice/customerSlice";
export const GetAllCustomer = () => async (dispatch) => {
  try {
    const cutomer = await getAllCustomer();
    console.log(cutomer);
    if (cutomer.status === "ok") {
      dispatch(addCustomer(cutomer.data));
      return true;
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
    return false;
  }
};

export const DeleteCustomer = (id) => async (dispatch) => {
  try {
    const customer = await deleteCutomer(id);
    console.log(customer);
    if (customer.status === "ok") {
      Swal.fire("success", customer.message, "success");
      dispatch(GetAllCustomer());
      return true;
    } else {
      Swal.fire(customer.message);
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
    return false;
  }
};

export const CreateCustomer =
  (First_name, Last_name, Phone_Number, Address, Password, imageFile) =>
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

      const customer = await createCustomer(
        First_name, Last_name, Phone_Number, Address, Password, imageFile
      );
      if (customer.status === "ok") {
        dispatch(GetAllCustomer());
        Swal.fire("Success", customer.message, "success");
        return true;
      } else {
        Swal.close();

        Swal.fire("Error", customer.message, "error");
        return false;
      }
    } catch (error) {
      Swal.close();

      Swal.fire("Error", error.message, "error");
      return false;
    }
  };

export const UpdateCustomer =
  (Cus_ID, First_name, Last_name, Phone_Number, Address, Password, imageFile) =>
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

      const customer = await updateCustomer(
        Cus_ID,
        First_name,
        Last_name,
        Phone_Number,
        Address,
        Password,
        imageFile
      );
      if (customer.status === "ok") {
        dispatch(GetAllCustomer());
        Swal.fire("Success", customer.message, "success");
        return true;
      } else {
        Swal.close();
        Swal.fire("Error", customer.message, "error");
        return false;
      }
    } catch (error) {
      Swal.close();
      Swal.fire("Error", error.message, "error");
      return false;
    }
  };
