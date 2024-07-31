import axios from "axios";
import { BASE_URL } from "../api";

export const getAllUnit = async () => {
  const response = await axios.get(`${BASE_URL}/unit/getAll`);
  console.log(`response ${response}`);

  return response.data;
};
