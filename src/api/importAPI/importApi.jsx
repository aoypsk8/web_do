import axios from "axios";
import { BASE_URL } from "../api";

export const getAllSupplier = async () => {
  const response = await axios.get(`${BASE_URL}/supplier/getAll`);
  console.log(`response ${response}`);

  return response.data;
};
export const getAllImportPro = async () => {
  const response = await axios.get(`${BASE_URL}/import/getAll`);
  console.log(`response ${response}`);

  return response.data;
};

export const createImportPro = async (
  Emp_ID,
  Pro_name,
  ReceivedQty,
  Sub_Price,
  Sl_ID
) => {
  const response = await axios.post(`${BASE_URL}/import/create`, {
    Emp_ID: Emp_ID,
    Pro_name: Pro_name,
    ReceivedQty: ReceivedQty,
    Sub_Price: Sub_Price,
    Sl_ID: Sl_ID,
  });
  console.log(`response ${response.data}`);

  return response.data;
};
