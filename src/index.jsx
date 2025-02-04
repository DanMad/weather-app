import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';
import App from 'app';
import Provider from 'components/provider';

const rootNode = document.getElementById('root');
const root = createRoot(rootNode);

root.render(
  <StrictMode>
    <Provider>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
);
