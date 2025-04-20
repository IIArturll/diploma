import { useState } from "react";
import { useSensors, useSensor, PointerSensor, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import axios from "axios";
import { Task } from "@/app/types/Task";
import { Board } from "@/app/types/Board";

export function useKanban({
  board,
  setBoard,
  selectedBoardId,
  fetchBoardById,
}: {
  board: Board;
  setBoard: (board: Board) => void;
  selectedBoardId: string;
  fetchBoardById: (boardId: string) => void;
}) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    if (!over || active.id === over.id) return;

    const activeTask = board.tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const updatedTasks = [...board.tasks];
    let changedTasks: { id: string; positionY: number; status: Task["status"] }[] = [];

    const isOverTask = updatedTasks.some((t) => t.id === over.id);
    const overTask = updatedTasks.find((t) => t.id === over.id);

    if (isOverTask && overTask) {
      const sameColumn = activeTask.status === overTask.status;

      if (sameColumn) {
        const columnTasks = updatedTasks
          .filter((t) => t.status === activeTask.status)
          .sort((a, b) => a.positionY - b.positionY);

        const ids = columnTasks.map((t) => t.id);
        const moved = arrayMove(ids, ids.indexOf(String(active.id)), ids.indexOf(String(over.id)));

        changedTasks = moved.map((id, index) => ({
          id,
          positionY: index,
          status: activeTask.status,
        }));
      } else {
        const fromTasks = updatedTasks
          .filter((t) => t.status === activeTask.status && t.id !== activeTask.id)
          .sort((a, b) => a.positionY - b.positionY);

        const toTasks = updatedTasks
          .filter((t) => t.status === overTask.status)
          .sort((a, b) => a.positionY - b.positionY);

        changedTasks = [
          ...fromTasks.map((task, index) => ({
            id: task.id,
            positionY: index,
            status: task.status,
          })),
          ...toTasks.map((task, index) => ({
            id: task.id,
            positionY: index,
            status: task.status,
          })),
          {
            id: activeTask.id,
            positionY: toTasks.length,
            status: overTask.status,
          },
        ];
      }
    } else {
      const newStatus = over.id as Task["status"];
      const fromTasks = updatedTasks
        .filter((t) => t.status === activeTask.status && t.id !== activeTask.id)
        .sort((a, b) => a.positionY - b.positionY);

      changedTasks = [
        ...fromTasks.map((task, index) => ({
          id: task.id,
          positionY: index,
          status: task.status,
        })),
        {
          id: activeTask.id,
          positionY: 0,
          status: newStatus,
        },
      ];
    }

    const newTasks = board.tasks.map((task) => {
      const changed = changedTasks.find((t) => t.id === task.id);
      return changed ? { ...task, ...changed } : task;
    });

    setBoard({ ...board, tasks: newTasks });

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      await axios.put(
        `http://localhost:8080/api/board/${selectedBoardId}/update/positions`,
        changedTasks,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      fetchBoardById(selectedBoardId);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Server responded with status:", error.response.status);
          console.error("Response data:", error.response.data);
        } else if (error.request) {
          console.error("No response received from the server");
        } else {
          console.error("Error setting up the request:", error.message);
        }
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  return {
    sensors,
    activeTask,
    setActiveTask,
    handleDragEnd,
  };
}
