import { Button } from "@ui/Button";
import { useState } from "react";
import Modal from "@components/Modal";
import SendEmailForm from "./SendEmailForm";
import { useRouter } from "next/navigation";

const SendBook = ({ bookId }: { bookId: number }) => {
  const [selectedFormat, setSelectedFormat] = useState<string>("Pdf");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="items-center">
      <h1 className="font-bold text text-2xl lg:text-3xl">Send by email:</h1>
      <div className="flex flex-col gap-4 py-4 w-32">
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setSelectedFormat("Pdf");
          }}
          intent="secondary"
          className="text font-bold"
        >
          PDF
        </Button>
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setSelectedFormat("Word");
          }}
          intent="secondary"
          className="text font-bold"
        >
          Word
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <SendEmailForm selectedFormat={selectedFormat} bookId={bookId} />
      </Modal>
    </div>
  );
};

export default SendBook;
