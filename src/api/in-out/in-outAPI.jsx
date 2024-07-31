import axios from "axios";
import { BASE_URL } from "../api";

export const getAllin = async () => {
  const response = await axios.get(`${BASE_URL}/income/getAll`);
  console.log(`response ${response}`);

  return response.data;
};

export const getAllout = async () => {
    const response = await axios.get(`${BASE_URL}/outcome/getAll`);
    console.log(`response ${response}`);
  
    return response.data;
  };