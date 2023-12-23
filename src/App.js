// App.jsx

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/home';
import GamePage from './pages/Game/game';
import GameControlPage from './pages/GameControl/gamecontrol'; 
import { GameProvider } from './components/GameProvider';

function App() {
  return (
    <GameProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/control" element={<GameControlPage />} />
      </Routes>
    </GameProvider>
  );
}

export default App;