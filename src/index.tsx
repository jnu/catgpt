import React from 'react';
import ReactDOM from 'react-dom/client';

import {App} from './App';

// Create root if the template doesn't already contain it.
let rootEl = document.getElementById('root');
if (!rootEl) {
  rootEl = document.createElement('div');
  rootEl.id = 'root';
  document.body.appendChild(rootEl);
}

// Render app
const root = ReactDOM.createRoot(rootEl);
root.render(<App />);
