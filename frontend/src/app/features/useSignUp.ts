import { useState } from "react";
import axios from "axios";
export function useSignUpModal(
  onClose: () => void,
  onOpenSignIn: ()=>void,
  onOpenVerify: ()=>void
) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "username:",username, "Password:", password);
    try{
      const respons = await axios.post('http://localhost:8080/api/user/registration',
        {
        email,
        username,
        password
        }
      )
      if(respons.status===201){
        console.log("+")
        onClose();
        onOpenVerify();
      } else {
        onClose();
      }
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

  const handleSignIn = ()=>{
    onClose();
    onOpenSignIn();
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    handleSubmit,
    handleSignIn
  };
}
