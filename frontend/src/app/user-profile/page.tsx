"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import UserProfile from "@components/UserProfile";

const User = () => {
  const { user } = useUser();

  return user && <UserProfile user={user} />;
};

export default User;
