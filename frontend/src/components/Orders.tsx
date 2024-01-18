"use client";
import { User } from "@auth0/auth0-react";
import useOrders from "./hooks/useOrders";
import Image from "next/image";
import { useState } from "react";
import Order from "./Order";

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

        <div className="flex gap-3 justify-center items-center my-14">
          <div className="flex items-center me-3">
            <button
              disabled={currentPage === 1 || orders.length === 0}
              onClick={() => getOrders(currentPage - 1)}
              className="font-semibold disabled:font-normal disabled:opacity-70"
            >
              <Image
                src="/assets/backward-arrow.svg"
                alt="backward-arrow"
                width={15}
                height={3}
                className="hover:cursor-pointer fill-amber-100"
              />
            </button>
          </div>
          <div className={`${totalPages > 1 && `flex gap-3`}`}>
            {orders.length === 0 ? (
              <div className="border-pink text-white font-semibold border px-4 py-2 rounded-full">
                1
              </div>
            ) : (
              Array.from(Array(3), (e, i) => {
                return (
                  <div key={i}>
                    {firstPage + i <= totalPages && (
                      <button
                        onClick={() => getOrders(i + firstPage)}
                        className={
                          currentPage === i + firstPage
                            ? "bg-pink text-white font-semibold border px-4 py-2 rounded-full"
                            : "border-pink text-black font-semibold border px-4 py-2 rounded-full"
                        }
                      >
                        {i + firstPage}
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div className="flex items-center ms-3">
            <button
              disabled={currentPage === totalPages || orders.length === 0}
              onClick={() => getOrders(currentPage + 1)}
              className="font-semibold disabled:font-normal disabled:opacity-70"
            >
              <Image
                src="/assets/forward-arrow.svg"
                alt="forward-arrow"
                width={15}
                height={3}
                className="hover:cursor-pointer"
              />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Orders;
