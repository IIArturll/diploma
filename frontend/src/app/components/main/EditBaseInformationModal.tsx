"use client";
import React from "react";
import { createPortal } from "react-dom";


type EditBaseInformationModalProps = {
    boardName:string
    setBoardName: React.Dispatch<React.SetStateAction<string>>
    boardDescription: string
    setBoardDescription: React.Dispatch<React.SetStateAction<string>>
    onCancelClicked: () => void
    onEditBaseInformationButtonClicked: () => void
    onDeleteClicled: () => void
};

const EditBaseInformationModal: React.FC<EditBaseInformationModalProps> = ({
    boardName,boardDescription,setBoardName,setBoardDescription,onCancelClicked,onEditBaseInformationButtonClicked, onDeleteClicled
}) => {
    
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50"
         style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(1px)" }}
    >
      <div className="bg-gray-700 p-6 rounded-lg w-96">
        <h2 className="text-2xl mb-4 text-center">Edit Board Information</h2>

        <form>
          <div className="mb-4">
            <label htmlFor="" className="block text-sm mb-2">Board Name</label>
            <input
              type="Board Name"
              id="Board Name"
              value= {boardName}
              onChange={(e) => setBoardName(e.target.value)}
              className="w-full p-2 border bg-gray-800 rounded text-white"
              placeholder="Board Name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="desctiption" className="block text-sm mb-2">Description</label>
            <input
              type="description"
              id="description"
              value= {boardDescription}
              onChange={(e) => setBoardDescription(e.target.value)}
              className="w-full p-2 border bg-gray-800 rounded text-white"
              placeholder="Desctiption"
              required
            />
          </div>
          <div className="flex justify-between mt-4">
            <button type="button" onClick={onCancelClicked} className="bg-gray-400 text-white py-2 px-4 rounded">
              Cancel
            </button>
            <button type="button" onClick={onDeleteClicled} className="bg-gray-400 text-white py-2 px-4 rounded">
              Delete
            </button>
            <button type="button" onClick={onEditBaseInformationButtonClicked} className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500">
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>,document.body
  );
};


export default EditBaseInformationModal
