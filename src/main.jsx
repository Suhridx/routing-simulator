import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider, MessageProvider } from "./AppContext"; // Import the AppProvider from the previous example

import "./index.css";
import Simulator from "./Simulator.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <MessageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/sim" element={<Simulator />} />
          </Routes>
        </Router>
      </MessageProvider>
    </AppProvider>
  </React.StrictMode>
);
