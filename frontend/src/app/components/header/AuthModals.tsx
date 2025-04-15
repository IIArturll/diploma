"use client";
import React from "react";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import VerifyModal from "./VerifyModal";
import { useAuthModals } from "@/app/features/useAuthModals";

const AuthModals: React.FC = () => {
  const {
    isSignInOpen,
    isSignUpOpen,
    isForgotPasswordOpen,
    isVerifyOpen,
    openSignIn,
    openSignUp,
    openForgotPassword,
    openVerify,
    closeAll,
  } = useAuthModals();

  return (
    <div>
      <button onClick={openSignIn} className="bg-blue-500 text-white p-2 rounded">
        Sign In
      </button>

      <SignInModal 
        isOpen={isSignInOpen} 
        onClose={closeAll}
        onOpenSignUp={openSignUp}
        onOpenForgotPassword={openForgotPassword}
      />

      <SignUpModal 
        isOpen={isSignUpOpen} 
        onClose={closeAll}
        onOpenSignIn={openSignIn}
        onOpenVerify={openVerify}
      />

      <ForgotPasswordModal 
        isOpen={isForgotPasswordOpen} 
        onClose={closeAll}
      />

      <VerifyModal 
        isOpen={isVerifyOpen}
        onClose={closeAll}
      />

    </div>
  );
};

export default AuthModals;
