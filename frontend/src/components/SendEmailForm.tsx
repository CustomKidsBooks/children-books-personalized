"use client";
import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import { emailValidationSchema } from "@utils/emailValidation";
import ReusableInput from "./ReusableInput";
import { SendEmailModalProps } from "@utils/interfaces";
import { Button } from "@ui/Button";
import { ModalContext } from "./ModalProvider";

interface SendEmailProps {
  handleSubmit: (values: SendEmailModalProps, formType: 'SendEmail') => Promise<void>;
  selectedFormat: string;
  sendEmailDoc: (selectedFormat: string, email: string) => void;
  onEmailChange: (email: string) => void;
}

const SendEmailForm: React.FC<SendEmailProps> = ({
  handleSubmit,
  sendEmailDoc,
  selectedFormat,
  onEmailChange,
}) => {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit: formikSubmit,
  } = useFormik<SendEmailModalProps>({
    initialValues: {
      email: "",
    },
    validationSchema: emailValidationSchema,
    onSubmit: (values) => {
      handleSubmit(values, 'SendEmail');
    },
  });
  const { closeModal } = useContext(ModalContext);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const sendEmail = async (selectedFormat: string) => {
    if (!values.email) {
      return setErrorMessage("Please fill all the fields");
    }
    if (Object.keys(errors).length > 0) {
      return;
    }
    const email = values.email;
    onEmailChange(email);
    setErrorMessage("");
    sendEmailDoc(selectedFormat, email);
    closeModal('sendEmailModal');
  }

  return (
    <>
      <div className="inline-flex flex-col justify-center items-center form-card border-bg">
        <h1 className="font-bold text-pink-deep label-input text-2xl -mt-4">
          Share Book
        </h1>
        <form onSubmit={formikSubmit} className="flex flex-col justify-center">
          <div className="flex flex-col gap-4">
            <div className="place-item gap-px">
              <label
                htmlFor="email"
                className="label-text"
              >
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
            <Button onClick={() => sendEmail(selectedFormat)} intent="pink" size="medium" className="flex-center w-full">
              Send
            </Button>
          </div>
        </form >
      </div>
    </>
  );
};

export default SendEmailForm;
