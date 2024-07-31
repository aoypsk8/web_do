// import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { getAllUnit } from "./unitApi";
import { addUnit } from "../../slice/unitSlice";
export const GetAllUnit = () => async (dispatch) => {
  try {
    const unit = await getAllUnit();
    console.log(unit.data);
    if (unit.status == "ok") {
      dispatch(addUnit(unit.data));
      return true;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};
