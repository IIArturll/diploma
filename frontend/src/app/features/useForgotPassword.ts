import { useState } from "react";

export function useForgotPassword(
  onClose: () => void
) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    onClose(); 
  };

  return {
    email,
    setEmail,
    handleSubmit,
  };
}
