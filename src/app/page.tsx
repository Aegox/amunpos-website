import Hero from "./components/Hero";
import Features from "./components/Features";
import AIShowcase from "./components/AIShowcase";
import UseCases from "./components/UseCases";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Partners from "./components/Partners";
import CallAction from "./components/CallAction";
import Questions from "./components/Questions";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import SmoothScrollManager from "./components/SmoothScrollManager";

export default function Render() {
  return (
    <div>
      <SmoothScrollManager />
      <Hero />
      <Features />
      <AIShowcase />
      <UseCases />
      <Pricing />
      <Testimonials />
      <Partners />
      <CallAction />
      <Questions />
      <Contact />
      <Footer />
      <AuthModal />
    </div>
  );
}
