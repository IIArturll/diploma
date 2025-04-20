import { useState } from "react";
import { useSensors, useSensor, PointerSensor, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import axios from "axios";
import { Task } from "@/app/types/Task";
import { Board } from "@/app/types/Board";

export function useWeek({
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
  const DAYS = [
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
    { label: "Sunday", value: 7 },
  ];
  const TOP_DAYS = DAYS.slice(0, 3); 
  const BOTTOM_DAYS = DAYS.slice(3); 

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    if (!over || active.id === over.id) return;
  
    const activeTask = board.tasks.find((t) => t.id === active.id);
    if (!activeTask) return;
  
    const overTask = board.tasks.find((t) => t.id === over.id);
    const newPositionY = overTask ? overTask.positionY : DAYS.find(day => day.label === over.id)?.value;
  
    if (newPositionY === undefined || activeTask.positionY === newPositionY) return;
  
    const updatedBoard = {
      ...board,
      tasks: board.tasks.map((task) =>
        task.id === activeTask.id
          ? { ...task, positionY: newPositionY }
          : task
      ),
    };
    
    setBoard(updatedBoard);
   
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      await axios.put(
        `http://localhost:8080/api/board/${selectedBoardId}/update/positions`,
        [
          {
            id: activeTask.id,
            status: activeTask.status,
            positionY: newPositionY
          }
        ]
        ,
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
    TOP_DAYS,
    BOTTOM_DAYS
  };
}
