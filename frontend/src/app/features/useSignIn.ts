import { useState } from "react";
import axios from "axios";
import {useRouter} from 'next/navigation'

export function useSignIn(
  onClose: () => void,
  onOpenSignUp: () => void,
  onOpenForgotPassword: () => void
) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    try {
      const response = await axios.post('http://localhost:8080/api/user/login', {
        email,
        password
      });
    
      const { accessToken, refreshToken } = response.data;
      console.log('accessToken ', accessToken)
      console.log('refreshToken ', refreshToken)
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      console.log("Успешный логин!");
      onClose();
      router.push('/dashboard'); 
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Server responded with status:", error.response.status);
          console.error("Response data:", error.response.data);
        } else if (error.request) {
          console.error("No response received from the server");
        } else {
          console.error("Error setting up the request:", error.message);
        }
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  const handleForgotPassword = () => {
    onClose(); 
    onOpenForgotPassword(); 
  };

  const handleSignUp = () => {
    onClose(); 
    onOpenSignUp(); 
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    handleForgotPassword,
    handleSignUp,
  };
}
