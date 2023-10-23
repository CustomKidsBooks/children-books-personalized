import { getAccessToken } from '@auth0/nextjs-auth0';
import httpProxy from 'http-proxy';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getAccessToken(req, res);
  const { slug } = req.query;
  const slugUrl: string = Array.isArray(slug) ? slug.join("/") : "";

  console.log('url', req.url);
  
  return new Promise((resolve, reject) => {
    const proxy: httpProxy = httpProxy.createProxy();
    proxy
      .once('proxyRes', resolve)
      .once('error', reject)
      .web(req, res, {
        changeOrigin: true,
        secure: false,
        target: process.env.API_BASE_URL,
        ...(token ? { headers: { Authorization: `Bearer ${token?.accessToken}` } } : {}),
      });
  });
};

export default handler;