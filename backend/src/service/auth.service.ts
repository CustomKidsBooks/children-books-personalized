import axios from "axios";

export async function getApiAccessToken() {
  const response = await axios.post(
    `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    {
      client_id: process.env.AUTH0_API_CLIENT_ID,
      client_secret: process.env.AUTH0_API_CLIENT_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
      grant_type: "client_credentials",
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.access_token;
}

export async function deleteUserFromOauth(
  userID: string,
  access_token: string
) {
  await axios.delete(`${process.env.AUTH0_AUDIENCE}users/${userID}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}
