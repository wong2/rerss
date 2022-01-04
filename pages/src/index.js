import { h } from "preact";
import "tailwindcss/tailwind.css";
import { Router } from "preact-router";
import "./global.css";
import Home from "./routes/home";

const App = () => (
  <div id="app" className="w-full h-full">
    <Router>
      <Home path="/" />
    </Router>
  </div>
);

export default App;
