import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MyInfo from './MyInfo';
import Setting from '@pages/MyPage/setting/Setting';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Request from '@pages/MyPage/request/Request';
import RoleGrant from '@pages/MyPage/roleGrant/RoleGrant';

const MyPage = () => {
  const { data: user, error } = useSWR('/v1/api/member/info', fetcher);

  const navigate = useNavigate();

  if (error || user?.role === 'GENERAL') {
    navigate('/');
  }

  return (
    <Routes>
      <Route path="/" element={<MyInfo />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/request" element={<Request />} />
      <Route path="/role-grant" element={<RoleGrant />} />
    </Routes>
  );
};

export default MyPage;
