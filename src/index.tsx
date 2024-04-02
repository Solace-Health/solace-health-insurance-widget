import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Widget from "./Widget";
import { SolaceThemeProvider } from "@solace-health/ui";
import { ThemeProvider } from "@emotion/react";

const root = ReactDOM.createRoot(document.getElementById("solaceFunnelWidget"));
export const theme = {
  colors: {
    primary: "#1D4339",
    secondaryGreen: "#285E50",
    lightGreen: "#BED3CC",
    fail: "#ff0000",
    gray: "#f3f3f3",
  },
  breakpoint: {
    small: "500px",
    medium: "800px",
    large: "1200px",
  },
  typography: {
    family: {
      body: "Lato, helvetica, sans-serif",
      heading: "'Mollie Glaston', serif",
      subHeading: "'Cinzel', sans-serif",
      script: "'Dancing Script', sans-serif",
    },
    weight: {
      normal: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
  },
};
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SolaceThemeProvider>
        <Widget />
      </SolaceThemeProvider>
    </ThemeProvider>
  </React.StrictMode>
);
