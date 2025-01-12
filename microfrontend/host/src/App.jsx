import React, { lazy } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

const Login = lazy(() => import('auth/Login').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
})
);

const App = () => (
  
  <div className="container">
    <Login />
    <div>Name: host</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
  </div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)