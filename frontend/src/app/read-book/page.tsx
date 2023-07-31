"use client";

import { axiosInstance } from "@services/api-client";
import { useEffect, useState } from "react";

interface dataValues {
  id: number;
  title: string;
  desc: string;
  author: string;
}

const ReadBook = () => {
  const [data, setData] = useState<dataValues[]>([]);

  useEffect(() => {
    async function getBooks() {
      const response = await axiosInstance.get("/api/books");
      setData(response.data);
    }
    getBooks();
  }, []);

  return (
    <div>
      {data.map((d) => (
        <div key={d.id}>
          <h1>{d.title}</h1>
          <p>{d.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default ReadBook;
