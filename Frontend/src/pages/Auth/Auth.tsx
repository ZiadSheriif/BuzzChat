import Landing from 'src/components/Auth/Landing/Landing';
import Login from 'src/components/Auth/Login/Login';
import Signup from 'src/components/Auth/Signup/Signup';
import styles from './Auth.module.scss';

import { useState } from 'react';
const Auth = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    return (
        <div className={styles.appContainer}>
            {!isLogin && !isRegister && <Landing isLogin={setIsLogin} isRegister={setIsRegister} />}
            {isLogin && <Login />}
            {isRegister && <Signup />}
        </div>
    );
}

export default Auth;
