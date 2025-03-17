import React from "react";
import "./Login.css";
import { Button } from "@mui/material";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

function Login() {
  const signIn = async () => {
    try {
      // Initiate Google sign-in with a popup
      await signInWithPopup(auth, provider);
      console.log("Sign-in successful");
    } catch (error) {
      console.error("Error during sign-in: ", error.message);
      alert("Sign-in failed: " + error.message);
    }
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img 
          src="https://upload.wikimedia.org/wikipedia/en/9/98/Discord_logo.svg" 
          alt="Discord Logo" 
        />
      </div>
      <Button onClick={signIn}>Sign In with Google</Button>
    </div>
  );
}

export default Login;
