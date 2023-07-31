"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface BookValues {
  image: string;
  paragraph: string;
}

interface dataType {
  id: number;
  title: string;
  desc: string;
  author: string;
}

interface pageValues {
  id: number;
  paragraph: string;
  image: string;
  bookId: number;
}

interface testValues {
  id: number;
  title: string;
  url: string;
  description: string;
}

const ReadBook = () => {
  const [test, setTest] = useState<testValues[]>([]);
  const [data, setData] = useState<dataType[]>([]);

  useEffect(() => {
    async function getBooks() {
      const response = await axios.get("http://localhost:5001/api/books");
      console.log(response.data);
      setData(response.data);
    }
    async function getPhotos() {
      const res = await axios.get(
        "https://api.slingacademy.com/v1/sample-data/photos"
      );

      console.log(res.data);

      setTest(res.data.photos);
    }
    getPhotos();
    // getBooks();
  }, []);

  return (
    <div>
      {test.map((t) => (
        <div key={t.id}>
          <Image src={t.url} width={50} height={50} alt="abjbk"></Image>
          <p>{t.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ReadBook;
