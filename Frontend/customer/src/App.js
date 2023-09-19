import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";
import { Box } from "@mui/material";
import Customer from "./components/Customer";
import Order from "./components/Order";
import Reward from "./components/Reward";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Customer/Dashboard';

function App() {
  const response = localStorage.getItem("jwt");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if( !response && (location.pathname === "/")){
      navigate("/")
    } 
    else if(response && (location.pathname === "/")){
      navigate("/homepage")
    } 
  }, [response, location.pathname, navigate]);

  return (
    <Box>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/homepage"
          element={
            response ? (
              <LandingPage />
            ) : (
              <HomePage/>
            )
          }
        />
        <Route
          path="/customers"
          element={
            response ? (
              <Customer />
            ) : (
              <HomePage/>
            )
          }
        />
        <Route
          path="/dashboard/:customerId"
          element={
            response ? (
              <Dashboard />
            ) : (
              <HomePage/>
            )
          }
        />
         <Route
          path="/orders"
          element={
            response ? (
              <Order />
            ) : (
              <HomePage/>
            )
          }
        />
        <Route
          path="/rewards"
          element={
            response ? (
              <Reward />
            ) : (
              <HomePage/>
            )
          }
        />
      </Routes>
      <ToastContainer /> 
    </Box>
  );
}

export default App;