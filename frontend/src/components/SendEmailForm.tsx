"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { emailValidationSchema } from "@utils/emailValidation";
import ReusableInput from "./ReusableInput";
import { SendEmailModalProps } from "@utils/interfaces";
import { Button } from "@ui/Button";
import { useRouter } from "next/navigation";
import { useEditedBookContext } from "./context/EditedBookContext";
import { axiosInstance } from "@services/api-client";

interface SendEmailProps {
  selectedFormat: string;
  bookId: Number;
}

const SendEmailForm: React.FC<SendEmailProps> = ({
  selectedFormat,
  bookId,
}) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const { editedBook } = useEditedBookContext();

  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    useFormik<SendEmailModalProps>({
      initialValues: {
        email: "",
      },
      validationSchema: emailValidationSchema,
      onSubmit: async (values) => {
        const recipientEmail = values.email;
        try {
          const response: any = await axiosInstance.post(
            `/api/sendBookAs${selectedFormat}/${bookId}`,
            { bookId, recipientEmail, editedBook }
          );
          if (response.ok) {
            router.push(`/download/${bookId}`);
          } else {
            setErrorMessage(
              `Failed to send the book as ${selectedFormat} via email`
            );
          }
        } catch (error) {
          console.error(
            `Error sending the book as ${selectedFormat} via email:`,
            error
          );
        }
      },
    });

  return (
    <>
      <div className="flex flex-col justify-center items-center h-96 px-10">
        <h1 className="font-bold text-pink-deep label-input text-2xl">
          Share Book
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
          <div className="flex flex-col gap-4">
            <div className="place-item gap-px">
              <label htmlFor="email" className="label-text">
                Enter Recipient&apos;s Email
                <span className="asterisk">*</span>
              </label>
              <ReusableInput
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email ? (
                <div className="asterisk">{errors.email}</div>
              ) : null}
            </div>
          </div>
          <div className="flex-center mt-8">
            <Button
              type="submit"
              intent="pink"
              size="medium"
              className="flex-center w-full"
            >
              Send
            </Button>
          </div>
        </form>

        {errorMessage && (
          <p className="text-red-500 font-semibold my-3"> {errorMessage} </p>
        )}
      </div>
    </>
  );
};

export default SendEmailForm;
