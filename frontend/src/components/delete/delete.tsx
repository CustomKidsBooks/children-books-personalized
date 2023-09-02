"use client";
import React from 'react';
import Modal from './delModal';
import { DeleteModalProps } from "@utils/interfaces";

const DeleteModal: React.FC<DeleteModalProps> = ({
  onClose,
  title,
  text,
  buttonText,
  cancel = false,
  onConfirm,
  height,
  isVisible,
}) => {
  const confirm = () => {
    onConfirm && onConfirm();
    close();
  };

  const close = () => onClose();

  return (
    <Modal
      title={title}
      width="510px"
      height={height}
      close={close}
      isVisible={isVisible}
    >
      <div className="p-4">
        <p className="mb-8">
          {text}
          <br />
          <br />
          Are you sure you want to continue?
        </p>
        <div className="mt-4 flex justify-end">
          {cancel && (
            <button onClick={close} className="btn-text-black me-5">
              Cancel
            </button>
          )}
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow float--right mt-0"
            onClick={confirm}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
