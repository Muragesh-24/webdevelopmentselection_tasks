import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Main from './components/Main';
import About from './components/About';

import News from './components/News';
import ("./App.css")

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/main" element={<Main />} />
        <Route path="/about" element={<About/>} />
        <Route path="/news" element={<News/>} />

      </Routes>
    </Router>
  );
};

export default App;
