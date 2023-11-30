import React from "react"
import { createRoot } from "react-dom/client"

const App = () => {
  return (
    <div style={{ width: '300px', height: '300px', backgroundColor: 'red'}}><span>Hello chrome</span></div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
