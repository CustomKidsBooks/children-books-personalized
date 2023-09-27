import { LinkButton } from "@ui/LinkButton";

const StartStep = () => {
  const startSteps = {
    step1: "Choose a title and the age of your kid",
    step2: "Add as many details as you would like",
    step3: "Create, edit and save your book",
  };

  return (
    <>
      <div className="my-10 flex flex-col justify-evenly sm:flex sm:flex-row sm:justify-evenly sm:items-start sm:gap-0 gap-3 items-center">
        {Object.values(startSteps).map((step, index) => (
          <div
            key={index}
            className="rounded-full bg-pink w-56 h-56 flex items-center justify-center"
          >
            <p className="text-xl text-center tracking-wide p-10 text text-white font-semibold">
              {step}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full mt-20 mb-10 flex justify-center items-center">
        <LinkButton
          className="w-40 text-center"
          href="/create-story"
          intent="teal"
          size="large"
        >
          Start!
        </LinkButton>
      </div>
    </>
  );
};

export default StartStep;
