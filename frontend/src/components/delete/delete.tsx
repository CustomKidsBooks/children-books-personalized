"use client";
import React from "react";
import Modal from "./delModal";
import { DeleteModalProps } from "@utils/interfaces";
import { useAuth0 } from "@auth0/auth0-react";
import { axiosInstance } from "@services/api-client";
import { useState } from "react";

const DeleteModal: React.FC<DeleteModalProps> = ({
  onClose,
  title,
  text,
  buttonText,
  cancel = true,
  onConfirm,
  height,
  isVisible,
}) => {
  const { user, logout, getAccessTokenSilently } = useAuth0();

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const confirm = async () => {
    setIsLoading(true);
    setIsError(false);
    const token = await getAccessTokenSilently();
    axiosInstance
      .delete(`/api/users/${user?.sub}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success === 1) {
          logout({ logoutParams: { returnTo: window.location.origin } });
        }
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  };

  const close = () => onClose();

  return (
    <Modal
      title={title}
      width="510px"
      height={height}
      onClose={close}
      isVisible={isVisible}
      onConfirm={confirm}
    >
      {isLoading && <div>Loading.....</div>}
      {isError && <div> Error while Deleting the User</div>}
      <div className="p-4">
        <p className="mb-8">
          {text}
          <br />
          <br />
          Are you sure you want to continue?
        </p>
        <div className="mt-4 flex justify-end">
          {cancel && (
            <button
              onClick={close}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow float-right mt-0 me-5"
            >
              Cancel
            </button>
          )}
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow float-right mt-0"
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
