import BoardMenu from "./BoardMenu";
import MenuDots from "./MenuDots";
import useBoardMenu from "../../features/useBoardMenu";
import { BoardCreate as Board } from "../../types/BoardCreate";

type BoardListProps = {
  boards: Board[];
  selectedBoardId: string,
  handleBoardClicked: (id: string) =>void;
  onDeleteBoard: (id: string) => void;
  onEditBoard: (id: string) => void;
};

const BoardList = ({ boards, selectedBoardId, handleBoardClicked, onDeleteBoard, onEditBoard }: BoardListProps) => {
  const { openMenu, handleMenuToggle } = useBoardMenu();

  return (
    <div>
      <ul className="relative">
        {boards.map((Board) => {
          const isSelected = selectedBoardId === Board.id;
          return (
          <li 
            key={Board.id} 
            className={`relative p-2 rounded mb-2 text-white text-center group ${isSelected ? "bg-blue-500" : "bg-gray-700"} `}
            onClick={()=>handleBoardClicked(Board.id)}
            >
            
            {Board.name}

            <MenuDots onClick={() => handleMenuToggle(Board.id)} />

            {openMenu === Board.id && (
              <BoardMenu
                onEdit={() => onEditBoard(Board.id)}
                onDelete={() => onDeleteBoard(Board.id)}
              />
            )}
          </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BoardList;
