// import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { addImportPro } from "../../slice/importPro";
import { createImportPro, getAllImportPro, getAllSupplier } from "./importApi";
import { addSupplier } from "../../slice/supplierSlice";
export const GetAllSupplier = () => async (dispatch) => {
  try {
    const supplier = await getAllSupplier();
    console.log(supplier.data);
    if (supplier.status == "ok") {
      dispatch(addSupplier(supplier.data));
      return true;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};
export const GetAllImportPro = () => async (dispatch) => {
  try {
    const importPro = await getAllImportPro();
    console.log(importPro.data);
    if (importPro.status == "ok") {
      dispatch(addImportPro(importPro.data));
      return true;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
  GetAllImportPro;
};

export const CreateImportPro =
  (Emp_ID, Pro_name, ReceivedQty, Sub_Price, Sl_ID) => async (dispatch) => {
    try {
      const importPro = await createImportPro(
        Emp_ID,
        Pro_name,
        ReceivedQty,
        Sub_Price,
        Sl_ID
      );
      if (importPro.status == "ok") {
        dispatch(GetAllImportPro());
        Swal.fire("success", importPro.message, "success");
        return true;
      } else {
        Swal.fire(importPro.message);
        return false;
      }
    } catch (error) {
      Swal.fire(error.message);
      return false;
    }
  };

// export const EditSupplier =
//   (Sl_ID, First_name, Phone_Number, Village, District, Province) =>
//   async (dispatch) => {
//     try {
//       const supplier = await editSupplier(
//         Sl_ID,
//         First_name,
//         Phone_Number,
//         Village,
//         District,
//         Province
//       );
//       if (supplier.status == "ok") {
//         dispatch(GetAllSupplier());
//         Swal.fire("success", supplier.message, "success");
//         return true;
//       } else {
//         Swal.fire(supplier.message);
//         return false;
//       }
//     } catch (error) {
//       Swal.fire(error.message);
//       return false;
//     }
//   };

// export const DeleteSupplier = (id) => async (dispatch) => {
//   try {
//     const supplier = await deleteSupplier(id);
//     console.log(supplier);
//     if (supplier.status == "ok") {
//       dispatch(GetAllSupplier());
//       return true;
//     } else {
//       Swal.fire(supplier.message);
//       return false;
//     }
//   } catch (error) {
//     Swal.fire(error.message);
//     return false;
//   }
// };
