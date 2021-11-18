import React from 'react';
import GlobalStyle from './libs/styles/GlobalStyle';
import { ThreeProvider } from './libs/context/threeContext';
import { Route, Routes, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Main from './components/Main';
import Docs from './components/Docs';

function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <GlobalStyle path={location.pathname} />
      <Routes>
        <Route path="/" element={
          <ThreeProvider>
            <Main />
          </ThreeProvider>
        } />
        <Route path="/docs/:page" element={
          <Docs />
        } 
        />
        <Route path="*" element={
          <h1>404 NOT FOUND</h1>
        } />
      </Routes>
    </>
  );
}

export default App;
