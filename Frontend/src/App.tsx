import Auth from 'src/pages/Auth/Auth';
import Home from 'src/pages/Home/Home';
import Header from 'src/layouts/Header/Header';
import { RootState } from 'src/redux/types';
import { useSelector } from 'react-redux';
import React from 'react';




const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isLogged);

  console.log(isAuthenticated);

  return (
    <div>
      <Header />
      {isAuthenticated ? <Home /> : <Auth />}
    </div>
  );
};

export default App;
