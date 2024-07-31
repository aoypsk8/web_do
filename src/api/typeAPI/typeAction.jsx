// import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { createType, deleteType, getAllType, updateType } from "./typeApi";
import { addType } from "../../slice/typeSlice";
export const GetAlltype = () => async (dispatch) => {
  try {
    const type = await getAllType();
    console.log(type.data);
    if (type.status == "ok") {
      dispatch(addType(type.data));
      return true;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};

export const CreateTypeProduct =
  (Product_Type_Name, imageFile) => async (dispatch) => {
    try {
      Swal.fire({
        title: "Loading",
        text: "Please wait...",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      const type = await createType(Product_Type_Name, imageFile);
      if (type.status === "ok") {
        dispatch(GetAlltype());
        Swal.fire("Success", type.message, "success");
        return true;
      } else {
        Swal.close();

        Swal.fire("Error", type.message, "error");
        return false;
      }
    } catch (error) {
      Swal.close();

      Swal.fire("Error", error.message, "error");
      return false;
    }
  };
export const DeleteType = (id) => async (dispatch) => {
  try {
    const type = await deleteType(id);
    console.log(type);
    if (type.status === "ok") {
      Swal.fire("success", type.message, "success");
      dispatch(GetAlltype());
      return true;
    } else {
      Swal.fire(type.message);
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
    return false;
  }
};


export const UpdateType =
  (Product_Type_ID, Product_Type_Name, imageFile) =>
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

      const type = await updateType(
        Product_Type_ID, Product_Type_Name, imageFile
      );
      if (type.status === "ok") {
        dispatch(GetAlltype());
        Swal.fire("Success", type.message, "success");
        return true;
      } else {
        Swal.close();
        Swal.fire("Error", type.message, "error");
        return false;
      }
    } catch (error) {
      Swal.close();
      Swal.fire("Error", error.message, "error");
      return false;
    }
  };
