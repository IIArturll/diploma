import React, { useState } from "react";
import { Board } from "@/app/types/Board";
import ListTask from "./ListTask";
import { useCreaeUpdateTaskModal } from "@/app/features/useCreateUpdateTaskModal";
import CreateUpdateTaskModal from "@/app/components/main/CreateUpdateTaskModal";
import { useList } from "@/app/features/useList";
import { Task } from "@/app/types/Task";
import { useBoardSettings } from "@/app/features/useBoardSettings";
import EditBaseInformationModal from "@/app/components/main/EditBaseInformationModal";
import InviteModal from "@/app/components/main/InviteModal";
import KickModal from "@/app/components/main/KickModal";

type ListProps = {
  board: Board;
  selectedBoardId: string;
  fetchBoardById: (selectedBoardId:string) => void;
  isSelected: boolean;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isBoardEditOpen: boolean,
  setIsBoardEditOpen: React.Dispatch<React.SetStateAction<boolean>>
  isInviteUserOpen: boolean,
  setIsInviteUserOpen: React.Dispatch<React.SetStateAction<boolean>>
  isKickUserOpen: boolean,
  setIsKickUserOpen: React.Dispatch<React.SetStateAction<boolean>>
  onTimerClicked: ()=>void;
  currentTask: Task | null,
  setCurrentTask: React.Dispatch<React.SetStateAction<Task | null>>
};

export default function ListPage({ 
  board, 
  selectedBoardId, 
  fetchBoardById, 
  isSelected,  
  isModalOpen, 
  setIsModalOpen,
  isBoardEditOpen,
  setIsBoardEditOpen,
  isInviteUserOpen,
  setIsInviteUserOpen,
  isKickUserOpen,
  setIsKickUserOpen,
  onTimerClicked,
  currentTask,
  setCurrentTask
}: ListProps) {

  
  const maxPositionY = board.tasks.length > 0
  ? Math.max(...board.tasks.map((task) => task.positionY ?? 0))
  : 0;

  const {
    onCreateTaskButtonClicked,
    description,
    setDescription,
    status,
    setStatus,
    tags,
    setTags,
    onCancel,
    onDelete,
    createTask,
    updateTask,
  } = useCreaeUpdateTaskModal(setIsModalOpen, setCurrentTask, selectedBoardId, maxPositionY, currentTask);

  const { 
    items, 
    taskMap,
    handleDragEnd,
    onExecutorClick,
    onRemoveClicked,
  } = useList(board.tasks,currentTask,selectedBoardId, setCurrentTask, fetchBoardById);

  const {
    boardName,
    setBoardName,
    boardDescription,
    setBoardDescription,
    invitedUserEmail,
    setInvitedUserEmail,
    kickedUserEmail,
    setKickedUserEmail,
    onEditBaseInformationClicked,
    onEditBaseInformationButtonClicked,
    onInviteButtonClicked,
    onKickButtonClicked,
    onCancelClicked,
    onDeleteClicled,
  } = useBoardSettings(selectedBoardId,board,setIsBoardEditOpen,setIsInviteUserOpen,setIsKickUserOpen,fetchBoardById);

  if(!isSelected) return null;
  
  return (
    <div className="">
      {board ? (
        <div className="text-2xl mt-7 ml-4 mr-4 flex justify-between items-center sticky">
          <div>{`${board.name}: ${board.description}`}</div>
          <div className="flex space-x-2">
            <button
              onClick={onEditBaseInformationClicked}
              className="bg-gray-400 text-xl text-white py-1 px-1 rounded"
            >
              Edit Board Info
            </button>
            <button
              onClick={()=>setIsInviteUserOpen(true)}
              className="bg-gray-400 text-xl text-white py-1 px-1 rounded"
            >
              Invite User
            </button>
            <button
              onClick={()=>setIsKickUserOpen(true)}
              className="bg-gray-400 text-xl text-white py-1 px-1 rounded"
            >
              Kick User
            </button>
            <button
              onClick={onCreateTaskButtonClicked}
              className="bg-gray-400 text-xl text-white py-1 px-1 rounded"
            >
              Create Task
            </button>
          {isBoardEditOpen && (
            <EditBaseInformationModal
              boardName={boardName}
              setBoardName={setBoardName}
              boardDescription={boardDescription}
              setBoardDescription={setBoardDescription}
              onCancelClicked={onCancelClicked}
              onEditBaseInformationButtonClicked={onEditBaseInformationButtonClicked}
              onDeleteClicled={onDeleteClicled}
            />
          )}
          {isInviteUserOpen && (
            <InviteModal
              invitedUserEmail={invitedUserEmail}
              setInvitedUserEmail={setInvitedUserEmail}
              onCancelClicled={onCancelClicked}
              onInviteButtonClicked={onInviteButtonClicked}
            />
          )}
          {isKickUserOpen && (
            <KickModal
              kickedUserEmail={kickedUserEmail}
              setKickedUserEmail={setKickedUserEmail}
              onCancelClicled={onCancelClicked}
              onKickButtonClicked={onKickButtonClicked}
            />
          )}

          </div>
        </div>
        
      ) : null}

      <CreateUpdateTaskModal
        isCreateTaskButtonCliked={isModalOpen}
        description={description}
        setDescription={setDescription}
        status={status}
        setStatus={setStatus}
        tags={tags}
        setTags={setTags}
        createTask={createTask}
        updateTask={updateTask}
        onCancel={onCancel}
        onDelete={onDelete}
        task={currentTask}
        board={board}
      />

      {board ? 
        <ListTask 
          items={items}
          taskMap={taskMap}
          handleDragEnd={handleDragEnd}
          setCurrentTask={setCurrentTask}
          setIsModalOpen={setIsModalOpen}
          onExecutorClick={onExecutorClick}
          onRemoveClicked={onRemoveClicked}
          onTimerClicked={onTimerClicked}
        /> : null}
    </div>
  );
}
