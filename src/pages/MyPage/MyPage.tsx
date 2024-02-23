import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MyInfo from './MyInfo';
import Setting from '@pages/MyPage/setting/Setting';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Request from '@pages/MyPage/request/Request';
import RoleGrant from '@pages/MyPage/roleGrant/RoleGrant';
import CSRecord from '@pages/MyPage/CSRecord';

const MyPage = () => {
  const { error } = useSWR('/v1/api/member/info', fetcher);

  const navigate = useNavigate();

  if (error) {
    navigate('/');
  }

  return (
    <Routes>
      <Route path="/" element={<MyInfo />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/request" element={<Request />} />
      <Route path="/role-grant" element={<RoleGrant />} />
      <Route path="cs-record" element={<CSRecord />} />
    </Routes>
  );
};

export default MyPage;
