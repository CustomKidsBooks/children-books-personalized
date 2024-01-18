import { axiosInstance } from "@services/api-client";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

interface BookValues {
  ageGroup: string;
  characters: string;
  id: number;
  image: string;
  lesson: string;
  page: number;
  privacy: string;
  subject: string;
  tag: string;
  title: string;
  userID: string | null;
}

interface OrderValues {
  book: BookValues;
  id: number;
  coverUrl: string;
  date: string;
  interiorUrl: string;
  orderTotal: number;
  paymentStatus: string;
  podPackageId: string;
  printJobId: number;
  quantity: number;
  userID: string;
}

const useOrders = (userID: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderValues[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [firstPage, setFirstPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { getAccessTokenSilently } = useAuth0();

  const ordersPerPage = 5;

  useEffect(() => {
    const getOrders = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const token = await getAccessTokenSilently();
        const response = await axiosInstance.get(
          `/api/users/${userID}/orders?page=${1}&limit=${ordersPerPage}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(response.data.orders);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getOrders();
  }, []);

  const getOrders = async (selectedPage: number) => {
    const pageSet = Math.ceil(selectedPage / 3);
    setFirstPage(pageSet * 3 - 3 + 1);
    setCurrentPage(selectedPage);
    const token = await getAccessTokenSilently();
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axiosInstance.get(
        `/api/users/${userID}/orders?page=${selectedPage}&limit=${ordersPerPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    orders,
    getOrders,
    currentPage,
    firstPage,
    totalPages,
  };
};

export default useOrders;
