import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Search from './components/Search';
import Result from './components/Result';

function App() {
    return (
        <Router>
            {/* <Navbar /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/results" element={<Result />} />
            </Routes>
        </Router>
    );
}

export default App;
