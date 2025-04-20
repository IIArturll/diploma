"use client";
import { useEffect, useMemo, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { Task } from "@/app/types/Task";
import { DragEndEvent } from "@dnd-kit/core";
import axios from "axios";


export const useList = (
  tasks: Task[],
  currentTask:Task|null,
  selectedBoardId:string,  
  setCurrentTask:React.Dispatch<React.SetStateAction<Task|null>>,
  fetchBoardById: (selectedBoardId: string)=>void
  
) => {
  const sortedTasks = useMemo(() => [...tasks].sort((a, b) => a.positionY - b.positionY), [tasks]);

  const [items, setItems] = useState<string[]>([]);
  const [taskMap, setTaskMap] = useState<Record<string, Task>>({});

  useEffect(() => {
    setItems(sortedTasks.map((t) => t.id));
    setTaskMap(Object.fromEntries(sortedTasks.map((t) => [t.id, t])));
  }, [sortedTasks]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.indexOf(String(active.id));
    const newIndex = items.indexOf(String(over.id));
    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);

    const updatedTasks = newItems.map((id, index) => {
      const task = taskMap[id];
      return {
        id: task.id,
        positionY: index,
        status: task.status,
      };
    });

    console.log("Изменённые задачи:", updatedTasks);
    
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) { return }  
    try {
      console.log({selectedBoardId})
      const response = await axios.put(`http://localhost:8080/api/board/${selectedBoardId}/update/positions`,
        updatedTasks
        ,{
          headers: {
            Authorization: `Bearer ${accessToken}`,
        },
      }); 
      fetchBoardById(selectedBoardId)
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
    items,
    taskMap,
    handleDragEnd,
  };
};
