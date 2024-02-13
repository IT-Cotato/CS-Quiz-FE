import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MyInfo from './MyInfo';
import Setting from './setting/Setting';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const MyPage = () => {
  const { data: user } = useSWR('/v1/api/member/info', fetcher);

  const navigate = useNavigate();

  if (!user) {
    navigate('/');
  }

  return (
    <Routes>
      <Route path="/" element={<MyInfo />} />
      <Route path="/setting" element={<Setting />} />
    </Routes>
  );
};

export default MyPage;
