"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { emailValidationSchema } from "@utils/emailValidation";
import ReusableInput from "./ReusableInput";
import { SendEmailModalProps } from "@utils/interfaces";
import { Button } from "@ui/Button";
import { useEditedBookContext } from "./context/EditedBookContext";
import { axiosInstance } from "@services/api-client";

interface SendEmailProps {
  selectedFormat: string;
  bookId: Number;
  emailSentMessage: string;
  setEmailSentMessage: (message: string) => void;
}

const SendEmailForm: React.FC<SendEmailProps> = ({
  selectedFormat,
  bookId,
  emailSentMessage,
  setEmailSentMessage,
}) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);

  const { editedBook } = useEditedBookContext();
  const { values, handleChange, handleBlur, errors, touched, handleSubmit, resetForm } =
    useFormik<SendEmailModalProps>({
      initialValues: {
        email: "",
      },
      validationSchema: emailValidationSchema,
      onSubmit: async (values) => {
        const recipientEmail = values.email;

        setSending(true);

        try {
          const response = await axiosInstance.post(
            `/api/sendBookAs${selectedFormat}/${bookId}`,
            { bookId, recipientEmail, editedBook }
          );
          setEmailSentMessage(response.data.message);
          setSending(false);
          resetForm();
        } catch (error) {
          setSending(false);
          setErrorMessage(
            `Failed to send the book as ${selectedFormat} via email`
          );
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
                onChange={(e) => {
                  handleChange(e);
                  setEmailSentMessage("");
                }}
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
        {sending && <p className="text-pink font-semibold my-3">Sending...</p>}
        {emailSentMessage && (
          <p className="text-pink font-semibold my-3">
            {emailSentMessage}{" "}
          </p>
        )}
        {errorMessage && (
          <p className="text-red-500 font-semibold my-3"> {errorMessage} </p>
        )}
      </div>
    </>
  );
};

export default SendEmailForm;
