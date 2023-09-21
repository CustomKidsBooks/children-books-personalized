"use client";
import StoryForm from "@components/StoryForm";
import useCreateStory from "@components/hooks/useCreateStory";

const CreateStory = () => {
  const {
    isError,
    submitting,
    additionalFields,
    setAdditionalFields,
    createStory,
  } = useCreateStory();

  return (
    <StoryForm
      submitting={submitting}
      additionalFields={additionalFields}
      setAdditionalFields={setAdditionalFields}
      handleCreateStory={createStory}
    />
  );
};

export default CreateStory;
