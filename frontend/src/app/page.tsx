import LandingPage from "@components/LandingPage";

const Home = () => {
  return (
    <div>
      <section className="w-full flex-center flex-col">
        <h1 className="text-center head_text">
          Create captivating children&rsquo;s stories for all needs instantly
          using AI
        </h1>
        <p className="desc">
          Story Spark uses AI to create custom stories for your child. Simply
          input your story idea, and watch as their imagination comes to life in
          an exciting and personalized story.
        </p>
        <LandingPage />
      </section>
    </div>
  );
};

export default Home;
