import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoSection from './components/VideoSection';
import Information from './components/Information';
import Helper from './components/Helper';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import './App.css';
import RegisterForm from './components/RegisterForm';
import AttackPage from './components/AttackPage';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/tutorials" element={<VideoSection />} />
          <Route path="/information" element={<Information />} />
          <Route path="/projects" element={<Helper />} />
          <Route path="/attackpage" element={<AttackPage />} />
          <Route path="/loginform" element={<LoginForm />} />
          <Route path="/registerform" element={<RegisterForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
  
};

export default App;
