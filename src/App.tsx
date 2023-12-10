import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Home from '@pages/Home/Home';
import Projects from '@pages/Projects/Projects';
import Team from '@pages/Team/Team';
import CSHome from '@pages/CS/CSHome';
import Login from '@pages/Login/Login';
import SessionHome from '@pages/Session/SessionHome';
import SignUp from '@pages/JoinUs/SignUp';
import MyPage from '@pages/MyPage/MyPage';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@theme/GlobalStyle';
import { theme } from '@theme/theme';
import Footer from '@components/Footer';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <div className="wrapper">
            <div className="contentWrapper">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/team" element={<Team />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/cs" element={<CSHome />} />
                <Route path="/session" element={<SessionHome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/joinus" element={<SignUp />} />
                <Route path="/mypage" element={<MyPage />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
