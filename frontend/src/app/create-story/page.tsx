"use client";
import StoryForm from "@components/StoryForm";
import useCreateStory from "@components/hooks/useCreateStory";

const CreateStory = () => {
  const { isError, submitting, createStory } = useCreateStory();

  return (
    <StoryForm
      isError={isError}
      submitting={submitting}
      handleCreateStory={createStory}
    />
  );
};

export default CreateStory;
