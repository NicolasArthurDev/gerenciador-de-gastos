import React from 'react'
import { createRoot } from 'react-dom/client'
import Home from './app/home'

const rootEl = document.getElementById('root') as HTMLElement

createRoot(rootEl).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
)
