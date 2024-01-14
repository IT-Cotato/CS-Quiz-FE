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
import { theme } from '@theme/Theme';
import CSManage from '@pages/CS/CSManage/CSManage';
import QuizScorer from '@pages/CS/CSManage/QuizScorer';
import AllScorer from '@pages/CS/CSManage/AllScorer';
import Footer from '@components/Footer';
import FindID from '@pages/Login/FindID';
import FindPW from '@pages/Login/FindPW';
import EmailAuth from '@pages/Login/EmailAuth';
import FindPWProcess from '@pages/Login/FindPWProcess';
import CSMain from '@pages/CS/CSMain';
import CSUpload from '@pages/CS/admin/CSUpload';

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
                <Route path="/cs/start" element={<CSMain />} />
                <Route path="/cs/upload" element={<CSUpload />} />
                <Route path="/cs/manage" element={<CSManage />} />
                <Route path="/cs/quizscorer" element={<QuizScorer />} />
                <Route path="/cs/allscorer" element={<AllScorer />} />
                <Route path="/session" element={<SessionHome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/findid" element={<FindID />} />
                <Route path="/findpw" element={<FindPWProcess />} />
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
