import { useEffect, useState } from "react";
import {
  DndContext,
  closestCorners,
  DragOverlay,
} from "@dnd-kit/core";
import { Task } from "@/app/types/Task";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanItem } from "./KanbanItem";
import { useKanban } from "@/app/features/useKanban";
import { Board } from "@/app/types/Board";

const STATUSES: Task["status"][] = ["PENDING", "RUNNING", "COMPLETED"];

export default function KanbanBoard(
{
  board,
  setBoard,
  fetchBoardById,
  selectedBoardId,
  setCurrentTask,
  setIsModalOpen,
  onExecutorClick,
  onRemoveClicked,
  onTimerClicked,
  expandedTaskId,
  setExpandedTaskId
}:{
  board: Board,
  setBoard: (board:Board)=>void,
  selectedBoardId: string, 
  fetchBoardById:(boardId:string)=>void
  setCurrentTask: React.Dispatch<React.SetStateAction<Task | null>>
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onExecutorClick: (task: Task) => void
  onRemoveClicked:  (task: Task) => void
  onTimerClicked: ()=>void
  expandedTaskId: string | null;
  setExpandedTaskId: React.Dispatch<React.SetStateAction<string | null>>
}) {
  
  const {
    sensors,
    activeTask,
    setActiveTask,
    handleDragEnd,
  } = useKanban({board,setBoard,fetchBoardById,selectedBoardId});

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCorners} 
      onDragEnd={handleDragEnd} 
      onDragStart={(event) => {
        const task = board.tasks.find(t => t.id === event.active.id);
        if (task) setActiveTask(task);
      }}
    >
      <div className="ml-4 mr-4 flex gap-9 p-4">
        {STATUSES.map((status) => (
          <KanbanColumn
            title={status}
            key={status}
            tasks={board.tasks
              .filter((task) => task.status === status)
              .sort((a, b) => a.positionY - b.positionY)}
            setCurrentTask={setCurrentTask} 
            setIsModalOpen={setIsModalOpen} 
            onExecutorClick={onExecutorClick} 
            onRemoveClicked={onRemoveClicked}
            onTimerClicked={onTimerClicked}
            expandedTaskId={expandedTaskId}
            setExpandedTaskId={setExpandedTaskId}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask && (
          <KanbanItem 
            task={activeTask} 
            setCurrentTask={setCurrentTask} 
            setIsModalOpen={setIsModalOpen} 
            onExecutorClick={onExecutorClick} 
            onRemoveClicked={onRemoveClicked}
            onTimerClicked={onTimerClicked}
            expandedTaskId={expandedTaskId}
            setExpandedTaskId={setExpandedTaskId}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}


