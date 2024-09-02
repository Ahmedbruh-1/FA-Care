import React from "react";
import './Footer.css';
import { Link } from "react-router-dom";
import { FaPhone, FaLocationArrow, FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "9:00 AM - 11:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "12:00 PM - 12:00 AM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "10:00 AM - 10:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "9:00 AM - 9:00 PM",
    },
    {
      id: 5,
      day: "Friday",
      time: "3:00 PM - 9:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      time: "9:00 AM - 3:00 PM",
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src="/logo.png" alt="logo" className="logo-img" />
      </div>
      <hr />
      <div className="footer-content">
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/appointment">Appointment</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect With FA CARE</h4>
          <ul className="social-links">
            <li><a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer"><FaWhatsapp /> Chat With Us</a></li>
            <li><a href="https://www.facebook.com/login/" target="_blank" rel="noopener noreferrer"><FaFacebook /> Join Us On Facebook</a></li>
            <li><a href="https://www.instagram.com/accounts/login/" target="_blank" rel="noopener noreferrer"><FaInstagram /> Follow Us On Instagram</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Hours</h4>
          <ul>
            {hours.map((element) => (
              <li key={element.id}>
                <span>{element.day}: </span>
                <span>{element.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <div>
            <FaPhone />
            <span>1212-22212-1221</span>
          </div>
          <div>
            <MdEmail />
            <span>FALab@gmail.com</span>
          </div>
          <div>
            <FaLocationArrow />
            <span>Gujranwala, Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
