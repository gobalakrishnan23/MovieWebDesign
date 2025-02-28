import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { useEffect, useState } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('google_token');
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    setIsLoggedIn(true);
    const token = credentialResponse.credential;
    localStorage.setItem('google_token', token);
    console.log('Logged in:', credentialResponse);
  };

  const handleLogout = () => {
    googleLogout();
    setIsLoggedIn(false);
    localStorage.removeItem('google_token'); // Remove token
    console.log('Logged out');
  };

  return (
    <GoogleOAuthProvider clientId="976265445835-vs940jjvvlhvuur4bkb2bf7herk5c0n8.apps.googleusercontent.com">
      {isLoggedIn ? (
        <button onClick={handleLogout}>Log Out</button>
      ) : (
        <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log('Login Failed')}/> 
      )}
    </GoogleOAuthProvider>
  );
};

export default App;