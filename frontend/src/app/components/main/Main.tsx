import React, { useEffect, useState } from "react";
import ListPage from "./list/ListPage";
import { useMain } from "@/app/features/useMain"
import RespondOnInviteModal from "./RespondOnInviteModal";

type MainProps = {
  selectedBoardId: string
  fetchBoards: ()=>void
};

export default function Main({selectedBoardId, fetchBoards} : MainProps) {
  const {
    board,
    fetchBoardById,
    checkTypeOfBoard,
    isModalOpen,
    setIsModalOpen,
    isBoardEditOpen,
    setIsBoardEditOpen,
    isIviteUserOpen,
    setIsInviteUserOpen,
    isKickUserOpen,
    setIsKickUserOpen,
    invitationCode,
    setInvitationCode,
    onRespondButtonClicked,
    onCancelRespondClicked,
    isAddBoardOpen,
    setIsAddBoardOpen
  } = useMain(fetchBoards)

  const [isSelected, setSelected] = useState(false)

  useEffect(() => {
    if (!selectedBoardId) {
      setSelected(false);
      return;
    }
    if(isModalOpen) return;
    if(isBoardEditOpen) return;
    if(isIviteUserOpen) return;
    if(isKickUserOpen) return;
    setSelected(true);
    fetchBoardById(selectedBoardId);
    const interval = setInterval(() => { fetchBoardById(selectedBoardId) }, 60 * 1000); 
    return () => clearInterval(interval);
  }, [selectedBoardId, isModalOpen]);

  const renderBoardPage = () => {
    if (!board) return null;
    const type = checkTypeOfBoard(board);
    switch (type) {
      case "LIST":
        return <ListPage 
                  selectedBoardId={selectedBoardId}
                  board={board} 
                  fetchBoardById={fetchBoardById}
                  isSelected={isSelected} 
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  isBoardEditOpen={isBoardEditOpen}
                  setIsBoardEditOpen={setIsBoardEditOpen}
                  isInviteUserOpen={isIviteUserOpen}
                  setIsInviteUserOpen={setIsInviteUserOpen}
                  isKickUserOpen={isKickUserOpen}
                  setIsKickUserOpen={setIsKickUserOpen}
                />;
      case "KANBAN":
        // return <KanbanPage board={board} />;
      case "WEEK":
        // return <WeekPage board={board} />;
      default:
        return <div className="text-center text-red-500">Unknown board type</div>;
    }
  };

  return (
      <div className="h-[calc(100vh-72px)] w-full mt-18 bg-gray-700">
        {!selectedBoardId&& (
        <div className="flex items-center flex-col gap-20"> 
          <h1 className="mt-10 text-center text-3xl">Home Page</h1>
          <button type="button" onClick={()=>setIsAddBoardOpen(true)} className="bg-gray-400 text-white py-2 px-4 rounded">
              Add Board
          </button>
          {isAddBoardOpen && (
            <RespondOnInviteModal
              invitationCode={invitationCode}
              setInvitationCode={setInvitationCode}
              onRespondButtonClicked={onRespondButtonClicked}
              onCancelRespondClicked={onCancelRespondClicked}
            />
          )}
        </div>
        )}
        {renderBoardPage()}
        </div>
  );
}
