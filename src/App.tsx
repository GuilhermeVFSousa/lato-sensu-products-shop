import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MButton } from './components/MButton/MButton';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
