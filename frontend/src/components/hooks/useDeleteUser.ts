import axios from "axios";
import { useEffect, useState } from "react";

const useDeleteUser = async (userId: string | undefined) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`https://login.auth0.com/api/v2/users/6561862b17b4bdb50112ba1b`)
      .then((res) => {
        setIsDeleted(true);
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);
  return {
    isError,
    isLoading,
    isDeleted,
  };
};

export default useDeleteUser;
