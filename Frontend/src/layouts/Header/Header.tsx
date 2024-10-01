import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { logoutUser } from 'src/redux/auth-actions.ts';
import { RootState } from 'src/redux/types';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styles from './Header.module.scss';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const isAuthenticated = useSelector((state: RootState) => state.auth.isLogged);


    return (
        <header className={styles.navbar}>
            <Typography variant="h6" className={styles.title}>BuzzChat</Typography>
            <nav>
                <Button color="inherit" onClick={() => console.log('Go Home')}>Home</Button>
                {isAuthenticated && <Button color="inherit" onClick={handleLogout}>Log Out</Button>}
            </nav>
        </header>
    );
};

export default Header;
