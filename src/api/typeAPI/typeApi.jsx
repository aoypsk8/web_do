import axios from "axios";
import { BASE_URL } from "../api";

export const getAllType = async () => {
  const response = await axios.get(`${BASE_URL}/productType/getAll`);
  console.log(`response ${response}`);

  return response.data;
};

export const createType = async (Product_Type_Name, imageFile) => {
  const formData = new FormData();
  formData.append("Product_Type_Name", Product_Type_Name);
  formData.append("image", imageFile);

  const response = await axios.post(
    `${BASE_URL}/productType/create`,
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
export const deleteType = async (id) => {
  const response = await axios.delete(`${BASE_URL}/productType/delete/${id}`);
  return response.data;
};

export const updateType = async (
  Product_Type_ID,
  Product_Type_Name,
  imageFile
) => {
  
  const formData = new FormData();
  formData.append("Product_Type_Name", Product_Type_Name);
  formData.append("image", imageFile);

  const response = await axios.put(
    `${BASE_URL}/productType/update/${Product_Type_ID}`,
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
