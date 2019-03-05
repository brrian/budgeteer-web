import React, { SFC, useEffect } from 'react';
import { Portal } from 'react-portal';

interface ModalProps {
  closeModal: () => void;
}

export const Modal: SFC<ModalProps> = ({ children, closeModal }) => {
  const handleKeyPress = ({ code }: KeyboardEvent) => {
    if (code === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <Portal>
      <div className="modal is-active">
        <div className="modal-background" onClick={closeModal} />
        <div className="transactions-modal modal-content">
          <div className="box">
            <div className="content">{children}</div>
          </div>
        </div>
        <button className="modal-close is-large" onClick={closeModal} />
      </div>
    </Portal>
  );
};

export default Modal;
