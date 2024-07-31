import Swal from "sweetalert2";
import { addEmployee } from "../../slice/employeeSlice";
import { createEmployee, deleteEmployee, getAllEmployee, updateEmployee } from "./employeeApi";
export const GetAllEmployee = () => async (dispatch) => {
  try {
    const employee = await getAllEmployee();
    console.log(employee);
    if (employee.status === "ok") {
      dispatch(addEmployee(employee.data));
      return true;
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
    return false;
  }
};

export const DeleteEmployee = (id) => async (dispatch) => {
  try {
    const employee = await deleteEmployee(id);
    console.log(employee);
    if (employee.status === "ok") {
      Swal.fire("success", employee.message, "success");
      dispatch(GetAllEmployee());
      return true;
    } else {
      Swal.fire(product.message);
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
    return false;
  }
};

export const CreateEmployee =
  (
    First_name,
    Last_name,
    gender,
    Roles,
    Village,
    District,
    Province,
    Phone_Number,
    Password,
    imageFile
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

      const employee = await createEmployee(
        First_name,
        Last_name,
        gender,
        Roles,
        Village,
        District,
        Province,
        Phone_Number,
        Password,
        imageFile
      );
      if (employee.status === "ok") {
        dispatch(GetAllEmployee());
        Swal.fire("Success", employee.message, "success");
        return true;
      } else {
        Swal.close();

        Swal.fire("Error", employee.message, "error");
        return false;
      }
    } catch (error) {
      Swal.close();

      Swal.fire("Error", error.message, "error");
      return false;
    }
  };

export const UpdateEmployee =
  (
    Emp_ID,
    First_name,
    Last_name,
    gender,
    Roles,
    Village,
    District,
    Province,
    Phone_Number,
    Password,
    imageFile
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

      const product = await updateEmployee(
        Emp_ID,
        First_name,
        Last_name,
        gender,
        Roles,
        Village,
        District,
        Province,
        Phone_Number,
        Password,
        imageFile
      );
      if (product.status === "ok") {
        dispatch(GetAllEmployee());
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
