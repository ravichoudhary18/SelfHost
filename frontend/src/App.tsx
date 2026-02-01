import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GlobalLoader from './components/Loader/GlobalLoader';
import Layout from './Layout';
import Home from './pages/Home';
import Taskq from './pages/Taskq';

const App: React.FC = () => {
  return (
    <>
      <GlobalLoader />
      <Routes>
        {/* Main layout route */}
        <Route path="/" element={<Layout />}>
          {/* Nested routes rendered inside <Outlet /> */}
          <Route index element={<Home />} />
          <Route path="/taskq" element={<Taskq />} />
          {/* You can add more pages here, e.g., /tasks */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
