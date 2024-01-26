"use client";
import { User } from "@auth0/auth0-react";
import { useState } from "react";
import { axiosInstance } from "@services/api-client";
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

const Order = (order: OrderValues) => {
  const [viewStatus, setViewStatus] = useState<boolean>(false);
  const [orderStatus, setOrderStatus] = useState<string>("");

  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getAccessTokenSilently } = useAuth0();

  const formatDate = (dateString: string) => {
    const dateObject = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return dateObject.toLocaleDateString(
      "en-US",
      options as Intl.DateTimeFormatOptions
    );
  };

  const getStatus = async () => {
    if (!orderStatus) {
      setIsError(false);
      setIsLoading(true);
      try {
        const token = await getAccessTokenSilently();
        const response = await axiosInstance.get(
          `/api/users/:userID/orders/${order.printJobId}/status`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrderStatus(response.data.status.name);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <tr className={`bg-white ${!viewStatus && `border-b`}`}>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {order.id}
        </th>
        <th scope="row" className="px-6 py-4">
          {formatDate(order.date)}
        </th>
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {order.book.title}
        </td>
        <td className="px-6 py-4">{order.quantity}</td>
        <td className="px-6 py-4">{order.orderTotal}</td>
        <td className="px-6 py-4">{order.paymentStatus}</td>
        <td className="px-6 py-4">
          <button
            onClick={() => {
              getStatus();
              setViewStatus(!viewStatus);
            }}
            disabled={order.paymentStatus !== "Paid"}
            className="text-blue-500 disabled:text-gray-900"
          >
            {order.paymentStatus === "Paid" && <span>View</span>}
          </button>
        </td>
      </tr>
      {viewStatus && (
        <tr>
          <td colSpan={7} className="pt-5 border-b pb-5">
            {isLoading && (
              <div className="text-center font-semibold">Loading...</div>
            )}
            {isError && (
              <div className="text-center font-semibold text-red-500">
                Error : please try again
              </div>
            )}
            {orderStatus === "REJECTED" && (
              <div className="flex justify-center font-semibold text-red-500">
                Status : {orderStatus}
              </div>
            )}
            {orderStatus !== "" && orderStatus !== "REJECTED" && (
              <div className="flex justify-center gap-5 items-center ">
                <span
                  className={`border px-3 py-2 rounded-full  ${
                    orderStatus === ("CREATED" || "UNPAID")
                      ? `bg-pink text-white`
                      : ""
                  }`}
                >
                  Created
                </span>
                <span
                  className={`border px-3 py-2 rounded-full  ${
                    orderStatus === "PAYMENT_IN_PROGRESS" &&
                    `bg-pink text-white`
                  }`}
                >
                  Payment in Progress
                </span>
                <span
                  className={`border px-3 py-2 rounded-full  ${
                    orderStatus === ("PRODUCTION_READY" || "PRODUCTION_DELAYED")
                      ? `bg-pink text-white`
                      : ""
                  }`}
                >
                  Production Ready
                </span>
                <span
                  className={`border px-3 py-2 rounded-full  ${
                    orderStatus === "IN_PRODUCTION" && `bg-pink text-white`
                  }`}
                >
                  In Production
                </span>
                <span
                  className={`border px-3 py-2 rounded-full  ${
                    orderStatus === "SHIPPED" && `bg-pink text-white`
                  }`}
                >
                  Shipped
                </span>
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
};

export default Order;
