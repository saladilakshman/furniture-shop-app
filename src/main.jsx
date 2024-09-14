import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
// eslint-disable-next-line react-refresh/only-export-components
const App = lazy(() => import("./App.jsx"));
import Loader from "./assets/loader.svg";
createRoot(document.getElementById("root")).render(
  <Suspense
    fallback={
      <div
        className="flex flex-col justify-center items-center"
        style={{ minBlockSize: "50vh" }}
      >
        <img src={Loader} alt="" />
      </div>
    }
  >
    <App />
  </Suspense>
);
