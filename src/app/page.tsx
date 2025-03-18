import Hero from "./components/Hero";
import Features from "./components/Features";
import SoftwareFeatures from "./components/SoftwareFeatures";
import UseCases from "./components/UseCases";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Partners from "./components/Partners";
import CallAction from "./components/CallAction";
import Questions from "./components/Questions";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Render() {
  return (
      <div>
        <Hero/>
        <Features/>
        <SoftwareFeatures/>
        <UseCases/>
        <Pricing/>
        <Testimonials/>
        <Partners/>
        <CallAction/>
        <Questions/>
        <Contact/>
        <Footer/>
      </div>
  );
};
