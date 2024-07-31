import axios from "axios";
import { BASE_URL } from "../api";

export const getAllSale= async () => {
  const response = await axios.get(`${BASE_URL}/sale/getAll`);
  console.log(`response ${response}`);

  return response.data;
};

// export const updateStatusOrder = async (id,userID) => {
//   const response = await axios.put(`${BASE_URL}/order/update/${id}`, {
//     status: true,
//     cus_ID: userID,
//   });
//   console.log(`response ${response}`);

//   return response.data;
// };
