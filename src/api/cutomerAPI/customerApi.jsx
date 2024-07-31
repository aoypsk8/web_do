import axios from "axios";
import { BASE_URL } from "../api";

export const getAllCustomer = async () => {
  const response = await axios.get(`${BASE_URL}/auth/customer/getAll`);
  return response.data;
};

export const deleteCutomer = async (id) => {
  const response = await axios.delete(`${BASE_URL}/auth/customer/delete/${id}`);
  return response.data;
};

export const createCustomer = async (
  First_name,
  Last_name,
  Phone_Number,
  Address,
  Password,
  imageFile
) => {
  const formData = new FormData();
  formData.append("First_name", First_name);
  formData.append("Last_name", Last_name);
  formData.append("Address", Address);
  formData.append("Phone_Number", Phone_Number);
  formData.append("Password", Password);
  formData.append("image", imageFile);

  const response = await axios.post(
    `${BASE_URL}/auth/customer/registerUser`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log(response.data);

  return response.data;
};

export const updateCustomer = async (
  Cus_ID,
  First_name,
  Last_name,
  Phone_Number,
  Address,
  Password,
  imageFile
) => {
  const formData = new FormData();
  formData.append("First_name", First_name);
  formData.append("Last_name", Last_name);
  formData.append("Phone_Number", Phone_Number);
  formData.append("Password", Password);
  formData.append("image", imageFile);
  formData.append("Address", Address);

  const response = await axios.put(
    `${BASE_URL}/auth/customer/update/${Cus_ID}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log(response.data);

  return response.data;
};
