import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import {GiHamburgerMenu} from "react-icons/gi"

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme"));
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    console.log("first render:", savedTheme);
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.body.className = savedTheme;
    }
  }, []);

  useEffect(() => {
    // Apply theme whenever it changes
    const theme = isDarkMode ? "dark" : "light";
    console.log("2nd effect",theme)
    document.body.className = theme;
    // Save theme preference in local storage
    localStorage.setItem("theme", theme);
    console.log("Theme set to:", theme);
  }, [isDarkMode]);

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setIsAuthenticated(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  const goToLogin = () => {
    navigateTo("/login");
  };

  const toggleMenu = () => {
    setShow(!show);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="container">
      <div className="logo"> <img src="/logo.png" alt="logo" className='logo-img' /></div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to={"/"}>Home</Link>
          <Link to={"/appointment"}>Appointments</Link>
          <Link to={"/about"}>About Us</Link>
        </div>
        {isAuthenticated ? (
          <button className="logoutBtn btn" onClick={handleLogout}>
            LogOut
          </button>
        ) : (
          <button className="logoutBtn btn" onClick={goToLogin}>
            LogIn
          </button>
        )}
        <button className="themeToggleBtn btn" onClick={toggleTheme}>
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </button>
      </div>
      <div className="hamburger" onClick={()=> setShow(!show)}>
        <GiHamburgerMenu/>
      </div>
    </nav>
  );
};

export default Navbar;
