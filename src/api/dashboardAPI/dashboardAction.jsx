// // import { useDispatch } from "react-redux";
// import Swal from "sweetalert2";
// import { getAllDashboard } from "./dashboardApi";
// // import { addProduct } from "../../slice/productSlice";
// export const GetAllDashboard = () => async (dispatch) => {
//   try {
//     const product = await getAllDashboard();
//     console.log(product);
//     if (product.status == "ok") {
//       dispatch(addProduct(product.products));
//       return true;
//     }
//   } catch (error) {
//     Swal.fire(error.message);
//     return false;
//   }
// };
