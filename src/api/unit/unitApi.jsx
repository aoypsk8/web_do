import axios from "axios";
export const getAllUnit = async () => {
  const response = await axios.get("http://localhost:3000/api/unit/getAll");
  console.log(`response ${response}`);
  return response.data;
};

export const deleteUnit = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/unit/delete/${id}`);
    console.log(`response  ${response.data}`);
    return response.data;
  } catch (error) {
    console.log(`error ${error.data}`);
  }
};
export const createUnit = async (unit_n) => {
  console.log(unit_n);
  try {
    const response = await axios.post(`http://localhost:3000/api/unit/create`,
      {
        data: unit_n,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(`error ${error.data}`);
  }
};
