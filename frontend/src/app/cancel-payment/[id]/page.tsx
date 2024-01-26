"use client";
import Image from "next/image";
import { LinkButton } from "@ui/LinkButton";

const CancelPayment = () => {
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
          Cancel
        </h1>
      </div>
      <div className="h-full py-6 flex flex-col items-center justify-center  text-center">
        <p className="text-red-500 font-semibold md:text-xl md:mb-8">
          Your payment has been done cancelled
        </p>
        <div className="flex flex-col md:flex-row gap-5 my-10 ">
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

export default CancelPayment;
