import axios from "axios";

export const getAccessTokenFromLulu = async () => {
  const data = "grant_type=client_credentials";
  try {
    const response = await axios.post(
      "https://api.lulu.com/auth/realms/glasstree/protocol/openid-connect/token",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${process.env.LULU_SECRET}`,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    Promise.reject(error);
  }
};

export const createPrintJobInLulu = async () => {};
