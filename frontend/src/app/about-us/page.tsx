import AboutPage from "@components/AboutPage";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const AboutUs = () => {
  return (
    <div>
      <section className="w-full">
        <AboutPage />
      </section>
    </div>
  );
};

export default AboutUs;
