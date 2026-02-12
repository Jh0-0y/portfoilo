import React from 'react'
import ReactDOM from 'react-dom/client'
import { Buffer } from 'buffer';
// @ts-expect-error Buffer polyfill for @react-pdf/renderer
globalThis.Buffer = Buffer;
import { AppRouter } from '@/router/AppRouter'
import '@/styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
)