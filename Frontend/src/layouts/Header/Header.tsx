import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { logoutUser } from 'src/redux/auth-actions.ts';
import { RootState } from 'src/redux/types';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isLogged);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/auth');
    };

    const handleGoHome = () => {
        navigate('/home');
    };

    const handleGoProfile = () => {
        navigate('/profile');
    };

    return (
        <header className={styles.navbar}>
            <Typography variant="h6" className={styles.title}>BuzzChat</Typography>
            <nav>
                <Button color="inherit" onClick={handleGoHome}>Home</Button>
                {isAuthenticated && (
                    <>
                        <Button color="inherit" onClick={handleGoProfile}>Profile</Button>
                        <Button color="inherit" onClick={handleLogout}>Log Out</Button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
