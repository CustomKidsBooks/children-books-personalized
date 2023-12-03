import { useAuth0 } from "@auth0/auth0-react";
import { CreateStoryFormValues } from "@utils/interfaces";
import axios from "axios";
import { useState } from "react";

const useCreateStory = () => {
  const { user, error, isLoading, getAccessTokenSilently } = useAuth0();
  const [submitting, setIsSubmitting] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [bookID, setBookID] = useState<string>("");

  const userSubPath = user ? `/${user.sub}` : "";
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create_book${userSubPath}`;

  const createStory = async (values: CreateStoryFormValues) => {
    setIsSubmitting(true);
    setBookID("");
    setIsError(false);
    try {
      if (user) {
        const token = await getAccessTokenSilently();

        const response = await axios.post(
          url,
          {
            title: values.title,
            ageGroup: values.ageGroup,
            privacy: values.privacy,
            subject: values.subject,
            page: values.page,
            characters: values.characters,
            lesson: values.lesson,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBookID(response.data.data.id);
      } else {
        const response = await axios.post(url, {
          title: values.title,
          ageGroup: values.ageGroup,
          privacy: values.privacy,
          subject: values.subject,
          page: values.page,
          characters: values.characters,
          lesson: values.lesson,
        });
        setBookID(response.data.data.id);
      }
    } catch (err) {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isError,
    submitting,
    bookID,
    createStory,
  };
};

export default useCreateStory;
