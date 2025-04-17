"use client";
import React from "react";
import { createPortal } from "react-dom";


type InviteModalProps = {
    invitedUserEmail: string
    setInvitedUserEmail: React.Dispatch<React.SetStateAction<string>>
    onCancelClicled: () => void
    onInviteButtonClicked: ()=>void
};

const InviteModal: React.FC<InviteModalProps> = ({
    invitedUserEmail,setInvitedUserEmail,onCancelClicled,onInviteButtonClicked
}) => {
    
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50"
         style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(1px)" }}
    >
      <div className="bg-gray-700 p-6 rounded-lg w-96">
        <h2 className="text-2xl mb-4 text-center">Invite User</h2>

        <form>
          <div className="mb-4">
            <label htmlFor="" className="block text-sm mb-2">User email</label>
            <input
              type="User email"
              id="User email"
              value= {invitedUserEmail}
              onChange={(e) => setInvitedUserEmail(e.target.value)}
              className="w-full p-2 border bg-gray-800 rounded text-white"
              placeholder="User email"
              required
            />
          </div>

          <div className="flex justify-between mt-4">
            <button type="button" onClick={onCancelClicled} className="bg-gray-400 text-white py-2 px-4 rounded">
              Cancel
            </button>
            <button type="button" onClick={onInviteButtonClicked} className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500">
              Invite
            </button>
          </div>
        </form>
      </div>
    </div>,document.body
  );
};
export default InviteModal