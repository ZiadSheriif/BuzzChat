import Landing from 'src/components/Auth/Landing/Landing';
import Login from 'src/components/Auth/Login/Login';
import styles from './Auth.module.scss'; 

const Auth=()=> {
  return (
    <div className={styles.appContainer}>
      <Landing />
      <Login />
    </div>
  );
}

export default Auth;
