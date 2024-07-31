import axios from "axios";

export const getAllProduct = async () => {
  const response = await axios.get("http://localhost:3000/api/product/getAll");
  console.log(`response ${response}`);

  return response.data;
};

export const searchProduct = async (location) => {
  const response = await axios.post(
    "http://localhost:3000/api/product/search",
    {
      location: location,
    }
  );
  console.log(`response ${response.data}`);

  return response.data;
};

export const UpdateStocklProduct = async (stock, productID) => {
  console.log(stock, productID);
  const response = await axios.post(
    `http://localhost:3000/api/product/decrease/${productID}`
  );
  return response.data;
};

export const UpdateStocklIncreaseProduct = async (stock, productID) => {
  console.log(stock, productID);
  const response = await axios.post(
    `http://localhost:3000/api/product/increase/${productID}`
  );
  return response.data;
};
