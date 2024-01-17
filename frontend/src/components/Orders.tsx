"use client";
import { User } from "@auth0/auth0-react";
import { axiosInstance } from "@services/api-client";
import { useEffect } from "react";
import useOrders from "./hooks/useOrders";

interface orderValues {
  user: User;
}

const Orders = ({ user }: orderValues) => {
  const { isError, isLoading, orders } = useOrders(user?.sub!);

  return (
    <>
      <section></section>
    </>
  );
};

export default Orders;
