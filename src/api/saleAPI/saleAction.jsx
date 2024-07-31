// import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addOrder } from "../../slice/orderSlice";
import { getAllSale } from "./saleApi";
import { addSale } from "../../slice/saleSlice";
export const GetAllSale= () => async (dispatch) => {
  try {
    const sale = await getAllSale();
    console.log(sale);
    if (sale.status == "ok") {
      dispatch(addSale(sale.data));
      return true;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};
