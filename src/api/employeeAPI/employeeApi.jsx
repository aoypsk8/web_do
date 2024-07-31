import axios from "axios";
import { BASE_URL } from "../api";

export const getAllEmployee = async () => {
  const response = await axios.get(`${BASE_URL}/auth/employee/getAll`);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await axios.delete(`${BASE_URL}/auth/employee/delete/${id}`);
  return response.data;
};

export const createEmployee = async (
  First_name,
  Last_name,
  gender,
  Roles,
  Village,
  District,
  Province,
  Phone_Number,
  Password,
  imageFile
) => {
  const RolesDefine = "Employee";
  const formData = new FormData();
  formData.append("First_name", First_name);
  formData.append("Last_name", Last_name);
  formData.append("gender", gender);
  formData.append("Village", Village);
  formData.append("District", District);
  formData.append("Roles", RolesDefine);
  formData.append("Province", Province);
  formData.append("Phone_Number", Phone_Number);
  formData.append("Password", Password);
  formData.append("image", imageFile);

  const response = await axios.post(
    `${BASE_URL}/auth/employee/registerUser`,
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

export const updateEmployee = async (
  Emp_ID,
  First_name,
  Last_name,
  gender,
  Roles,
  Village,
  District,
  Province,
  Phone_Number,
  Password,
  imageFile
) => {
  console.log("Emp_ID", Emp_ID);
  console.log("First_name", First_name);
  console.log("Last_name", Last_name);
  console.log("gender", gender);
  console.log("Roles", Roles);
  console.log("Village", Village);
  console.log("District", District);
  console.log("Phone_Number", Phone_Number);
  console.log("Password", Password);
  console.log("imageFile", imageFile);
  console.log("Province", Province);

  const formData = new FormData();
  formData.append("Emp_ID", Emp_ID);
  formData.append("First_name", First_name);
  formData.append("Last_name", Last_name);
  formData.append("gender", gender);
  formData.append("Roles", Roles);
  formData.append("Village", Village);
  formData.append("District", District);
  formData.append("Phone_Number", Phone_Number);
  formData.append("Password", Password);
  formData.append("image", imageFile);
  formData.append("Province", Province);

  const response = await axios.put(
    `${BASE_URL}/auth/employee/update/${Emp_ID}`,
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
