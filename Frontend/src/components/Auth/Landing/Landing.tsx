import styles from './Landing.module.css';

const Landing = () => {
    return (
        
            <div className={styles.landingContainer}>
                <img className={styles.logo} src="https://www.pngkey.com/png/full/114-1149878_react-js-logo.png" alt="React Logo" />
                <div className={styles.buttonsContainer}>
                    <a className={styles.link}>
                        <button className={styles.button}>Login</button>
                    </a>
                    
                    <a className={styles.link}>
                        <button className={styles.button}>Register</button>
                    </a>
                </div>
                <p className={styles.guest}>Continue as Guest</p>
            </div>
        
    )
}

export default Landing;