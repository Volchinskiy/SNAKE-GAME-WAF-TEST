import React from 'react';
import { Routes, Route, } from "react-router-dom";

import RegisterLogin from './components/RegisterLogin';
import Snake from './pages/Snake';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RegisterLogin />} />
        <Route path="/game" element={<Snake />} />
      </Routes>
    </div>
  );
}

export default App;
