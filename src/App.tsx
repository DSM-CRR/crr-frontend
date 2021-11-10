import React from 'react';
import Main from './components/Main';
import GlobalStyle from './libs/styles/GlobalStyle';
import { ThreeProvider } from './libs/context/threeContext';
import { Route, Routes, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  return (
    <>
      <GlobalStyle path={location.pathname} />
      <Routes>
        <Route path="/" element={
          <ThreeProvider>
            <Main />
          </ThreeProvider>
        } />
        <Route path="*" element={
          <h1>404 NOT FOUND</h1>
        } />
      </Routes>
    </>
  );
}

export default App;
