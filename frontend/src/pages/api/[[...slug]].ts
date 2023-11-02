import { axiosInstance } from "@services/api-client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;
  const slugUrl: string = Array.isArray(slug) ? slug.join("/") : "";

  //  Changed the slugurl to url in GET request for getting queries in backend for pagination
  //  not sure how to send queries to backend without changing in this way

  const url = req.url;

  if (req.method === "GET") {
    await axiosInstance
      .get(`${url}`)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
      });
  } else if (req.method === "POST") {
    await axiosInstance
      .post(`/api/${slugUrl}`, req.body)
      .then((response) =>
        res.status(200).json({ message: "Book created successfully!" })
      )
      .catch((err) => res.status(500).json({ message: "Error" }));
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
