import LandingPage from "@components/LandingPage";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const Home = () => {
  return (
    <div>
      <section className="w-full">
        <LandingPage />
      </section>
    </div>
  );
};

export default Home;
