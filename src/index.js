import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './pages/App';

const container = document.getElementById('root');

if(container) {
    const root = createRoot(container);
    root.render(<App/>);    
}