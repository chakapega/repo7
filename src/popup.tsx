import React from "react"
import { createRoot } from "react-dom/client"

const Popup = () => <span>Gmail chrome extension</span>

const root = createRoot(document.getElementById("root")!)

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
)
