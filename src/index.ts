import "@/index.css";
import PairDashPage from "@/pages/PairDashPage/PairDashPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const pairDashPage = PairDashPage();
  app.appendChild(pairDashPage);
};

document.addEventListener("DOMContentLoaded", onInit);
