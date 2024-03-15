import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CSManage from './manage/CSManage';
import CSMain from './CSMain';
import CSUpload from './admin/CSUpload';
import CSQuiz from './solving/CSQuiz';
import CSHome from './CSHome';

const CSPage = () => {
  return (
    <Routes>
      <Route path="/" element={<CSHome />} />
      <Route path="/manage/*" element={<CSManage />} />
      <Route path="/start" element={<CSMain />} />
      <Route path="/upload" element={<CSUpload />} />
      <Route path="/solving" element={<CSQuiz />} />
    </Routes>
  );
};

export default CSPage;
