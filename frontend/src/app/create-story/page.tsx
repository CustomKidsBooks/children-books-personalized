"use client";

import StoryForm from "@components/StoryForm";
import useCreateStory from "@components/hooks/useCreateStory";
import { useUser } from "@auth0/nextjs-auth0/client";

const CreateStory = () => {
  const { isError, submitting, createStory } = useCreateStory();
  const { user } = useUser();

  return (
    <StoryForm
      isError={isError}
      submitting={submitting}
      handleCreateStory={createStory}
      userID={user?.sub}
    />
  );
};

export default CreateStory;
