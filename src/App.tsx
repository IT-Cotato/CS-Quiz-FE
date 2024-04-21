import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Home from '@pages/Home/Home';
import Login from '@pages/Login/Login';
import SessionHome from '@pages/Session/SessionHome';
import SignUp from '@pages/JoinUs/SignUp';
import MyPage from '@pages/MyPage/MyPage';
import { GlobalStyle } from '@theme/GlobalStyle';
import Footer from '@components/Footer';
import FindID from '@pages/Login/FindID';
import FindPWProcess from '@pages/Login/FindPWProcess';
import MemberHeader from '@components/MemberHeader';
import ReadyState from '@components/ReadyState';
import NotFound from '@components/NotFound';
import HomeHeader from '@components/HomeHeader';
import CSPage from '@pages/CS/CSPage';
import fetchUserData from '@utils/fetchUserData';
import { ThemeProvider } from 'styled-components';
import { LegacyTheme } from '@theme/theme';

function App() {
  const location = useLocation();
  const { data: userData } = fetchUserData();
  return (
    <div className="App">
      <ThemeProvider theme={LegacyTheme}>
        <GlobalStyle />
        <div className="wrapper">
          <div className="contentWrapper">
            {location.pathname == '/' ? (
              <HomeHeader />
            ) : ['GENERAL', 'MEMBER', 'OLD_MEMBER', 'ADMIN', 'EDUCATION'].includes(
                userData?.role,
              ) ? (
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
              <Route path="/cs/*" element={<CSPage />} />
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
