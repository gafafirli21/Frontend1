import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contack from './components/Contack';

const App =() => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4">
          <ul className="flex space-x-4 justify-center text-white">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contack">Contack</Link>
            </li>
          </ul>
        </nav>
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/contack" element={<Contack/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;