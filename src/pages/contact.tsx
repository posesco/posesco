import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Contact as ContactSection } from "../components/sections/Contact";
import { MainLayout } from "../layouts/MainLayout";
import "../index.css";

const Contact = () => (
  <MainLayout>
    <div className="pt-32">
      <ContactSection />
    </div>
  </MainLayout>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Contact />
  </StrictMode>
);
