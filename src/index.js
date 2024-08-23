import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PopupState } from './context/PopupContext';
import { GameState } from './context/GameContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
  <React.StrictMode>
    <PopupState>
      <GameState>
        <App />
      </GameState>
    </PopupState>
  </React.StrictMode>
);