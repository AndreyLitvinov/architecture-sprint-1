import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./components/Root.jsx";
import { BrowserRouter } from "react-router-dom";
import { CurrentUserProvider } from "shared-contexts";

import "./index.css";

const Entry = () => (<div className="page__content">
  <React.StrictMode>
    <BrowserRouter>
      <CurrentUserProvider>
        <Root />
      </CurrentUserProvider>
    </BrowserRouter>
  </React.StrictMode>
</div>);


const rootElement = document.getElementById("root")
if (!rootElement) throw new Error("Failed to find the root element")

const rootReactElement = ReactDOM.createRoot(rootElement)

rootReactElement.render(<Entry />)