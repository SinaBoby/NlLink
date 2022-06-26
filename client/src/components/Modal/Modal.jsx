import React from "react";
import "./Modal.css";
import Button from "../Button";
import PropTypes from "prop-types";

const Modal = ({ children, setOpenModal }) => {
  return (
    <div className="modal-container">
      <Button
        className="btn-link navbar-link"
        onClick={() => {
          setOpenModal(false);
        }}
      >
        X
      </Button>
      <div className="modal-content">{children}</div>
      <div className="modal-footer">
        <Button className="btn-link navbar-link">Continue</Button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

export default Modal;
