import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import CSManage from './manage/CSManage';
import CSStart from './CSStart';
import CSUpload from './admin/upload/CSAdminUpload';
import CSQuiz from './solving/CSQuiz';
import CSHome from './CSHome';
import fetchUserData from '@utils/fetchUserData';

const CSPage = () => {
  const { data } = fetchUserData();
  const navigate = useNavigate();

  if (data?.role === null) {
    navigate('/');
  }
  return (
    <Routes>
      <Route path="/" element={<CSHome />} />
      <Route path="/manage/*" element={<CSManage />} />
      <Route path="/start" element={<CSStart />} />
      <Route path="/upload" element={<CSUpload />} />
      <Route path="/solving" element={<CSQuiz />} />
    </Routes>
  );
};

export default CSPage;
