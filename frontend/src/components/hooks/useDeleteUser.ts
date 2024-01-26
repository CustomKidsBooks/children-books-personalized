import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { axiosInstance } from "@services/api-client";

const useDeleteUser = () => {
  const { getAccessTokenSilently, logout } = useAuth0();

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const deleteUser = async (userId: string) => {
    const token = await getAccessTokenSilently();
    setIsDeleting(true);
    setIsError(false);
    try {
      const response = await axiosInstance.delete(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success === 1) {
        logout({ logoutParams: { returnTo: window.location.origin } });
        setIsDeleted(true);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsDeleting(false);
    }
  };
  return {
    isError,
    isDeleting,
    isDeleted,
    deleteUser,
  };
};

export default useDeleteUser;
