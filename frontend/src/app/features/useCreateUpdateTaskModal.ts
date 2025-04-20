import { useState } from "react";
import axios from "axios";
import { Tag } from "@/app/types/Tag";
import { Task } from "@/app/types/Task";
import { Board } from "@/app/types/Board";


export function useCreaeUpdateTaskModal(
  setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentTask:React.Dispatch<React.SetStateAction<Task|null>>,
  selectedBoardId:string,
  currentTask: Task | null,
  board: Board
) {
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState<"PENDING" | "RUNNING" | "COMPLETED">("PENDING")
    const [tags, setTags] = useState<Tag[]>([])
    
    const maxPositionY = board.tasks.length > 0
      ? Math.max(...board.tasks.map((task) => task.positionY ?? 0))
      : 0;
    const maxCompletedPosition = board.tasks
        .filter((task) => task.status === "COMPLETED")
        .reduce((max, task) => Math.max(max, task.positionY ?? 0), 0);
    
      const maxRunningPosition = board.tasks
        .filter((task) => task.status === "RUNNING")
        .reduce((max, task) => Math.max(max, task.positionY ?? 0), 0);
    
      const maxPendingPosition = board.tasks
        .filter((task) => task.status === "PENDING")
        .reduce((max, task) => Math.max(max, task.positionY ?? 0), 0);
    
    const createTask = async () => {
      if(!selectedBoardId) return;
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;  
      try {
        let positionY = 0;
        if (board.type === "KANBAN") {
          switch (status) {
            case "COMPLETED":
              positionY = maxCompletedPosition + 1;
              break;
            case "RUNNING":
              positionY = maxRunningPosition + 1;
              break;
            case "PENDING":
              positionY = maxPendingPosition + 1;
              break;
          }
        } else {
          positionY = maxPositionY + 1;
        }
        const response = await axios.put(`http://localhost:8080/api/board/${selectedBoardId}/add`,
          {
            description,
            status,
            positionY: positionY,
            tags
          }
          ,{
            headers: {
              Authorization: `Bearer ${accessToken}`,
          },
        }); 
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
      setDescription("")
      setStatus("PENDING")
      setTags([])
      setIsModalOpen(false)
    }

    const updateTask = async () => {
      //axios update
      if(!selectedBoardId || !currentTask ) return;
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;  
      console.log('access token: %s \nboard id: %s \ndescription: %s \n status: %s \ntags: %s',accessToken,selectedBoardId,status,tags);
      try {
        console.log({selectedBoardId})
        const response = await axios.put(`http://localhost:8080/api/board/update`,
          {
            id: selectedBoardId,
            tasks:[
              {
                id: currentTask.id,
                description,
                status,
                tags
              }
            ]
          }
          ,{
            headers: {
              Authorization: `Bearer ${accessToken}`,
          },
        }); 
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
      setDescription("")
      setStatus("PENDING")
      setTags([])
      setIsModalOpen(false);
      setCurrentTask(null);
    }

    const onCreateTaskButtonClicked = () =>{
      setIsModalOpen(true);
      setCurrentTask(null);
    }

    const onCancel = () => {
      setDescription("")
      setStatus("PENDING")
      setTags([])
      setIsModalOpen(false);
      setCurrentTask(null);
    }

    const onDelete = async () => {
      if(!selectedBoardId) return;
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;  
      try {
        const response = await axios.put(`http://localhost:8080/api/board/${selectedBoardId}/remove/${currentTask?.id}`,
          {}
          ,{
            headers: {
              Authorization: `Bearer ${accessToken}`,
          },
        }); 
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
      setCurrentTask(null)
      setDescription("")
      setStatus("PENDING")
      setTags([])
      setIsModalOpen(false);
    }

    return {
        onCreateTaskButtonClicked,
        description,
        setDescription,
        status,
        setStatus,
        tags,
        onCancel,
        onDelete,
        setTags,
        createTask,
        updateTask,
    };
}