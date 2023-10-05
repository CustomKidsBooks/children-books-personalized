"use client";

import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import StoryForm from "@components/StoryForm";
import useCreateStory from "@components/hooks/useCreateStory";

export default withPageAuthRequired(function CreateStory() {
  const { isError, submitting, createStory } = useCreateStory();

  return (
    <StoryForm
      isError={isError}
      submitting={submitting}
      handleCreateStory={createStory}
    />
  );
});

// function CreateStory() {
//   const { isError, submitting, createStory } = useCreateStory();

//   return (
//     <StoryForm
//       isError={isError}
//       submitting={submitting}
//       handleCreateStory={createStory}
//     />
//   );
// }

// export default CreateStory;
