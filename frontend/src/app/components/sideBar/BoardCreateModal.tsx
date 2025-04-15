import React from "react";
import { createPortal } from "react-dom";
type Board = {
  id: string;
  name: string;
  description: string;
  type: "LIST" | "KANBAN" | "WEEK";
};

type BoardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  newBoard: Board;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSave: () => void;
  isSaveDisabled: boolean;
};

const BoardCreateModal: React.FC<BoardModalProps> = ({ isOpen, onClose, newBoard, onChange, onTypeChange, onSave, isSaveDisabled }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50"
         style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(1px)",
          pointerEvents: "all",
         }}
    >
      <div className="bg-gray-800 p-6 rounded-lg w-1/3" 
           style={{
            pointerEvents: "auto", 
            zIndex: 1000,
           }}
      >
        <h2 className="text-white text-2xl mb-4 text-center">Create New Board</h2>

        <div className="mb-4">
          <label htmlFor="name" className="text-white block mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newBoard.name}
            onChange={onChange}
            className="w-full p-2 bg-gray-700 text-white rounded"
            placeholder="Board name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="text-white block mb-1">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={newBoard.description}
            onChange={onChange}
            className="w-full p-2 bg-gray-700 text-white rounded"
            placeholder="Board description"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="text-white block mb-1">Type</label>
          <select
            id="type"
            name="type"
            value={newBoard.type}
            onChange={onTypeChange}
            className="w-full p-2 bg-gray-700 text-white rounded"
          >
            <option value="LIST">LIST</option>
            <option value="KANBAN">KANBAN</option>
            <option value="WEEK">WEEK</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button onClick={onClose} className="bg-gray-400 text-white py-2 px-4 rounded">
            Cancel
          </button>
          <button
            onClick={onSave}
            className={`py-2 px-4 rounded ${isSaveDisabled ? 'bg-gray-400' : 'bg-blue-600'}`}
            disabled={isSaveDisabled} 
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default BoardCreateModal;
