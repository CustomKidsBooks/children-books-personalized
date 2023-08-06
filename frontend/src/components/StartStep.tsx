import { LinkButton } from "@ui/LinkButton";

const StartStep = () => {
  const startSteps = {
    step1: "Choose a title and the age of your kid",
    step2: "Add as many details as you would like",
    step3: "Create, edit and save your book",
  };

  return (
    <>
      <div className="md:grid md:grid-cols-3 gap-12 m-20 sm:flex sm:flex-col">
        {Object.values(startSteps).map((step, index) => (
          <div
            key={index}
            className="rounded-full bg-pink w-56 h-56 flex items-center justify-center"
          >
            <p className="text-xl tracking-wide p-10 font-satoshi text-white font-semibold">
              {step}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center items-center">
        <LinkButton
          className="w-40"
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
