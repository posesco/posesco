import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Experience as ExperienceSection } from "../components/sections/Experience";
import { MainLayout } from "../layouts/MainLayout";
import "../index.css";

const Experience = () => (
  <MainLayout>
    <div className="pt-24">
      <ExperienceSection />
    </div>
  </MainLayout>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Experience />
  </StrictMode>
);
