"use client";

import { axiosInstance } from "@services/api-client";
import { Button } from "../../../components/ui/Button";
import useGetBook from "@components/hooks/useGetBook";
import { useFormik } from "formik";
import ReusableInput from "../../../components/ReusableInput";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef, useState, MutableRefObject } from "react";
import usePrintBook from "@components/hooks/usePrintBook";
import Image from "next/image";
import axios from "axios";

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
  const { user, getAccessTokenSilently, loginWithRedirect } = useAuth0();

  if (!user) {
    loginWithRedirect();
  }

  const { isLoading, isError, bookData } = useGetBook(id);

  const {
    data,
    selectedBookSize,
    selectedInteriorColor,
    selectedColor,
    selectedPrintQuality,
    selectedPaperType,
    selectedBindingType,
    selectedCoverFinish,
    shippingOptions,
    selectedShippingOption,
    countryCode,
    countryList,
    quantity,
    fullName,
    streetAddress,
    city,
    state,
    postalCode,
    email,
    phoneNumber,
    country,
    costs,
    podPackageId,
    handleBookSizeChange,
    handleInteriorColorChange,
    handlePaperTypeChange,
    handleBindingTypeChange,
    handleCoverFinishChange,
    getShippingOptions,
    handleEstimatedCost,
    handleNumberOfCopiesChange,
    handleShippingOptionChange,
  } = usePrintBook(bookData?.page!);

  const pageCount = bookData?.page!;

  const countryNames: string[] = Object.keys(countryList);

  const bookSizes: string[] = Array.from(
    new Set(
      data
        .filter((data: Array<string | number>) => {
          return +data[3] < pageCount && +data[4] > pageCount;
        })
        .map((data: Array<string | number>) => {
          return data[2];
        })
    )
  );

  const interiorColors: string[] = Array.from(
    new Set(
      data
        .filter((data: Array<string | number>) => {
          return (
            data[2] === selectedBookSize &&
            +data[3] < pageCount &&
            +data[4] > pageCount
          );
        })
        .map((data: Array<string | number>) => {
          return data[23] + "_" + data[24];
        })
    )
  );

  const paperTypes: string[] = Array.from(
    new Set(
      data
        .filter((data: Array<string | number>) => {
          return (
            data[2] === selectedBookSize &&
            +data[3] < pageCount &&
            +data[4] > pageCount &&
            data[23] === selectedColor &&
            data[24] === selectedPrintQuality
          );
        })
        .map((data: Array<string | number>) => {
          return data[31];
        })
    )
  );

  const bindingTypes: string[] = Array.from(
    new Set(
      data
        .filter((data: Array<string | number>) => {
          return (
            data[2] === selectedBookSize &&
            +data[3] < pageCount &&
            +data[4] > pageCount &&
            data[23] === selectedColor &&
            data[24] === selectedPrintQuality &&
            data[31] === selectedPaperType
          );
        })
        .map((data: Array<string | number>) => {
          return data[25];
        })
    )
  );

  const coverFinishes: string[] = Array.from(
    new Set(
      data
        .filter((data: Array<string | number>) => {
          return (
            data[2] === selectedBookSize &&
            +data[3] < pageCount &&
            +data[4] > pageCount &&
            data[23] === selectedColor &&
            data[24] === selectedPrintQuality &&
            data[31] === selectedPaperType &&
            data[25] === selectedBindingType
          );
        })
        .map((data: Array<string | number>) => {
          return data[32];
        })
    )
  );

  const printingCost =
    Math.round(costs?.line_item_costs[0]?.total_cost_incl_tax * 100) / 100;
  const shippingCost =
    Math.round(
      (+costs?.shipping_cost?.total_cost_incl_tax +
        +costs?.fulfillment_cost?.total_cost_incl_tax) *
        100
    ) / 100;
  const totalCost = Math.round((printingCost + shippingCost) * 100) / 100;

  const makePayment = async () => {
    const token = await getAccessTokenSilently();
    const amount = 1;
    try {
      const response = await axiosInstance.post(
        "/api/orders/create-checkout-session",
        {
          bookID: id,
          userID: user?.sub,
          bookData,
          totalAmount: totalCost,
          quantity,
          podPackageId,
          email: email.current?.value,
          name: fullName.current?.value,
          city: email.current?.value,
          countryCode,
          phoneNumber: phoneNumber.current?.value,
          postalCode: postalCode.current?.value,
          stateCode: state.current?.value,
          streetAddress: streetAddress.current?.value,
          shippingLevel: selectedShippingOption,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.location = response.data.url.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="">
      <div className="p-2 mb-3 flex flex-col justify-between max-w-5xl mx-auto">
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

        <div className="mt-5">
          <h1 className="text-2xl my-5 font-semibold font-quicksand mb-2">
            Book Options
          </h1>
          <hr className="border-1 border-black"></hr>

          <div className="flex justify-between my-5">
            <div className="md:flex flex-col  w-3/5">
              <label htmlFor="bookSize" className="text-xl font-quicksand mb-2">
                Book Size
              </label>
              <select
                id="bookSize"
                name="bookSize"
                className="border outline-none p-2"
                onChange={(e) => handleBookSizeChange(e.target.value)}
              >
                <option value="">Select Book Size</option>
                {bookSizes.map((size) => (
                  <option key={size} value={`${size}`}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr className="border-1"></hr>
          <h1 className="text-xl font-quicksand my-5">Interior Color</h1>
          <div className="py-5 flex gap-5">
            <button
              className={`w-1/4 border pb-3  ${
                !interiorColors.includes("Black & White_Premium")
                  ? "hover:cursor-default opacity-70"
                  : "hover:cursor-pointer"
              } ${
                selectedInteriorColor === "Black & White_Premium"
                  ? " border-l-teal border-l-4"
                  : ""
              }`}
              onClick={() => handleInteriorColorChange("Black & White_Premium")}
              disabled={!interiorColors.includes("Black & White_Premium")}
            >
              <Image
                src="/assets/printBook/BWPRE-1x.webp"
                alt="book_cover"
                height={100}
                width={100}
                className="w-full mb-3"
              />

              <input
                type="radio"
                id="blackAndWhitePremium"
                name="interiorColor"
                value="Black & White_Premium"
                checked={selectedInteriorColor === "Black & White_Premium"}
                disabled={!interiorColors.includes("Black & White_Premium")}
              />
              <label htmlFor="blackAndWhitePremium" className="ms-4">
                Black & White Premium
              </label>
            </button>
            <button
              className={`w-1/4 border pb-3  ${
                !interiorColors.includes("Black & White_Standard")
                  ? "hover:cursor-default opacity-70"
                  : "hover:cursor-pointer"
              } ${
                selectedInteriorColor === "Black & White_Standard"
                  ? " border-l-teal border-l-4"
                  : ""
              }`}
              onClick={() =>
                handleInteriorColorChange("Black & White_Standard")
              }
              disabled={!interiorColors.includes("Black & White_Standard")}
            >
              <Image
                src="/assets/printBook/BWSTD-1x.webp"
                alt="book_cover"
                height={100}
                width={100}
                className="w-full mb-3"
              />
              <input
                type="radio"
                id="blackAndWhiteStandard"
                name="interiorColor"
                value="Black & White_Standard"
                checked={selectedInteriorColor === "Black & White_Standard"}
                disabled={!interiorColors.includes("Black & White_Standard")}
              />
              <label htmlFor="blackAndWhiteStandard" className="ms-4">
                Black & White Standard
              </label>
            </button>
            <button
              className={`w-1/4 border pb-3 text-start ${
                !interiorColors.includes("Full Color_Premium")
                  ? "hover:cursor-default opacity-70"
                  : "hover:cursor-pointer"
              } ${
                selectedInteriorColor === "Full Color_Premium"
                  ? " border-l-teal border-l-4"
                  : ""
              }`}
              onClick={() => handleInteriorColorChange("Full Color_Premium")}
              disabled={!interiorColors.includes("Full Color_Premium")}
            >
              <Image
                src="/assets/printBook/FCPRE-1x.webp"
                alt="book_cover"
                height={100}
                width={100}
                className="w-full mb-3"
              />
              <input
                type="radio"
                id="colorPremium"
                name="interiorColor"
                value="Full Color_Premium"
                checked={selectedInteriorColor === "Full Color_Premium"}
                disabled={!interiorColors.includes("Full Color_Premium")}
                className="ms-4"
              />
              <label htmlFor="colorPremium" className="ms-4">
                Color Premium
              </label>
            </button>
            <button
              className={`w-1/4 border pb-3 text-start ${
                !interiorColors.includes("Full Color_Standard")
                  ? "hover:cursor-default opacity-70"
                  : "hover:cursor-pointer"
              } ${
                selectedInteriorColor === "Full Color_Standard"
                  ? " border-l-teal border-l-4"
                  : ""
              }`}
              onClick={() => handleInteriorColorChange("Full Color_Standard")}
              disabled={!interiorColors.includes("Full Color_Standard")}
            >
              <Image
                src="/assets/printBook/FCSTD-1x.webp"
                alt="book_cover"
                height={100}
                width={100}
                className="w-full mb-3"
              />
              <input
                type="radio"
                id="colorStandard"
                name="interiorColor"
                value="Full Color_Standard"
                checked={selectedInteriorColor === "Full Color_Standard"}
                disabled={!interiorColors.includes("Full Color_Standard")}
                className="ms-4"
              />
              <label htmlFor="colorStandard" className="ms-4">
                Color Standard
              </label>
            </button>
          </div>
          <hr className="border-1"></hr>

          <h1 className="text-xl font-quicksand my-5">Paper Type</h1>
          <div className="mb-5 flex gap-5">
            <button
              className={`w-1/4 border pb-3 text-start ${
                !paperTypes.includes("60# Uncoated Cream")
                  ? "hover:cursor-default opacity-70"
                  : "hover:cursor-pointer"
              } ${
                selectedPaperType === "60# Uncoated Cream"
                  ? " border-l-teal border-l-4"
                  : ""
              }`}
              onClick={() => handlePaperTypeChange("60# Uncoated Cream")}
              disabled={!paperTypes.includes("60# Uncoated Cream")}
            >
              <Image
                src="/assets/printBook/060UC-1x.webp"
                alt="book_cover"
                height={100}
                width={100}
                className="w-full mb-3"
              />
              <input
                type="radio"
                id="60#Cream"
                name="paperType"
                value="60# Uncoated Cream"
                checked={selectedPaperType === "60# Uncoated Cream"}
                disabled={!paperTypes.includes("60# Uncoated Cream")}
                className="ms-4"
              />
              <label htmlFor="60#Cream" className="ms-4">
                60# Cream
              </label>
            </button>
            <button
              className={`w-1/4 border pb-3 text-start ${
                !paperTypes.includes("60# Uncoated White")
                  ? "hover:cursor-default opacity-70"
                  : "hover:cursor-pointer"
              } ${
                selectedPaperType === "60# Uncoated White"
                  ? " border-l-teal border-l-4"
                  : ""
              }`}
              onClick={() => handlePaperTypeChange("60# Uncoated White")}
              disabled={!paperTypes.includes("60# Uncoated White")}
            >
              <Image
                src="/assets/printBook/060UW-1x.webp"
                alt="book_cover"
                height={100}
                width={100}
                className="w-full mb-3"
              />
              <input
                type="radio"
                id="60#White"
                name="paperType"
                value="60# Uncoated White"
                checked={selectedPaperType === "60# Uncoated White"}
                disabled={!paperTypes.includes("60# Uncoated White")}
                className="ms-4"
              />
              <label htmlFor="60#White" className="ms-4">
                60# White
              </label>
            </button>
            <button
              className={`w-1/4 border pb-3 text-start ${
                !paperTypes.includes("80# Coated White")
                  ? "hover:cursor-default opacity-70"
                  : "hover:cursor-pointer"
              } ${
                selectedPaperType === "80# Coated White"
                  ? " border-l-teal border-l-4"
                  : ""
              }`}
              onClick={() => handlePaperTypeChange("80# Coated White")}
              disabled={!paperTypes.includes("80# Coated White")}
            >
              <Image
                src="/assets/printBook/060UW-1x.webp"
                alt="book_cover"
                height={100}
                width={100}
                className="w-full mb-3"
              />
              <input
                type="radio"
                id="80#CoatedWhite"
                name="paperType"
                value="80# Coated White"
                checked={selectedPaperType === "80# Coated White"}
                disabled={!paperTypes.includes("80# Coated White")}
                className="ms-4"
              />
              <label htmlFor="80#CoatedWhite" className="ms-4">
                80# coated White
              </label>
            </button>
          </div>
          <hr className="border-1 "></hr>
          <h1 className="text-xl font-quicksand my-5">Binding Type</h1>
          <div className="mb-5 flex flex-wrap gap-5">
            <button
              className={`w-1/4 border pb-3 text-start ${
                !bindingTypes.includes("Coil")
                  ? "hover:cursor-default opacity-70"
                  : "hover:cursor-pointer"
              } ${
                selectedBindingType === "Coil"
                  ? " border-l-teal border-l-4"
                  : ""
              }`}
              onClick={() => handleBindingTypeChange("Coil")}
              disabled={!bindingTypes.includes("Coil")}
            >
              <Image
                src="/assets/printBook/CO-1x.webp"
                alt="book_cover"
                height={100}
                width={100}
                className="w-full mb-3"
              />
              <input
                type="radio"
                id="coilBound"
                name="bindingType"
                value="Coil"
                checked={selectedBindingType === "Coil"}
                disabled={!bindingTypes.includes("Coil")}
                className="ms-4"
              />
              <label htmlFor="coilBound" className="ms-4">
                Coil Bound
              </label>
            </button>
            <button
              className={`w-1/4 border pb-3 text-start ${
                !bindingTypes.includes("Perfect")
                  ? "hover:cursor-default opacity-70"
                  : "hover:cursor-pointer"
              } ${
                selectedBindingType === "Perfect"
                  ? " border-l-teal border-l-4"
                  : ""
              }`}
              onClick={() => handleBindingTypeChange("Perfect")}
              disabled={!bindingTypes.includes("Perfect")}
            >
              <Image
                src="/assets/printBook/PB-1x.webp"
                alt="book_cover"
                height={100}
                width={100}
                className="w-full mb-3"
              />
              <input
                type="radio"
                id="hardcover"
                name="bindingType"
                value="Perfect"
                checked={selectedBindingType === "Perfect"}
                disabled={!bindingTypes.includes("Perfect")}
                className="ms-4"
              />
              <label htmlFor="hardcover" className="ms-4">
                Hardcover
              </label>
            </button>
            <button
              className={`w-1/4 border pb-3 text-start ${
                !bindingTypes.includes("Case Wrap")
                  ? "hover:cursor-default opacity-70"
                  : "hover:cursor-pointer"
              } ${
                selectedBindingType === "Case Wrap"
                  ? " border-l-teal border-l-4"
                  : ""
              }`}
              onClick={() => handleBindingTypeChange("Case Wrap")}
              disabled={!bindingTypes.includes("Case Wrap")}
            >
              <Image
                src="/assets/printBook/CW-1x.webp"
                alt="book_cover"
                height={100}
                width={100}
                className="w-full mb-3"
              />
              <input
                type="radio"
                id="paperback"
                name="bindingType"
                value="Case Wrap"
                checked={selectedBindingType === "Case Wrap"}
                disabled={!bindingTypes.includes("Case Wrap")}
                className="ms-4"
              />
              <label htmlFor="paperback" className="ms-4">
                Paperback
              </label>
            </button>
            <button
              className={`w-1/4 border pb-3 text-start ${
                !bindingTypes.includes("Saddle Stitch")
                  ? "hover:cursor-default opacity-70"
                  : "hover:cursor-pointer"
              } ${
                selectedBindingType === "Saddle Stitch"
                  ? " border-l-teal border-l-4"
                  : ""
              }`}
              onClick={() => handleBindingTypeChange("Saddle Stitch")}
              disabled={!bindingTypes.includes("Saddle Stitch")}
            >
              <Image
                src="/assets/printBook/SS-1x.webp"
                alt="book_cover"
                height={100}
                width={100}
                className="w-full mb-3"
              />
              <input
                type="radio"
                id="saddleStitch"
                name="bindingType"
                value="Saddle Stitch"
                checked={selectedBindingType === "Saddle Stitch"}
                disabled={!bindingTypes.includes("Saddle Stitch")}
                className="ms-4"
              />
              <label htmlFor="saddleStitch" className="ms-4">
                Saddle Stitch
              </label>
            </button>
            <button
              className={`w-1/4 border pb-3 text-start ${
                !bindingTypes.includes("Linen Wrap")
                  ? "hover:cursor-default opacity-70"
                  : "hover:cursor-pointer"
              } ${
                selectedBindingType === "Linen Wrap"
                  ? " border-l-teal border-l-4"
                  : ""
              }`}
              onClick={() => handleBindingTypeChange("Linen Wrap")}
              disabled={!bindingTypes.includes("Linen Wrap")}
            >
              <Image
                src="/assets/printBook/LW-1x.webp"
                alt="book_cover"
                height={100}
                width={100}
                className="w-full mb-3"
              />
              <input
                type="radio"
                id="linenWrap"
                name="bindingType"
                value="Linen Wrap"
                checked={selectedBindingType === "Linen Wrap"}
                disabled={!bindingTypes.includes("Linen Wrap")}
                className="ms-4"
              />
              <label htmlFor="linenWrap" className="ms-4">
                Linen wrap
              </label>
            </button>
          </div>
          <hr className="border-1 "></hr>
          <h1 className="text-xl font-quicksand my-5">Cover Finish</h1>
          <div className="mb-5 flex gap-5">
            <button
              className={`w-1/4 border py-3 text-start ${
                !coverFinishes.includes("Gloss")
                  ? "hover:cursor-default opacity-70"
                  : "hover:cursor-pointer"
              } ${
                selectedCoverFinish === "Gloss"
                  ? " border-l-teal border-l-4"
                  : ""
              }`}
              onClick={() => handleCoverFinishChange("Gloss")}
              disabled={!coverFinishes.includes("Gloss")}
            >
              <input
                type="radio"
                id="glossy"
                name="coverFinish"
                value="Gloss"
                checked={selectedCoverFinish === "Gloss"}
                disabled={!coverFinishes.includes("Gloss")}
                className="ms-4"
              />
              <label htmlFor="glossy" className="ms-4">
                Glossy
              </label>
            </button>
            <button
              className={`w-1/4 border py-3 text-start ${
                !coverFinishes.includes("Matte")
                  ? "hover:cursor-default opacity-70"
                  : "hover:cursor-pointer"
              } ${
                selectedCoverFinish === "Matte"
                  ? " border-l-teal border-l-4"
                  : ""
              }`}
              onClick={() => handleCoverFinishChange("Matte")}
              disabled={!coverFinishes.includes("Matte")}
            >
              <input
                type="radio"
                id="matte"
                name="coverFinish"
                value="Matte"
                checked={selectedCoverFinish === "Matte"}
                disabled={!coverFinishes.includes("Matte")}
                className="ms-4"
              />
              <label htmlFor="matte" className="ms-4">
                Matte
              </label>
            </button>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="mt-14 text-xl lg:text-2xl font-quicksand font-semibold my-5">
            Book Shipping Estimator
          </h1>
          <hr className="border-1 border-black"></hr>

          <div className="flex mt-14 items-center my-10">
            <div className="w-2/4">
              <p>Please note: all shipping times and costs are estimates.</p>
            </div>
            <div className="flex justify-end w-2/4 gap-10">
              <div className="flex flex-col gap-5">
                <label
                  htmlFor="numberOfCopies"
                  className="text-xl font-quicksand"
                >
                  Number of Copies
                </label>
                <input
                  type="number"
                  name="numberOfCopies"
                  id="numberOfCopies"
                  className="border outline-none focus:border-slate-500 py-2 ps-2"
                  min="1"
                  value={quantity}
                  onChange={(e) => handleNumberOfCopiesChange(e.target.value)}
                  disabled={!podPackageId}
                />
              </div>
              <div className="flex flex-col gap-5">
                <label htmlFor="country" className="text-xl font-quicksand">
                  Destination Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="border outline-none p-2 w-full"
                  value={country}
                  onChange={(e) => {
                    getShippingOptions(
                      e.target.value as keyof typeof countryList
                    );
                  }}
                  disabled={!quantity}
                >
                  <option value="">Select Country</option>
                  {countryNames.map((country) => (
                    <option key={country} value={`${country}`}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="w-2/4 ml-auto ">
            {shippingOptions.map((shippingOption: any) => (
              <div key={shippingOption.id}>
                <button
                  className={`w-full flex mb-3 py-2 border items-center hover:cursor-pointer ${
                    selectedShippingOption === `${shippingOption.level}`
                      ? " border-l-teal border-l-4"
                      : ""
                  }`}
                  onClick={() =>
                    handleShippingOptionChange(shippingOption.level)
                  }
                >
                  <input
                    type="radio"
                    id={`${shippingOption.level}`}
                    name="shippingOption"
                    value={`${shippingOption.level}`}
                    checked={
                      selectedShippingOption === `${shippingOption.level}`
                    }
                    className="ms-4"
                  />
                  <label
                    htmlFor={`${shippingOption.level}`}
                    className="ms-4 w-full"
                  >
                    <div className="flex justify-between">
                      <div className="text-start">
                        <p className="mb-1 font-semibold">
                          {shippingOption.level} -{" "}
                          {shippingOption.traceable && <span>Traceable</span>}
                        </p>
                        <p>
                          Delivered in {shippingOption.total_days_min}-
                          {shippingOption.total_days_max} days
                        </p>
                      </div>
                      <div className="me-4 font-semibold">
                        <p>{shippingOption.currency}</p>
                        <p>{shippingOption.cost_excl_tax}</p>
                      </div>
                    </div>
                  </label>
                </button>
              </div>
            ))}
          </div>
        </div>

        {selectedShippingOption && (
          <div className="flex flex-col gap-5">
            <h1 className="text-xl lg:text-2xl font-quicksand font-semibold">
              Shipping Address
            </h1>
            <hr className="border-1 border-black"></hr>

            <div className="md:flex flex-col mt-5">
              <label
                htmlFor="fullName"
                className="text-xl lg:text-2xl font-quicksand"
              >
                Full Name <span className="asterisk">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                ref={fullName}
                className="ps-3 border outline-none focus:border-slate-600 py-2 rounded-md"
              />
            </div>

            <div className="md:flex flex-col mt-5">
              <label
                htmlFor="streetAddress"
                className="text-xl lg:text-2xl font-quicksand"
              >
                Street Address <span className="asterisk">*</span>
              </label>
              <input
                type="text"
                name="streetAddress"
                id="streetAddress"
                ref={streetAddress}
                className="ps-3 border outline-none focus:border-slate-600 py-2 rounded-md"
              />
            </div>

            <div className="flex gap-10">
              <div className="w-1/2 md:flex flex-col">
                <label
                  htmlFor="city"
                  className="text-xl lg:text-2xl font-quicksand"
                >
                  City <span className="asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  ref={city}
                  className="ps-3 border outline-none focus:border-slate-600 py-2 rounded-md"
                />
              </div>
              <div className="w-1/2 md:flex flex-col">
                <label
                  htmlFor="state"
                  className="text-xl lg:text-2xl font-quicksand"
                >
                  State <span className="asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  ref={state}
                  className="ps-3 border outline-none focus:border-slate-600 py-2 rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-between gap-5 my-5">
              <div className="w-1/3 md:flex flex-col">
                <label
                  htmlFor="email"
                  className="text-xl lg:text-2xl font-quicksand"
                >
                  Email <span className="asterisk">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  ref={email}
                  className="ps-3 border outline-none focus:border-slate-600 py-2 rounded-md"
                  required
                />
              </div>
              <div className="w-1/3 md:flex flex-col">
                <label
                  htmlFor="phoneNumber"
                  className="text-xl lg:text-2xl font-quicksand"
                >
                  Phone Number <span className="asterisk">*</span>
                </label>
                <input
                  type=""
                  name="phoneNumber"
                  id="phoneNumber"
                  ref={phoneNumber}
                  className="ps-3 border outline-none focus:border-slate-600 py-2 rounded-md"
                />
              </div>
              <div className="w-1/3 md:flex flex-col">
                <label
                  htmlFor="postalCode"
                  className="text-xl lg:text-2xl font-quicksand"
                >
                  Postal Code <span className="asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  ref={postalCode}
                  className="ps-3 border outline-none focus:border-slate-600 py-2 rounded-md"
                />
              </div>
            </div>
            <div className="my-10 text-center">
              <Button
                intent="teal"
                className="text font-bold"
                onClick={handleEstimatedCost}
              >
                Get Quote
              </Button>
            </div>
          </div>
        )}
        {costs && (
          <div>
            <div>
              <h1 className="mt-14 text-xl lg:text-2xl font-quicksand font-semibold my-5">
                Total Estimated Pricing
              </h1>
              <hr className="border-1 border-black"></hr>

              <div className="w-2/4 border ml-auto my-5">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right">
                    <tbody>
                      <tr className="bg-white border-b">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          Book Printing ( {quantity} Copies )
                        </th>
                        <td className="px-6 py-4 font-bold">
                          {costs?.currency} {costs && printingCost}
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium whitespace-nowrap"
                        >
                          Shipping & Handling
                        </th>
                        <td className="px-6 py-4 font-bold">
                          {costs?.currency} {costs && shippingCost}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="font-semibold text-gray-900">
                        <th scope="row" className="px-6 py-3 text-base">
                          Total ( {quantity} Copies )
                        </th>
                        <td className="px-6 py-3 font-bold">
                          {costs?.currency} {costs && totalCost}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            <div className="my-10 text-center">
              <Button
                intent="teal"
                className="text font-bold"
                onClick={makePayment}
                disabled={!totalCost}
              >
                Make Payment
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderBook;
