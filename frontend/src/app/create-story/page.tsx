"use client";

import StoryForm from "@components/StoryForm";
import useCreateStory from "@components/hooks/useCreateStory";
import { useAuth0 } from "@auth0/auth0-react";

const CreateStory = () => {
  const { isError, submitting, bookID, createStory } = useCreateStory();
  const { user } = useAuth0();

  return (
    <StoryForm
      isError={isError}
      bookID={bookID}
      submitting={submitting}
      handleCreateStory={createStory}
      userID={user?.sub}
    />
  );
};

export default CreateStory;
