import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import Home from './pages/index';
import AccountManagementPage from './pages/AccountManagementPage';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import FormBuilder from './pages/formBuilder';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/Home' element={<Home />} />
        <Route path='/AccountManagementPage' element={<AccountManagementPage />} />
        <Route path='/Settings' element={<Settings />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/form-builder' element={<FormBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;

