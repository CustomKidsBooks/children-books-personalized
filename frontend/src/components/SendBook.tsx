import { Button } from "@ui/Button";
import { useState, useContext } from "react";
import { ModalContext } from "./ModalProvider";
import Modal from "@components/Modal";
import SendEmailForm from "./SendEmailForm";
import { SendEmailModalProps } from "@utils/interfaces";
import { useRouter } from 'next/navigation';
import ToastModal from "./ToastModal";

const SendBook = ({ bookId }: { bookId: number }) => {
  const [recipientEmail, setRecipientEmailLocally] = useState<string>("");
  const { showModal, openModal, closeModal } = useContext(ModalContext);
  const [selectedFormat, setSelectedFormat] = useState<string>("Pdf");
  const [toastMessage, setToastMessage] = useState<string>("");
  const [isToastVisible, setToastVisible] = useState(false);
  const router = useRouter()

  const handleEmailChange = (email: string) => {
    setRecipientEmailLocally(email);
  };
  const handleSubmit = async (
    values: SendEmailModalProps,
    formType: "SendEmail"
  ) => {
    try {
      if (formType === "SendEmail") {
        closeModal("sendEmailModal");
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const sendEmail = (selectedFormat: string, recipientEmail: string) => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sendBookAs${selectedFormat}/${bookId}`, {
      method: "POST",
      body: JSON.stringify({ bookId, recipientEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setToastMessage(`Book sent as ${selectedFormat} via email successfully`);
          setToastVisible(true);
          router.push(`/preview-book/${bookId}`);
        } else {
          setToastMessage(`Failed to send the book as ${selectedFormat} via email`);
        }
      })
      .catch((error) => {
        console.error(`Error sending the book as ${selectedFormat} via email:`, error);
      });
  };

  return (
    <div className="items-center">
      <h1 className="font-bold text text-2xl lg:text-3xl">Send by email:</h1>
      <div className="flex flex-col gap-4 py-4 w-32">
        <Button onClick={() => {
          openModal("sendEmailModal");
          setSelectedFormat("Pdf");
        }} intent="secondary" className="text font-bold">
          PDF
        </Button>
        <Button onClick={() => {
          openModal("sendEmailModal");
          setSelectedFormat("Word");
        }} intent="secondary" className="text font-bold">
          Word
        </Button>
      </div>
      {showModal.sendEmailModal && (
        <Modal
          isVisible={showModal.sendEmailModal}
          onClose={() => closeModal("sendEmailModal")}
        >
          <SendEmailForm
            handleSubmit={handleSubmit}
            selectedFormat={selectedFormat}
            sendEmailDoc={sendEmail}
            onEmailChange={handleEmailChange}
          />
        </Modal>

      )}
      <ToastModal isVisible={isToastVisible} message={toastMessage} onClose={() => setToastVisible(false)} />
    </div>
  );
};

export default SendBook;
