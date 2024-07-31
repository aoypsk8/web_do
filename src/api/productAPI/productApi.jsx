import axios from "axios";
import { BASE_URL } from "../api";

export const getAllProduct = async () => {
  const response = await axios.get(`${BASE_URL}/product/getAll`);
  return response.data;
};

export const getAllProductWhere = async () => {
  const response = await axios.get(`${BASE_URL}/product/getAllWhere`);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${BASE_URL}/product/delete/${id}`);
  console.log(id);
  console.log(response);
  return response.data;
};

export const createProduct = async (
  Product_Type_ID,
  Product_Name,
  Description,
  Price,
  ProductQty,
  Unit_ID,
  image
) => {
  console.log(` Product_Type_ID ${Product_Type_ID}`);
  console.log(` Product_Name ${Product_Name}`);
  console.log(` Description ${Description}`);
  console.log(` Price ${Price}`);
  console.log(` ProductQty ${ProductQty}`);
  console.log(` Unit_ID ${Unit_ID}`);
  console.log(` image ${image}`);

  const Promotion = "GET DATA FREE ";
  const formData = new FormData();
  formData.append("Product_Type_ID", Product_Type_ID);
  formData.append("Product_Name", Product_Name);
  formData.append("Description", Description);
  formData.append("Price", Price);
  formData.append("ProductQty", ProductQty);
  formData.append("Promotion", Promotion);
  formData.append("Unit", Unit_ID);
  formData.append("image", image);

  const response = await axios.post(`${BASE_URL}/product/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response.data);

  return response.data;
};

export const updateProduct = async (
  Product_ID,
  Product_Type_ID,
  Product_Name,
  Description,
  Price,
  ProductQty,
  Unit_ID,
  image
) => {
  console.log(` Product_ID ${Product_ID}`);
  console.log(` Product_Type_ID ${Product_Type_ID}`);
  console.log(` Product_Name ${Product_Name}`);
  console.log(` Description ${Description}`);
  console.log(` Price ${Price}`);
  console.log(` ProductQty ${ProductQty}`);
  console.log(` Unit_ID ${Unit_ID}`);
  console.log(` image ${image}`);

  const Promotion = "GET DATA FREE ";
  const formData = new FormData();
  formData.append("Product_Type_ID", Product_Type_ID);
  formData.append("Product_Name", Product_Name);
  formData.append("Description", Description);
  formData.append("Price", Price);
  formData.append("ProductQty", ProductQty);
  formData.append("Promotion", Promotion);
  formData.append("Unit", Unit_ID);
  formData.append("image", image);

  const response = await axios.put(
    `${BASE_URL}/product/update/${Product_ID}`,
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
