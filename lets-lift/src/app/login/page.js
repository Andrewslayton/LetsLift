// pages/login/page.js
import Head from 'next/head';
import { useState } from 'react';


function Login() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleGoogleLoginSuccess = (response) => {
    console.log('Google login success:', response);
    setLoggedIn(true);
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google login failure:', error);
  };

  return (
    <div>
      <Head>
        <title>Login - Lets Lift App</title>
        <meta name="description" content="Login to Lets Lift" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loggedIn ? (
        <div>You are logged in!</div>
      ) : (
        <GoogleLogin
          clientId="YOUR_CLIENT_ID"
          buttonText="Login with Google"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy={'single_host_origin'}
        />
      )}
    </div>
  );
}

export default Login;