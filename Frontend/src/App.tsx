import Auth from 'src/pages/Auth/Auth';
import Home from 'src/pages/Home/Home';

import { useSelector } from 'react-redux';
import React from 'react';


interface AuthState {
  isLogged: boolean;
  id: string | null;
  username: string | null;
  token: string | null;
  image: string | null;
}

interface RootState {
  auth: AuthState;
}

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isLogged);

  return isAuthenticated ? <Home /> : <Auth />;
};

export default App;
