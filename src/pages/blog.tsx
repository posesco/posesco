import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Blog as BlogComponent } from "../components/Blog";
import { MainLayout } from "../layouts/MainLayout";
import "../index.css";

const Blog = () => (
  <MainLayout>
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <BlogComponent />
    </div>
  </MainLayout>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Blog />
  </StrictMode>
);
