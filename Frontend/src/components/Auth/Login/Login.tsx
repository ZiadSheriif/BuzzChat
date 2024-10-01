import React, { useState, useEffect } from 'react';
import { login } from 'src/services/Auth/auth';
import { useDispatch } from 'react-redux';
import useAPI from 'src/hooks/useAPI.hook';
import { loginUser } from 'src/redux/auth-actions.ts';
import InProgress from 'src/components/Helpers/InProgress/InProgress';
import styles from './Login.module.scss';


const LoginForm: React.FC = () => {


    const { data: loginData, isLoading: loginLoading, isSuccess: loginSuccess, isError: loginError, error: loginErrorText, runQuery: loginRunQuery } = useAPI();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const validate = () => {
        const newErrors: { email?: string; password?: string } = {};
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            loginRunQuery(() => login(email, password));
        }
    };

    useEffect(() => {
        if (loginSuccess && loginData) {
            dispatch(loginUser(loginData));
            console.log(loginData);
        }
        else if (loginError) {
            setErrors({ email: loginErrorText });
        }
    }, [loginSuccess, loginData, loginError, loginErrorText, dispatch]);

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <p>Welcome to BuzzChat</p>
                <div>
                    <label htmlFor="email" className={styles.label}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                    />
                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                </div>
                <div>
                    <label htmlFor="password" className={styles.label}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                    {errors.password && <span className={styles.error}>{errors.password}</span>}
                </div>
                {loginLoading ? <InProgress /> : <button type="submit" className={styles.button}>Login</button>}
            </form>
        </div >
    );
};

export default LoginForm;