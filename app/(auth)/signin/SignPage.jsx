import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import './SignPage.css';
import { useAuthContext } from '../context/AuthContext';

const SignPage = () => {
    const { authUser, setAuthUser } = useAuthContext();
    const [loginData, setLoginData] = useState({ username: '', password: '' });

    useEffect(() => {
        const loadGoogleApi = () => {
            const script = document.createElement('script');
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.defer = true;
            script.onload = () => initializeGoogleButton();
            document.body.appendChild(script);
        };

        const initializeGoogleButton = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                    callback: handleCredentialResponse,
                });
                if(!authUser){   
                    window.google.accounts.id.renderButton(
                        document.getElementById('google-login-button'),
                        { theme: 'outline', size: 'large' }
                    );
                }
            }
        };

        loadGoogleApi();
    }, []);

    function handleCredentialResponse(response) {
        const id_token = response.credential;
        // fetch('http://localhost:5001/api/auth/google/token', {
        fetch('https://chatanya.onrender.com/api/auth/google/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_token }) 
        })
        .then(response => response.json())
        .then(data => {
            toast.success("Login successful!");
            setAuthUser(data);
            localStorage.setItem("chatanya-portfolio", JSON.stringify(data));
        })
        .catch(error => {
            console.error('Error during Google login:', error);
            toast.error('Google login failed');
        });
    }

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { username, password } = loginData;

        if (!username || !password) {
            toast.error("Both fields are required.");
            return;
        }

        try {
            const response = await axios.post('/api/auth/login', loginData);
            toast.success("Login successful!");
            setAuthUser(response.data);
            localStorage.setItem("chatanya-portfolio", JSON.stringify(response.data));
        } catch (error) {
            toast.error(error.response.data.error || "Login failed");
        }
    };

    return (
        <div className="z-10 h-full min-h-screen mb-20 w-full relative dark:text-black overflow-hidden flex flex-col items-center m-auto pt-32 max-md:pt-12"
            style={{ maxWidth: "1600px" }}>
            <Toaster />
            <div className="signpage-container">
                <div className="signpage-left">
                    <div className="signpage-welcome-message">
                        <h1>Welcome!</h1>
                        <p>We`re glad to have you back.</p>
                    </div>
                </div>
                <div className="signpage-right">
                    <div className="signpage-login-box">
                        <div className="signpage-login-title">
                            <h2>Login</h2>
                        </div>
                        <form onSubmit={handleLogin}>
                            <div className="signpage-input-box">
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={loginData.username}
                                    onChange={handleLoginChange}
                                    required
                                />
                            </div>
                            <div className="signpage-input-box">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="signpage-login-button">Login</button>
                        </form>
                        <div id="google-login-button" className="google-login-button mt-10"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignPage;
