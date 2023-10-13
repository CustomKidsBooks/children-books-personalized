import type { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken } from "@auth0/nextjs-auth0";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { accessToken } = await getAccessToken();
  // console.log('token', accessToken);
  

  const { slug } = req.query;
  console.log("slug", slug);

  res.end(`Post: ${slug}`);
}
