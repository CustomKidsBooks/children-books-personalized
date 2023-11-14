"use client";
import { useAuth0 } from '@auth0/auth0-react';
import UserProfile from "@components/UserProfile";

const User = () => {
  const { user } = useAuth0();

  return user && <UserProfile user={user} />;
};

export default User;
