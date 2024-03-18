import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CSManage from './manage/CSManage';
import CSStart from './CSStart';
import CSUpload from './admin/upload/CSAdminUpload';
import CSQuiz from './solving/CSQuiz';
import CSHome from './CSHome';

const CSPage = () => {
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
