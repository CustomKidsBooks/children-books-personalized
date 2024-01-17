"use client";

import { axiosInstance } from "@services/api-client";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Orders from "@components/Orders";
const OrdersPage = () => {
  const { user } = useAuth0();
  return user && <Orders user={user} />;
};

export default OrdersPage;
