import BoardCreateModal from "./BoardCreateModal"
import { useBoardCreate } from "../../features/useBoardCreate";

type Board = {
  id: string;
  name: string;
  description: string;
  type: "LIST" | "KANBAN" | "WEEK";
};

type BoardCreateButtonProps = {
  onCreateBoard: (newBoard: Board) => void;
};

const BoardCreateButton = ({ onCreateBoard }: BoardCreateButtonProps) => {
  const {
    showModal,
    newBoard,
    openModal,
    closeModal,
    handleInputChange,
    handleTypeChange,
    saveBoard,
    isSaveDisabled,
  } = useBoardCreate({ onCreateBoard });

  return (
    <div>
      <button onClick={openModal} className="w-full bg-gray-700 text-white py-2 mb-4 rounded hover:bg-blue-600">
        Create Board
      </button>

      <BoardCreateModal
        isOpen={showModal}
        onClose={closeModal}
        newBoard={newBoard}
        onChange={handleInputChange}
        onTypeChange={handleTypeChange}
        onSave={saveBoard}
        isSaveDisabled={isSaveDisabled}
      />
    </div>
  );
};

export default BoardCreateButton;
