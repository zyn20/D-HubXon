import React, { useState } from 'react';

const Modal = ({ description }) => {
  const [showModal, setShowModal] = useState(true);

  const toggleModal = () => {
    setShowModal(!showModal);
    // Optionally handle body scroll lock here for showModal
  };

  return (
    <div className={`fixed inset-0 z-30 ${showModal ? '' : 'hidden'}`}>
      {/* Background overlay */}
      <div className="bg-white opacity-25 fixed inset-0 w-full h-full z-20" onClick={toggleModal}></div>
      {/* Modal content */}
      <div className="flex items-center justify-center h-full w-full">
        <div className="modal-wrapper inline-block flex items-center z-30">
          <div className="modal max-w-md mx-auto xl:max-w-5xl lg:max-w-5xl md:max-w-2xl bg-white max-h-screen shadow-lg flex-row rounded relative">
            <div className="modal-header p-5 bg-gray-900 text-gray-900 rounded-t">
              <h5 className="text-white text-2xl uppercase">Modal Header</h5>
            </div>
            <div className="modal-body p-5 w-full h-full overflow-y-auto ">
              <p className="text-justify">
                {description}
              </p>
            </div>
            <div className="modal-footer py-3 px-5 border0-t text-right">
              <button className="bg-green-500 px-5 py-2 text-white" onClick={toggleModal}>OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

