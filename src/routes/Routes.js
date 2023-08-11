import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopicIndex from '../Components/TopicIndex';
import TopicCreate from '../Components/TopicCreate';

const RoutesApp = () => {
  return (
    <Routes>
      <Route path='/' element={<TopicIndex />} />
      <Route path='/create' element={<TopicCreate />} />
    </Routes>
  );
}

export default RoutesApp;
