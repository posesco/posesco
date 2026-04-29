import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { About as AboutSection } from "../components/sections/About";
import { MainLayout } from "../layouts/MainLayout";
import "../index.css";

const About = () => (
  <MainLayout>
    <div className="pt-24 pb-12">
      <AboutSection />
    </div>
  </MainLayout>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <About />
  </StrictMode>
);
