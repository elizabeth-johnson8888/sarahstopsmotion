import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Amplify } from "aws-amplify";

import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

import './style/theme.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
