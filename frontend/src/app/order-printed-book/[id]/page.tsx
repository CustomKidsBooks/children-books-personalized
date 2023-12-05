"use client";

import { axiosInstance } from "@services/api-client";
import { Button } from "../../../components/ui/Button";
import useGetBook from "@components/hooks/useGetBook";
import { getIn, useFormik } from "formik";
import ReusableInput from "../../../components/ReusableInput";

interface OrderBookValues {
  id: number;
}

interface ShippingDetailsValues {
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
}

const OrderBook = ({ params }: { params: OrderBookValues }) => {
  const id = Number(params.id);

  const { isLoading, isError, bookData } = useGetBook(id);

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
  } = useFormik<ShippingDetailsValues>({
    initialValues: {
      fullName: "",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post(
          "/api/create-checkout-session",
          { bookData, values }
        );
        window.location = response.data.url.url;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <section className="">
      <div className="p-2 mb-3 flex flex-col justify-between max-w-3xl mx-auto">
        <div className="font-quicksand mt-10">
          <p className="text-xl my-3">
            <span className="font-bold">Title :</span> {bookData?.title}
          </p>
          <p className="text-xl my-3">
            <span className="font-bold">Subject :</span> {bookData?.subject}
          </p>
          <p className="text-xl my-3">
            <span className="font-bold">No of Pages :</span> {bookData?.page}
          </p>
        </div>

        <div className="font-bold text-2xl text-center my-5">
          Shipping Details
        </div>

        <form onSubmit={handleSubmit}>
          <div className="md:flex flex-col">
            <label
              htmlFor="title"
              className="text-xl lg:text-2xl font-quicksand"
            >
              Full Name <span className="asterisk">*</span>
            </label>
            <ReusableInput
              id="fullName"
              name="fullName"
              type="text"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div>
            {touched.fullName && errors.fullName ? (
              <div className="asterisk">{errors.fullName}</div>
            ) : null}
          </div>
          <div className="md:flex flex-col">
            <label
              htmlFor="title"
              className="text-xl lg:text-2xl font-quicksand"
            >
              Street Address <span className="asterisk">*</span>
            </label>
            <ReusableInput
              id="streetAddress"
              name="streetAddress"
              type="text"
              value={values.streetAddress}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div>
            {touched.streetAddress && errors.streetAddress ? (
              <div className="asterisk">{errors.streetAddress}</div>
            ) : null}
          </div>
          <div className="flex gap-2">
            <div className="md:flex flex-col">
              <label
                htmlFor="title"
                className="text-xl lg:text-2xl font-quicksand"
              >
                City <span className="asterisk">*</span>
              </label>
              <ReusableInput
                id="city"
                name="city"
                type="text"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div>
              {touched.city && errors.city ? (
                <div className="asterisk">{errors.city}</div>
              ) : null}
            </div>
            <div className="md:flex flex-col">
              <label
                htmlFor="title"
                className="text-xl lg:text-2xl font-quicksand"
              >
                State <span className="asterisk">*</span>
              </label>
              <ReusableInput
                id="state"
                name="state"
                type="text"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div>
              {touched.state && errors.state ? (
                <div className="asterisk">{errors.state}</div>
              ) : null}
            </div>
            <div className="md:flex flex-col">
              <label
                htmlFor="title"
                className="text-xl lg:text-2xl font-quicksand"
              >
                Postal Code <span className="asterisk">*</span>
              </label>
              <ReusableInput
                id="postalCode"
                name="postalCode"
                type="text"
                value={values.postalCode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div>
              {touched.postalCode && errors.postalCode ? (
                <div className="asterisk">{errors.postalCode}</div>
              ) : null}
            </div>
          </div>

          <div className="my-10 text-center">
            <Button intent="teal" className="text font-bold" type="submit">
              Make Payment
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default OrderBook;
