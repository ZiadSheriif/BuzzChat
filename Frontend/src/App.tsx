import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from 'src/pages/Auth/Auth';
import Home from 'src/pages/Home/Home';
import Profile from 'src/pages/Profile/Profile';
import Header from 'src/layouts/Header/Header';
import { RootState } from 'src/redux/types';
import { useSelector } from 'react-redux';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isLogged);

  return (
    <Router>
      <Header />
      <Routes>
        {/* Authenticated Routes */}
        {isAuthenticated ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            {/* Redirect to home if no route matches */}
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          <>
            {/* Non-authenticated Route */}
            <Route path="/auth" element={<Auth />} />
            {/* Redirect to login if not authenticated */}
            <Route path="*" element={<Navigate to="/auth" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
