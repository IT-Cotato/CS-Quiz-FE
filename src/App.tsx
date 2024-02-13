import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import CSManage from '@pages/CS/manage/CSManage';
import QuizScorer from '@pages/CS/manage/QuizScorer';
import AllScorer from '@pages/CS/manage/AllScorer';
import Footer from '@components/Footer';
import FindID from '@pages/Login/FindID';
import FindPWProcess from '@pages/Login/FindPWProcess';
import CSMain from '@pages/CS/CSMain';
import CSUpload from '@pages/CS/admin/CSUpload';
import CSProblem from '@pages/CS/solving/CSProblem';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import MemberHeader from '@components/MemberHeader';
import Setting from '@pages/MyPage/setting/Setting';

function App() {
  const location = useLocation();

  const { data, error } = useSWR('/v1/api/member/info', fetcher);
  //location.pathname !== '/cs/solving'

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div className="wrapper">
          <div className="contentWrapper">
            {data?.role === ('GENERAL' || 'MEMBER' || 'OLD_MEMBER' || 'ADMIN' || 'EDUCATION') ? (
              location.pathname !== '/cs/solving' ? (
                <MemberHeader />
              ) : null
            ) : (
              <Header />
            )}
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
              <Route path="/cs/solving" element={<CSProblem />} />
              <Route path="/session" element={<SessionHome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/findid" element={<FindID />} />
              <Route path="/findpw" element={<FindPWProcess />} />
              <Route path="/joinus" element={<SignUp />} />
              <Route path="/mypage/*" element={<MyPage />} />
            </Routes>
          </div>
          {location.pathname !== '/cs/solving' && <Footer />}
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
