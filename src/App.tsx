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
import { theme } from '@theme/theme';
import CSManage from '@pages/CS/manage/CSManage';
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
import ReadyState from '@components/ReadyState';
import NotFound from '@components/NotFound';
import HomeHeader from '@components/HomeHeader';
import BgWaiting from '@pages/CS/solving/CSQuiz';
import QuizScorer from '@pages/CS/manage/scorer/QuizScorer';
import AllScorer from '@pages/CS/manage/scorer/AllScorer';
import CSQuiz from '@pages/CS/solving/CSQuiz';

function App() {
  const location = useLocation();

  const { data, error } = useSWR('/v1/api/member/info', fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error.status === 400) return;
      if (retryCount >= 10) return;
    },
  });
  //location.pathname !== '/cs/solving'

  if (data) {
    localStorage.setItem('role', data.role);
    localStorage.setItem('name', data.memberName);
  } else {
    localStorage.removeItem('role');
    localStorage.removeItem('name');
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div className="wrapper">
          <div className="contentWrapper">
            {location.pathname == '/' ? (
              <HomeHeader />
            ) : ['GENERAL', 'MEMBER', 'OLD_MEMBER', 'ADMIN', 'EDUCATION'].includes(data?.role) ? (
              location.pathname !== '/cs/solving' ? (
                <MemberHeader />
              ) : null
            ) : (
              <Header />
            )}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ReadyState />} />
              <Route path="/team" element={<ReadyState />} />
              <Route path="/cs" element={<CSHome />} />
              <Route path="/cs/start" element={<CSMain />} />
              <Route path="/cs/upload" element={<CSUpload />} />
              <Route path="/cs/solving" element={<CSQuiz />} />
              <Route path="/cs/manage/*" element={<CSManage />} />
              <Route path="/cs/quizscorer" element={<QuizScorer />} />
              <Route path="/cs/allscorer" element={<AllScorer />} />
              <Route path="/session" element={<SessionHome />} />
              <Route path="/signin" element={<Login />} />
              <Route path="/findid" element={<FindID />} />
              <Route path="/findpw" element={<FindPWProcess />} />
              <Route path="/joinus" element={<SignUp />} />
              <Route path="/mypage/*" element={<MyPage />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
          {location.pathname !== '/cs/solving' && <Footer />}
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
