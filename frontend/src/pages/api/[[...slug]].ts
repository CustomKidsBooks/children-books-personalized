import type { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { axiosInstance } from "@services/api-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { accessToken } = await getAccessToken(req, res);

  // if (typeof window !== "undefined" && accessToken) {
  //   localStorage.setItem("accessToken", accessToken || "null");
  // }
  // console.log('acc', accessToken);
  

  const { slug } = req.query;
  const slugUrl: string = Array.isArray(slug) ? slug.join("/") : "";
  console.log(slugUrl, "url");

  if (req.method === "GET") {
    axiosInstance
      .get(`/api/${slugUrl}`)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
      });
  }
  if (req.method === "POST") {
    axiosInstance
      .post(`/api/${slugUrl}`, req.body)
      .then((response) =>
        res.status(200).json({ message: "Book created successfully!" })
      )
      .catch((err) => res.status(500).json({ message: "Error" }));
  }
}
