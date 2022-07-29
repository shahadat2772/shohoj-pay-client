import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import SupportAdmin from "./Components/Pages/SupportAdmin";

const root = ReactDOM.createRoot(document.getElementById("root"));
const path = window.location.pathname


root.render(
  <React.StrictMode>
    <BrowserRouter>
    { path.indexOf('/support') === -1 ? <Home /> : <SupportAdmin /> }

      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
