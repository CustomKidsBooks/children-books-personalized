import {handleAuth} from '@auth0/nextjs-auth0'
import { getAccessToken } from '@auth0/nextjs-auth0';

export const GET = handleAuth()


export default async function handler(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  console.log('Access Token:', accessToken);

  // Now you can use the access token as needed
}
