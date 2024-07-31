import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../api/authAction";
import bg from "../../assets/bg.png";
import myLogo from "../../assets/lloo-removebg-preview.png";
import phone from "../../assets/icons/call.svg";
import password from "../../assets/icons/lock.svg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    dispatch(loginUser(value.phone, value.password)).then((success) => {
      if (success) {
        navigate("/dashboard");
      }
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className=" bg-geryBottle bg-opacity-10">
      <section className=" min-h-screen flex items-center justify-center">
        <div className="bg-white flex rounded-lg shadow-2xl max-w-3xl p-5 items-center">
          <div className=" px-8 md:px-16 flex flex-col justify-center items-center">
            <div className="w-full flex justify-center items-center py-2">
              <img src={myLogo} alt="" className="w-36 h-36" />
            </div>
            <p className="text-2xl text-unSelectText">ເຂົ້າສູ່ລະບົບ</p>
            <form
              action=""
              className="flex flex-col gap-4 mt-5"
              onSubmit={handleSubmit}
            >
              <div className="flex items-center border-b border-lineColor  py-2">
                <img src={phone} alt="" className=" w-7 mr-3" />
                <input
                  autoComplete="off"
                  className="flex-1 border-none outline-none"
                  type="text"
                  name="phone"
                  placeholder="ເບີໂທລະສັບ"
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center border-b border-lineColor  py-2 relative">
                <img src={password} alt="" className=" w-7 mr-3" />
                <input
                  autoComplete="off"
                  className="flex-1 border-none outline-none"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="ລະຫັດຜ່ານ"
                  onChange={handleChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                  viewBox="0 0 16 16"
                  onClick={togglePasswordVisibility}
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              </div>

              <button
                className="bg-[#2d88ff] rounded-xl text-white py-2 my-5 "
                onClick={handleSubmit}
              >
                ເຂົ້າສູ່ລະບົບ
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
