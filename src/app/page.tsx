import Hero from "./components/Hero";
import Features from "./components/Features";
import SoftwareFeatures from "./components/SoftwareFeatures";
import UseCases from "./components/UseCases";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";

export default function Render() {
  return (
      <div>
        <Hero/>
        <Features/>
        <SoftwareFeatures/>
        <UseCases/>
        <Pricing/>
        <Testimonials/>
      </div>
  );
};
