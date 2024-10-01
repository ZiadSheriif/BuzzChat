import Auth from 'src/pages/Auth/Auth';
import Home from 'src/pages/Home/Home';
import { RootState } from 'src/redux/types'; // Assuming you defined RootState here
import { useSelector } from 'react-redux';
import React from 'react';




const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isLogged);

  console.log(isAuthenticated);
  return isAuthenticated ? <Home /> : <Auth />;
};

export default App;
