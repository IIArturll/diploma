import { useState } from "react";

type Board = {
  id: string;
  name: string;
  description: string;
  type: "LIST" | "KANBAN" | "WEEK";
};

type UseBoardCreateProps = {
  onCreateBoard: (newBoard: Board) => void;
};

export const useBoardCreate = ({ onCreateBoard }: UseBoardCreateProps) => {
  const [showModal, setShowModal] = useState(false);
  const [newBoard, setNewBoard] = useState<Board>({
    id: "",
    name: "",
    description: "",
    type: "LIST",
  });

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBoard(prevBoard => ({
      ...prevBoard,
      [name]: value,
    }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewBoard(prevBoard => ({
      ...prevBoard,
      type: e.target.value as "LIST" | "KANBAN" | "WEEK",
    }));
  };

  const saveBoard = () => {
    if (!newBoard.name) {
      alert("Board name is required");
      return;
    }
    const id = new Date().toISOString();
    const boardWithId = { ...newBoard, id };
    onCreateBoard(boardWithId);
    closeModal();
    setNewBoard({ id: "", name: "", description: "", type: "LIST" });
  };

  return {
    showModal,
    newBoard,
    openModal,
    closeModal,
    handleInputChange,
    handleTypeChange,
    saveBoard,
    isSaveDisabled: !newBoard.name,
  };
};
