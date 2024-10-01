import React from 'react';
import { Button, Typography } from '@material-ui/core';
import styles from './Header.module.scss';

const Header: React.FC = () => {
    return (
        <header className={styles.navbar}>
            <Typography variant="h6" className={styles.title}>BuzzChat</Typography>
            <nav>
                <Button color="inherit" onClick={() => console.log('Go Home')}>Home</Button>
                <Button color="inherit" onClick={() => console.log('Log Out')}>Log Out</Button>
            </nav>
        </header>
    );
};

export default Header;
