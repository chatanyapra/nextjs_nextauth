'use client';

import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import './SignPage.css';

type LoginData = {
  username: string;
  password: string;
};

type AuthUser = {
  _id: string;
  username: string;
  email: string;
  token: string;
};

declare global {
  interface Window {
    google: any;
  }
}

const SignPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginData>({ username: '', password: '' });

  useEffect(() => {
    const loadGoogleApi = () => {
      if (document.getElementById('google-script')) return;

      const script = document.createElement('script');
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.id = 'google-script';
      script.onload = initializeGoogleButton;
      document.body.appendChild(script);
    };

    const initializeGoogleButton = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });
        
        if (status !== 'authenticated') {
          window.google.accounts.id.renderButton(
            document.getElementById('google-login-button'),
            { theme: 'outline', size: 'large' }
          );
        }
      }
    };

    loadGoogleApi();

    return () => {
      const script = document.getElementById('google-script');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [status]);

  const handleCredentialResponse = async (response: any) => {
    try {
      const result = await signIn('google', {
        id_token: response.credential,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Google login failed');
      } else {
        toast.success('Login successful!');
        router.push('/');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
      toast.error('Google login failed');
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, password } = loginData;

    if (!username || !password) {
      toast.error("Both fields are required.");
      return;
    }

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Login successful!");
        router.push('/');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login failed");
    }
  };

  if (status === 'authenticated') {
    router.push('/');
    return null;
  }

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