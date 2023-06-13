import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import ArtKive from "./ArtKive"

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <ArtKive /> {/* Render the ArtKive component */}
  </BrowserRouter>
);
