"use client";
import React from "react";
import { createPortal } from "react-dom";
import { useSignIn } from "../../features/useSignIn";

type SignInModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignUp: () => void;
  onOpenForgotPassword: () => void;
};

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onOpenSignUp, onOpenForgotPassword }) => {
  const { 
    email, 
    setEmail, 
    password, 
    setPassword, 
    handleSubmit, 
    handleForgotPassword, 
    handleSignUp 
  } = useSignIn(onClose, onOpenSignUp, onOpenForgotPassword);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50"
         style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(1px)" }}
    >
      <div className="bg-gray-700 p-6 rounded-lg w-96">
        <h2 className="text-2xl mb-4 text-center">Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex justify-between mt-2">
            <button type="button" name="sign up" onClick={handleSignUp} className="text-blue-500 hover:underline">
              Sign Up
            </button>
            <button type="button" name="forgotPassword" onClick={handleForgotPassword} className="text-blue-500 hover:underline">
              Forgot password
            </button>
          </div>

          <div className="flex justify-between mt-4">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white py-2 px-4 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default SignInModal;
