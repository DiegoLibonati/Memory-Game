import { MemoryPage } from "@src/pages/MemoryPage/MemoryPage";

const onInit = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const memoryPage = MemoryPage();
  app.appendChild(memoryPage);
};

document.addEventListener("DOMContentLoaded", onInit);
