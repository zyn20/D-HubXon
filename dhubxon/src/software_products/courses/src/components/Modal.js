// In components/Modal.js
import React from "react";

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-md w-full">
        <button onClick={onClose} className="float-right font-bold">X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
