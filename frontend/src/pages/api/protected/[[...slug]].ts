import { getAccessToken } from "@auth0/nextjs-auth0";
import { axiosInstance } from "@services/api-client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessToken } = await getAccessToken(req, res);

  const { slug } = req.query;
  const slugUrl: string = Array.isArray(slug) ? slug.join("/") : "";

  if (req.method === "GET") {
    axiosInstance
      .get(`/api/${slugUrl}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {        
        res.status(200).json(response.data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
      });
  } else if (req.method === "POST") {
    axiosInstance
      .post(`/api/${slugUrl}`, req.body, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) =>
        res.status(200).json({ message: "Book created successfully!" })
      )
      .catch((err) => res.status(500).json({ message: "Error" }));
  } else {
    // Handle unsupported methods
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
