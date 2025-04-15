"use client";
import React from "react";
import { createPortal } from "react-dom";
import { useSignUpModal } from "../../features/useSignUp";

type SignUpModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignIn: () => void;
  onOpenVerify: () => void;
};

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onOpenSignIn, onOpenVerify}) => {
  const { 
    email, 
    setEmail, 
    password, 
    setPassword, 
    username,
    setUsername,
    handleSubmit,
    handleSignIn
  } = useSignUpModal(onClose,onOpenSignIn, onOpenVerify);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50"
         style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(1px)" }}
    >
      <div className="bg-gray-700 p-6 rounded-lg w-96">
        <h2 className="text-2xl mb-4 text-center">Sign Up</h2>

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
            <label htmlFor="username" className="block text-sm mb-2">Username</label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your username"
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
            <button type="button" name="Sign In" onClick={handleSignIn} className="text-blue-500 hover:underline">
              Sign In
            </button>
          </div>

          <div className="flex justify-between mt-4">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white py-2 px-4 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default SignUpModal;
