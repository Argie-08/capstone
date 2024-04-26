import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "primeicons/primeicons.css";
import App from "./App.jsx";
import "./index.css";

const value = {
  inputStyle: "filled",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PrimeReactProvider value={value}>
        <App />
      </PrimeReactProvider>
    </BrowserRouter>
  </React.StrictMode>
);
