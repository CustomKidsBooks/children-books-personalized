import { useState, useCallback } from "react";
import { axiosInstance } from "@services/api-client";

interface DownloadBookHook {
  downloadPDF: () => Promise<void>;
  downloadWord: () => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  message: string | null;
}

const useDownloadBook = (bookId: number): DownloadBookHook => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const downloadPDF = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      console.log("Starting PDF download...");
      const response = await axiosInstance.get(`/api/download/story/pdf/${bookId}`);
      console.log("PDF download response:", response);
      if (response.status === 200) {
        const blob = await response.data; // Assuming the response contains the blob data directly
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "story.pdf"; // Set the desired file name
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        setMessage("Download successful");
      } else {
        throw new Error("Download request failed");
      }
    } catch (error: any) {
      setIsError(true);
      setMessage(`Error downloading PDF: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [bookId]);
  const downloadWord = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axiosInstance.get(`/api/download/story/word/${bookId}`);
      if (response.status === 200) {
        const blob = await response.data; // Assuming the response contains the blob data directly
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "story.docx"; // Set the desired file name for Word document
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        setMessage("Word document download successful");
      } else {
        throw new Error("Word document download request failed");
      }
    } catch (error: any) {
      setIsError(true);
      setMessage(`Error downloading Word document: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [bookId]);
  return { downloadPDF, downloadWord, isLoading, isError, message };
};

export default useDownloadBook;
