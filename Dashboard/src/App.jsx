import React, { useContext, useEffect } from 'react';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Components/Dashboard";
import Messages from "./Components/Messsages";
import Doctors from "./Components/Doctors";
import AddNewDoctor from "./Components/AddNewDoctor";
import AddNewAdmin from "./Components/AddNewAdmin";
import Sidebar from "./Components/Sidebar";
import Login from "./Components/Login";
import Reports from './Components/Reports';
import { Context } from './main';
import "./App.css"

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setAdmin } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <div>
      <Router>
        {isAuthenticated && <Sidebar />}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctor/addnew" element={<AddNewDoctor />} />
          <Route path="/admin/addnew" element={<AddNewAdmin />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </div>
  );
}

export default App;
