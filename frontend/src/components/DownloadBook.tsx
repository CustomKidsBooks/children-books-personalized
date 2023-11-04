import React, { useState } from "react";
import { Button } from "./ui/Button";

const DownloadBook = ({ bookId }: { bookId: number }) => {
  const [message, setMessage] = useState<string | null>(null);

  const handleDownload = (downloadLink: string, fileName: string) => {
    try {
      window.open(downloadLink, "_blank");
      setMessage(`${fileName} download initiated`);
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    } catch (error: any) {
      setMessage(`Error downloading ${fileName}: ${error.message}`);
    }
  };

  return (
    <div className="items-center">
      <h1 className="font-bold text text-2xl lg:text-3xl">Download:</h1>
      <div className="flex flex-col gap-4 py-4 w-32">
        <Button
          onClick={() =>
            handleDownload(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/download/story/pdf/${bookId}`, "PDF")
          }
          intent="secondary"
          className="text font-bold"
        >
          PDF
        </Button>
        <Button
          onClick={() =>
            handleDownload(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/download/story/word/${bookId}`, "Word")
          }
          intent="secondary"
          className="text font-bold"
        >
          Word
        </Button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DownloadBook;
