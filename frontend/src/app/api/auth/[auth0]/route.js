import {handleAuth} from '@auth0/nextjs-auth0'

export const GET = handleAuth()


// export default async function accessToken(req, res) {
//   const { accessToken } = await getAccessToken(req, res);
//   console.log('Access Token:', accessToken);
//   return accessToken;

//   // Now you can use the access token as needed
// }
