"use client";
import Image from "next/image";
import { LinkButton } from "@ui/LinkButton";
import { useEffect } from "react";
import { axiosInstance } from "@services/api-client";
import { useAuth0 } from "@auth0/auth0-react";

interface SuccessPaymentValues {
  id: number;
}

const SuccessPayment = ({ params }: { params: SuccessPaymentValues }) => {
  const id = params.id;
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const updatePayment = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axiosInstance.put(
          `/api/orders/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    updatePayment();
  }, []);

  return (
    <section className="w-full p-10">
      <div className="mb-14 relative shrink flex-center">
        <Image
          src="/assets/success.jpg"
          alt="Orders"
          width={247}
          height={126}
        />
        <h1 className="absolute top-1/4 md:text-4xl text-3xl text mx-16">
          Success
        </h1>
      </div>
      <div className="h-full py-6 flex flex-col items-center justify-center  text-center">
        <p className="text-green-500 font-semibold md:text-xl md:mb-8">
          Your payment has been done successfully
        </p>
        <div className="flex flex-col md:flex-row gap-5 my-10">
          <LinkButton
            className="w-40 text-center"
            href="/orders"
            intent="teal"
            size="medium"
          >
            View Orders
          </LinkButton>
          <LinkButton
            className="w-40 text-center"
            href="/"
            intent="teal"
            size="medium"
          >
            Home
          </LinkButton>
        </div>
      </div>
    </section>
  );
};

export default SuccessPayment;
