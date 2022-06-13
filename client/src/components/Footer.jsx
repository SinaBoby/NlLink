import React from "react";
import logo from "../images/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="logo-container">
        <Link to={"/"} className="logo">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="footer-stack">
        <p className="copyright">Copyright &copy; 2022 NlLink® </p>
        <div className="footer-links">
          <button className="footer-link">Privacy Policy</button>
          <button className="footer-link">{"Terms & Conditions"}</button>
          <button className="footer-link">Cookie Policy</button>
          <button className="footer-link">Contact us ☎︎</button>
          <button
            onClick={() => navigate("/user/create")}
            className="footer-link"
          >
            Sign up
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
