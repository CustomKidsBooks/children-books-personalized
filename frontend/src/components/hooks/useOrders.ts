import { axiosInstance } from "@services/api-client";
import { useEffect, useState } from "react";

const useOrders = (userID: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    axiosInstance
      .get(`/api/users/${userID}/orders`)
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return {
    isLoading,
    isError,
    orders,
  };
};

export default useOrders;
