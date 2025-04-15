"use client";

import Image from "next/image";
import { useUserProfile } from "../features/useUserProfile";
import { useEffect } from "react";
import { useAuth } from "../features/useAuth"; 
  
const UserProfilePage = () => {
  const {
    isEditing,
    name,
    newName,
    setNewName,
    email,
    password,
    setPassword,
    preview,
    fileInputRef,
    handleImageChange,
    handleLogout,
    handleCancel,
    handleClose,
    handleEdit,
    handleSave
  } = useUserProfile();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
  }, [isLoggedIn]);
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-600 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">User profile</h1>

      <div className="flex justify-center mb-4">
        <div
          className="w-32 h-32 rounded-full overflow-hidden border cursor-pointer"
        >
          {preview ? (
            <Image src={preview} alt="Avatar" width={128} height={128} />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
              Photo
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Username:</label>
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Enter your new username"
          />
        ) : (
          <p>{name}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Email:</label>
        <p>{email}</p>
      </div>

      {isEditing && (
        <div className="mb-4">
          <label className="block font-semibold">New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Enter your new password"
          />
        </div>
      )}
          
        {isEditing ? (
          <div className="flex justify-between mt-4">
            <button
              onClick={handleCancel}
              className="bg-gray-400 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        ) : (
        <div className="flex justify-between mt-4">
            <button
              onClick={handleClose}
              className="bg-gray-400 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-400 text-white py-2 px-4 rounded"
            >
              Logout
            </button>
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          </div>
        )}
      </div>
  );
};
export default UserProfilePage;

