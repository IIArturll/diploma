"use client";
import React from "react";
import { createPortal } from "react-dom";


type RespondOnInviteModalProps = {
    invitationCode: string,
    setInvitationCode: React.Dispatch<React.SetStateAction<string>>
    onRespondButtonClicked: ()=>void
    onCancelRespondClicked: ()=>void
};

const RespondOnInviteModal: React.FC<RespondOnInviteModalProps> = ({
    invitationCode, setInvitationCode, onRespondButtonClicked, onCancelRespondClicked
}) => {
    
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50"
         style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(1px)" }}
    >
      <div className="bg-gray-700 p-6 rounded-lg w-96">
        <h2 className="text-2xl mb-4 text-center">Add Board</h2>

        <form>
          <div className="mb-4">
            <label htmlFor="code" className="block text-sm mb-2">User email</label>
            <input
              type="code"
              id="code"
              value= {invitationCode}
              onChange={(e) => setInvitationCode(e.target.value)}
              className="w-full p-2 border bg-gray-800 rounded text-white"
              placeholder="Invitation code"
              required
            />
          </div>
          
          <div className="flex justify-between mt-4">
            <button type="button" onClick={onCancelRespondClicked} className="bg-gray-400 text-white py-2 px-4 rounded">
              Cancel
            </button>
            <button type="button" onClick={onRespondButtonClicked} className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500">
              Respond
            </button>
          </div>
        </form>
      </div>
    </div>,document.body
  );
};
export default RespondOnInviteModal