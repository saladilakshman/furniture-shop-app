import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
// eslint-disable-next-line react-refresh/only-export-components
const App = lazy(() => import("./App.jsx"));
import Loader from "./assets/loader.svg";
createRoot(document.getElementById("root")).render(
  <Suspense
    fallback={<img src={Loader} alt="" className="block mx-auto pt-[50%]" />}
  >
    <App />
  </Suspense>
);
