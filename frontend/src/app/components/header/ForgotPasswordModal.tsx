"use client";
import React from "react";
import { createPortal } from "react-dom";
import { useForgotPassword } from "../../features/useForgotPassword";

type FogotPasswordProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ForgotPasswordModal: React.FC<FogotPasswordProps> = ({ isOpen, onClose}) => {
  const { 
    email, 
    setEmail, 
    handleSubmit
  } = useForgotPassword(onClose);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50"
         style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(1px)" }}
    >
      <div className="bg-gray-700 p-6 rounded-lg w-96">
        <h2 className="text-2xl mb-4 text-center">Forgot Password</h2>

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

          <div className="flex justify-between mt-4">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white py-2 px-4 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500">
              Send Email
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ForgotPasswordModal;