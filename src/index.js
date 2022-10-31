import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TagsProvider } from "./Helpers-test/TagsContext";




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TagsProvider>
      <App />
    </TagsProvider>
  </React.StrictMode>
);
