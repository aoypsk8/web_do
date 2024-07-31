// import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { getAllin, getAllout } from "./in-outAPI";
import { addIn } from "../../slice/inSlice";
import { addOut } from "../../slice/outSlice";
export const GetAllIn = () => async (dispatch) => {
  try {
    const income = await getAllin();
    console.log(income.data);
    if (income.status == "ok") {
      dispatch(addIn(income.data));
      return true;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};
export const GetAllOut = () => async (dispatch) => {
  try {
    const outcome = await getAllout();
    console.log(outcome.data);
    if (outcome.status == "ok") {
      dispatch(addOut(outcome.data));
      return true;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};

