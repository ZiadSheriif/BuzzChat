import ErrorBoundary from 'src/pages/ErrorBoundary/ErrorBoundary'; 
import './Landing.css';
const Landing = () => {
    return (
        <ErrorBoundary>
            <div className="container">
                <img className="logo" src="https://www.pngkey.com/png/full/114-1149878_react-js-logo.png" alt="React Logo" />
                <div className="buttons-container">
                <a className="link">
                    <button className="button">Login</button>
                </a>
                
                <a className="link">
                    <button className="button">Register</button>
                </a>
                </div>
                <p className="guest">Continue as Guest</p>
            </div>
        </ErrorBoundary>
    )
}

export default Landing;