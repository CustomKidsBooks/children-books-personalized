import { useUser } from "@auth0/nextjs-auth0/client";
import { CreateStoryFormValues } from "@utils/interfaces";
import axios from "axios";
import { useState } from "react";

const useCreateStory = () => {
  const { user, error, isLoading } = useUser();
  const [submitting, setIsSubmitting] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [bookID, setBookID] = useState<string>("");

  const url = user
    ? `/api/protected/create_book/${user.sub}`
    : `/api/create_book`;

  const createStory = async (values: CreateStoryFormValues) => {
    setIsSubmitting(true);
    setBookID("");
    setIsError(false);
    await axios
      .post(url, {
        title: values.title,
        ageGroup: values.ageGroup,
        privacy: values.privacy,
        subject: values.subject,
        page: values.page,
        characters: values.characters,
        lesson: values.lesson,
      })
      .then((res) => {
        setBookID(res.data.data.id);
      })
      .catch((err) => setIsError(true))
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return {
    isError,
    submitting,
    bookID,
    createStory,
  };
};

export default useCreateStory;
