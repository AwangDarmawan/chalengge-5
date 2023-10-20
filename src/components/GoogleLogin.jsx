import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button } from "react-bootstrap";

function GoogleLogin({ buttonText }) {
  
  const registerLoginWithGoogleAction = async (accessToken) => {
    try {
      const response = await axios.post(
        // 'https://shy-cloud-3319.fly.dev/api/v1/auth/google',
        `${import.meta.env.VITE_API_URL}/auth/google`,
      {
        access_token: accessToken,
      });

      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
      }

      window.location.href = "/";
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
      registerLoginWithGoogleAction(responseGoogle.access_token),
  });

  return (
    <Button variant="primary" onClick={loginWithGoogle}>
      {buttonText}
    </Button>
  );
}

export default GoogleLogin;
