import React, {useState} from "react";
import { Heading } from "./ui/Heading";
import { Button } from "./ui/Button";
import useDownloadBook from "./hooks/useDownloadBook";

const DownloadBook = ({ bookId }: { bookId: number }) => {
  let { downloadPDF, downloadWord, isLoading, isError} = useDownloadBook(bookId);
  const [message, setMessage] = useState<string | null>(null);

  const handleDownload = async (downloadFunction: () => Promise<void>, fileName: string) => {
    try {
      await downloadFunction();
      setMessage(`${fileName} download successful`);
    } catch (error: any) {
      setMessage(`Error downloading ${fileName}: ${error.message}`);
    }
  };

  return (
    <div className="items-center">
      <h1 className="font-bold text text-3xl">Download:</h1>
      <div className="flex flex-col gap-4 py-4 w-32">
        <Button onClick={() => handleDownload(downloadPDF, "PDF")} intent="secondary" className="text font-bold">
          PDF
        </Button>
        <Button onClick={async () => await handleDownload(downloadWord, "Word")} intent="secondary" className="text font-bold">
          Word
        </Button>
      </div>
    </div>
  );
};

export default DownloadBook;
