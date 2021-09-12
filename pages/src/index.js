import { h } from "preact";
import "tailwindcss/tailwind.css";
import "spectre.css";
import { Router } from "preact-router";
import Home from "./routes/home";

const App = () => (
  <div id="app">
    <Router>
      <Home path="/" />
    </Router>
  </div>
);

export default App;
