import { BookValues } from "@utils/interfaces";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const usePrintBook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);

  useEffect(() => {
    axios
      .get(
        "https://assets.lulu.com/media/specs/lulu-print-api-spec-sheet.xlsx",
        {
          responseType: "arraybuffer",
        }
      )
      .then((response) => {
        const data = new Uint8Array(response.data);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[1]];
        const jsonData = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
        });
        setData(
          jsonData.filter((data: any) => {
            return data[1] === "Yes";
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  }, []);

  return {
    isLoading,
    isError,
    data,
    filteredData,
    setFilteredData,
  };
};

export default usePrintBook;
