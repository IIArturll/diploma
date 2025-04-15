import { useState } from "react";
import axios from "axios";

export default function useVerify(onClose: () => void) {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const respons = await axios.post('http://localhost:8080/api/user/verify',
          null,
          { 
              params: {
                email,
                code,
              }
          }
      );
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
    onClose();
  };

  return {
    code,
    setCode,
    email,
    setEmail,
    handleSubmit,
  };
}
