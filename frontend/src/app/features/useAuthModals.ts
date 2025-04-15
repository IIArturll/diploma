import { useState } from "react";

export function useAuthModals() {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [isVerifyOpen, setVerifyOpen] = useState(false)

  const openSignIn = () => {
    setSignInOpen(true);
    setSignUpOpen(false);
    setForgotPasswordOpen(false);
    setVerifyOpen(false)
  };

  const openSignUp = () => {
    setSignUpOpen(true);
    setSignInOpen(false);
    setForgotPasswordOpen(false);
    setVerifyOpen(false)
  };

  const openForgotPassword = () => {
    setForgotPasswordOpen(true);
    setSignInOpen(false);
    setSignUpOpen(false);
    setVerifyOpen(false)
  };

  const openVerify = () => {
    setVerifyOpen(true)
    setForgotPasswordOpen(false);
    setSignInOpen(false);
    setSignUpOpen(false);
  }

  const closeAll = () => {
    setSignInOpen(false);
    setSignUpOpen(false);
    setForgotPasswordOpen(false);
    setVerifyOpen(false)
  };

  return {
    isSignInOpen,
    isSignUpOpen,
    isForgotPasswordOpen,
    isVerifyOpen,
    openSignIn,
    openSignUp,
    openForgotPassword,
    openVerify,
    closeAll,
  };
}
