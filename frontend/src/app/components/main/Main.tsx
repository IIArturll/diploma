import React, { useEffect, useState } from "react";
import ListPage from "@/app/components/main/list/ListPage";
import KanbanPage from "@/app/components/main/kanban/KanbanPage";
import RespondOnInviteModal from "@/app/components/main/RespondOnInviteModal";
import { TimerModal } from "./TimerModal";

import { useMain } from "@/app/features/useMain";
import { useTimer } from "@/app/features/useTimer";
import { Task } from "@/app/types/Task";

type MainProps = {
  selectedBoardId: string;
  fetchBoards: () => void;
};

export default function Main({ selectedBoardId, fetchBoards}: MainProps) {
  const {
    board,
    setBoard,
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
    setIsAddBoardOpen,
    onExecutorClick,
    onRemoveClicked,
    currentTask,
    setCurrentTask,
    expandedTaskId,
    setExpandedTaskId
  } = useMain(fetchBoards, selectedBoardId);

  const {
    isTimerOpen,
    setIsTimerOpen,
    minutes,
    setMinutes,
    secondsElapsed,
    secondsLeft,
    isRunning,
    start,
    pause,
    reset,
    progress,
    onCloseTimer,
  } = useTimer(15, selectedBoardId, currentTask, fetchBoardById);

  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    if (!selectedBoardId) {
      setSelected(false);
      return;
    }

    if (isModalOpen || isBoardEditOpen || isIviteUserOpen || isKickUserOpen) return;

    setSelected(true);
    fetchBoardById(selectedBoardId);

    const interval = setInterval(() => {
      fetchBoardById(selectedBoardId);
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [selectedBoardId, isModalOpen]);

  const renderBoardPage = () => {
    if (!board) return null;

    const type = checkTypeOfBoard(board);

    const Timer = isTimerOpen && (
      <TimerModal
        minutes={minutes}
        setMinutes={setMinutes}
        secondsElapsed={secondsElapsed}
        secondsLeft={secondsLeft}
        isRunning={isRunning}
        start={start}
        pause={pause}
        reset={reset}
        progress={progress}
        onClose={onCloseTimer}
      />
    );

    switch (type) {
      case "LIST":
        return (
          <>
            <ListPage
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
              onTimerClicked={() => setIsTimerOpen(true)}
              currentTask={currentTask}
              setCurrentTask={setCurrentTask}
              onExecutorClick={onExecutorClick}
              onRemoveClicked={onRemoveClicked}
            />
            {Timer}
          </>
        );
      case "KANBAN":
        return (
          <>
            <KanbanPage
              selectedBoardId={selectedBoardId}
              board={board}
              setBoard={setBoard}
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
              onTimerClicked={() => setIsTimerOpen(true)}
              currentTask={currentTask}
              setCurrentTask={setCurrentTask}
              onExecutorClick={onExecutorClick}
              onRemoveClicked={onRemoveClicked}
              expandedTaskId={expandedTaskId}
              setExpandedTaskId={setExpandedTaskId}
            />
            {Timer}
          </>
        );
      case "WEEK":
        // return <WeekPage board={board} />;
        return null;
      default:
        return <div className="text-center text-red-500">Unknown board type</div>;
    }
  };

  return (
    <div className="h-[calc(100vh-72px)] w-full mt-18 bg-gray-700">
      {!selectedBoardId && (
        <div className="flex items-center flex-col gap-20">
          <h1 className="mt-10 text-center text-3xl">Home Page</h1>
          <button
            type="button"
            onClick={() => setIsAddBoardOpen(true)}
            className="bg-gray-400 text-white py-2 px-4 rounded"
          >
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
