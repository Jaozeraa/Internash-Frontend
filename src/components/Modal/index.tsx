import React, { useState, useEffect } from 'react';

import ReactModal from 'react-modal';

interface IModalProps {
  children: any;
  isOpen: boolean;
  setIsOpen: () => void;
  noPadding?: boolean
}

const Modal: React.FC<IModalProps> = ({ children, isOpen, setIsOpen, noPadding = false }) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F8F9FA',
          color: '#212529',
          borderRadius: 5,
          padding: noPadding ? 0 : '16px 24px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#21252980',
          zIndex: 200,
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;