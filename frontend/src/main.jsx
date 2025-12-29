import React from 'react'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

const root = createRoot(document.getElementById('root'))
ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
    <App />
  </React.StrictMode>
);

root.render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)
