import React from "react";
import logo from "../images/logo.jpg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="logo-container">
        <img src={logo} alt="logo" />
      </div>
      <div className="footer-stack">
        <p className="copyright">Copyright &copy; 2022 Newcomers</p>
        <div className="footer-links">
          <button className="footer-link">Privacy Policy</button>
          <button className="footer-link">{"Terms & Conditions"}</button>
          <button className="footer-link">Cookie Policy</button>
          <button className="footer-link">Contact us</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
