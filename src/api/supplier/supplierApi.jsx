import axios from "axios";
import { BASE_URL } from "../api";

export const getAllSupplier = async () => {
  const response = await axios.get(`${BASE_URL}/supplier/getAll`);
  console.log(`response ${response}`);

  return response.data;
};
export const deleteSupplier = async (id) => {
  const response = await axios.delete(`${BASE_URL}/supplier/delete`, {
    data: { Sl_ID: id },
  });
  console.log(`response ${response}`);

  return response.data;
};
export const createSupplier = async (
  First_name,
  Phone_Number,
  Village,
  District,
  Province
) => {
  const response = await axios.post(`${BASE_URL}/supplier/create`, {
    First_name: First_name,
    Phone_Number: Phone_Number,
    Village: Village,
    District: District,
    Province: Province,
  });
  console.log(`response ${response.data}`);

  return response.data;
};
export const editSupplier = async (
  Sl_ID,
  First_name,
  Phone_Number,
  Village,
  District,
  Province
) => {
  const response = await axios.put(`${BASE_URL}/supplier/update/${Sl_ID}`, {
    First_name: First_name,
    Phone_Number: Phone_Number,
    Village: Village,
    District: District,
    Province: Province,
  });
  console.log(`response ${response.data}`);

  return response.data;
};
