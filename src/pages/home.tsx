import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Hero } from "../components/sections/Hero";
import { Stats } from "../components/sections/Stats";
import { MainLayout } from "../layouts/MainLayout";
import "../index.css";

const Home = () => (
  <MainLayout>
    <Hero />
    <Stats />
  </MainLayout>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home />
  </StrictMode>
);
