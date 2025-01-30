import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { StateContextProvider } from "./context/StateContext.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <StateContextProvider>
    <App />
  </StateContextProvider>
  // </StrictMode>,
);
