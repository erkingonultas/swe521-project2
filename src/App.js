import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login.js';
import DatabaseHub from './Components/Databasehub';
import AudienceAdd from './Components/AudienceAdd';
import AudienceRemove from './Components/AudienceRemove';
import DirectorAdd from './Components/DirectorAdd';
import DirectorUpdate from './Components/DirectorUpdate';
import DirectorsHub from './Components/DirectorsHub';
import AudienceHub from './Components/AudienceHub';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/databasehub" element={<DatabaseHub />}></Route>
        <Route path="/directorshub" element={<DirectorsHub />}></Route>
        <Route path="/audiencehub" element={<AudienceHub />}></Route>
        <Route path="/databasehub/audience-add" element={<AudienceAdd />}></Route>
        <Route path="/databasehub/audience-remove" element={<AudienceRemove />}></Route>
        <Route path="/databasehub/director-add" element={<DirectorAdd />}></Route>
        <Route path="/databasehub/director-update/:username" element={<DirectorUpdate />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
