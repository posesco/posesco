import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Skills as SkillsSection } from "../components/sections/Skills";
import { MainLayout } from "../layouts/MainLayout";
import "../index.css";

const Skills = () => (
  <MainLayout>
    <div className="pt-24">
      <SkillsSection />
    </div>
  </MainLayout>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Skills />
  </StrictMode>
);
