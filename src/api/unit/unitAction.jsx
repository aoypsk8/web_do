// import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { createUnit, getAllUnit } from "./unitApi";
import { addUnit } from "../../slice/unitSlice";

export const GetAllUnit = () => async (dispatch) => {
  try {
    const unit = await getAllUnit();
    console.log(unit);
    if (unit.status == "ok") {
      dispatch(addUnit(unit.data));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};

export const DeleteUnit = async (id) => {
  try {
    const unit = await createUnit(id);
    console.log(`data is ${unit}`);
    if (unit.status == "ok") {
      return { message: unit.message, success: true };
    } else {
      return { message: unit.message, success: false };
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};

export const CreateUnit = async (unit_n) => {
  try {
    
    const unit = await createUnit(unit_n);
    if (unit.status == "ok") {
      return { message: unit.message, success: true };
    } else {
      return { message: unit.message, success: false };
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};