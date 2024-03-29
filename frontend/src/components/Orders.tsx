"use client";
import { User } from "@auth0/auth0-react";
import useOrders from "./hooks/useOrders";
import Image from "next/image";
import { useState } from "react";
import Order from "./Order";
import Pagination from "./Pagination";

interface ordersValues {
  user: User;
}

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

const Orders = ({ user }: ordersValues) => {
  const {
    isError,
    isLoading,
    orders,
    firstPage,
    totalPages,
    getOrders,
    currentPage,
    pagesToDisplay,
  } = useOrders(user?.sub!);

  if (isError) {
    return (
      <div className="flex h-96 justify-center items-center">
        Error : please try again letter
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex h-96 justify-center items-center">Loading...</div>
    );
  }

  return (
    <>
      <section className="max-w-5xl mx-auto">
        <div className="mt-6 mb-14 relative shrink flex-center">
          <Image
            src="/assets/orders.jpg"
            alt="Orders"
            width={247}
            height={126}
          />
          <h1 className="absolute top-1/4 md:text-4xl text-3xl text mx-16">
            Orders
          </h1>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 overflow-x-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Book Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Print Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="pt-5 text-center font-semibold text-base"
                  >
                    No orders
                  </td>
                </tr>
              ) : (
                orders.map((order: OrderValues) => (
                  <Order key={order.id} {...order}></Order>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          firstPage={firstPage}
          currentPage={currentPage}
          pagesToDisplay={pagesToDisplay}
          displaySelectedPage={getOrders}
          totalPages={totalPages}
        ></Pagination>
      </section>
    </>
  );
};

export default Orders;
