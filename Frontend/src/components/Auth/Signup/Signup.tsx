import React, { useState, useEffect } from 'react';
import { signup } from 'src/services/Auth/auth';
import { loginUser } from 'src/redux/auth-actions.ts';
import { useDispatch } from 'react-redux';
import useAPI from 'src/hooks/useAPI.hook';
import InProgress from 'src/components/Helpers/InProgress/InProgress';
import styles from './Signup.module.scss';



const Signup: React.FC = () => {

    const { data: signupData, isLoading: signupLoading, isSuccess: signupSuccess, isError: signupError, error: signupErrorText, runQuery: signupRunQuery } = useAPI();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; image?: string }>({});

    const validate = () => {
        const newErrors: { username?: string; email?: string; password?: string; image?: string } = {};

        if (!username) newErrors.username = 'Username is required';
        if (!email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        // if (!image) newErrors.image = 'Image is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const reader = new FileReader();
            const imageDataUrl = reader.result as string || undefined;
            signupRunQuery(() => signup(username, email, password, imageDataUrl));

            if (image) reader.readAsDataURL(image);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    useEffect(() => {
        if (signupSuccess && signupData) {
            dispatch(loginUser(signupData));
            console.log(signupData);

        }
        else if (signupError) {
            setErrors({ email: signupErrorText });
        }
    }, [signupSuccess, signupData, signupError, signupErrorText]);

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="username" className={styles.label}>Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                />
                {errors.username && <span className={styles.error}>{errors.username}</span>}
            </div>

            <div className={styles.formGroup}>
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

            <div className={styles.formGroup}>
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

            <div className={styles.formGroup}>
                <label htmlFor="image" className={styles.label}>Upload Photo:</label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.input}
                />
                {errors.image && <span className={styles.error}>{errors.image}</span>}
            </div>

            {signupLoading ? <InProgress /> : <button type="submit" className={styles.button}>Sign Up</button>
            }        </form>
    );
};

export default Signup;
