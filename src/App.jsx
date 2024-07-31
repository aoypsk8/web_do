// App.js

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Dashboard from "./screens/dashboard.jsx";
import NotFound from "./screens/error/notfound.jsx";
import LoginScreen from "./screens/auth/login_screen.jsx";
import { useSelector } from "react-redux";

function App() {
  const [userInforData, setUserInforData] = useState();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    setUserInforData(userInfo);
  }, [userInfo]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={userInforData ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={
            !userInforData ? <LoginScreen /> : <Navigate to="/dashboard" />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
{
  /* <BrowserRouter>
      <Routes>
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/" element={<LoginScreen />} />
      <Route exact path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter> */
}
export default App;
