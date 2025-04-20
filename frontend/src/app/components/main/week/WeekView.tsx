import {
  DndContext,
  closestCorners,
  DragOverlay,
} from "@dnd-kit/core";
import { Task } from "@/app/types/Task";
import { KanbanItem } from "../kanban/KanbanItem";
import { Board } from "@/app/types/Board";
import { WeekColumn } from "./WeekColumn";
import { useWeek } from "@/app/features/useWeek";
import { WeekItem } from "./WeekItem";

export default function WeekView({
  board,
  setBoard,
  selectedBoardId,
  fetchBoardById,
  setCurrentTask,
  setIsModalOpen,
  onExecutorClick,
  onRemoveClicked,
  onTimerClicked,
  expandedTaskId,
  setExpandedTaskId,
}: {
  board: Board;
  setBoard: (board: Board) => void;
  selectedBoardId: string;
  fetchBoardById: (boardId: string) => void;
  setCurrentTask: React.Dispatch<React.SetStateAction<Task | null>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onExecutorClick: (task: Task) => void;
  onRemoveClicked: (task: Task) => void;
  onTimerClicked: () => void;
  expandedTaskId: string | null;
  setExpandedTaskId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const {
    sensors,
    activeTask,
    setActiveTask,
    handleDragEnd,
    TOP_DAYS,
    BOTTOM_DAYS
  } = useWeek({ board, setBoard, fetchBoardById, selectedBoardId });
  
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragStart={(event) => {
        const task = board.tasks.find((t) => t.id === event.active.id);
        if (task) setActiveTask(task);
      }}
    >
      <div className="grid grid-cols-3 gap-1 p-4">
        {TOP_DAYS.map((day) => (
          <WeekColumn
            title={day.label}
            key={day.value}
            tasks={board.tasks.filter((task) => task.positionY === day.value)}
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
  
      <div className="grid grid-cols-4 gap-1 p-4">
        {BOTTOM_DAYS.map((day) => (
          <WeekColumn
            title={day.label}
            key={day.value}
            tasks={board.tasks.filter((task) => task.positionY === day.value)}
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
          <WeekItem
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
