import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { StrictMode } from 'react'; // Adicionado novamente

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);