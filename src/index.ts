import "@/index.css";
import { MemoryPage } from "@/pages/MemoryPage/MemoryPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const memoryPage = MemoryPage();
  app.appendChild(memoryPage);
};

document.addEventListener("DOMContentLoaded", onInit);
