import styles from './App.module.css';
import Landing from 'src/components/Auth/Landing/Landing';
import Login from 'src/components/Auth/Login/Login';

function App() {
  return (
    <div className={styles.container}>
      <h1>Group Chat</h1>
      <div className={styles.app}>
        <Landing />
        <Login />
      </div>
    </div>
  );
}

export default App;