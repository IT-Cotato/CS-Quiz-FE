import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '@pages/Home/Header';
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import Team from './pages/Team/Team';
import CSHome from './pages/CS/CSHome';
import Login from './pages/Login/Login';
import SessionHome from './pages/Session/SessionHome';
import Recruitment from './pages/JoinUs/Recruitment';
import MyPage from './pages/MyPage/MyPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/team" element={<Team />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/cs" element={<CSHome />} />
          <Route path="/session" element={<SessionHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/joinus" element={<Recruitment />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
