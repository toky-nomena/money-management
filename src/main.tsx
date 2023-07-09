import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";

import App from "./App";
import "./table.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <StrictMode>
        <App />
      </StrictMode>{" "}
    </MantineProvider>
  );
}
