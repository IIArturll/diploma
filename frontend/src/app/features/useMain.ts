import React, { useState } from "react";
import { Board } from "../types/Board";
import axios from "axios";
import { isEqual } from "lodash";
import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { Task } from "../types/Task";

export function useMain(fetchBoards:()=>void,selectedBoardId:string) {
  const[board, setBoard] = useState<Board>()
  const[isModalOpen, setIsModalOpen] = useState(false);
  const[isBoardEditOpen,setIsBoardEditOpen] = useState(false);
  const[isIviteUserOpen,setIsInviteUserOpen] = useState(false);
  const[isKickUserOpen,setIsKickUserOpen] = useState(false);
  const[invitationCode, setInvitationCode] = useState("")
  const[isAddBoardOpen,setIsAddBoardOpen] = useState(false)
  const[currentTask, setCurrentTask] = useState<Task | null>(null);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  
  const fetchBoardById = async (selectedBoardId: string) => { 
    if(!selectedBoardId) return;
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;  
    try {
      const response = await axios.get(`http://localhost:8080/api/board/${selectedBoardId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
        },
      }); 
      const newBoard: Board = response.data;
     
      if (!isEqual(board, newBoard)) {
        console.log("Board обновлён:")
        setBoard(newBoard);
        console.log(newBoard);
      } else {
        console.log("Board не изменился — не обновляем.");
      }
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
  }

  const checkTypeOfBoard = (board: Board) => {
    if(!board) return null;
    return board.type;
  }

  const onRespondButtonClicked = async() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;
    if (!invitationCode) return;  
    try {
      const response = await axios.put(`http://localhost:8080/api/board/invite/respond`,
        null,
        {
          params:{
            code: invitationCode,
            accept: true
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
        },
      }); 
      fetchBoards()
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
    setInvitationCode("")
    onCancelRespondClicked()
  }

  const onCancelRespondClicked = () =>{ 
    setIsAddBoardOpen(false)
  }


  const onExecutorClick = async (task: Task) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return;
    }  
    try {
      console.log({selectedBoardId})
      const response = await axios.put(`http://localhost:8080/api/board/${selectedBoardId}/set/executor/${task.id}`,
        {}
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
    setCurrentTask(null)
  }

  const onRemoveClicked = async (task: Task) =>{
    console.log("deleteEx")
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return;
    }  
    try {
      console.log({selectedBoardId})
      const response = await axios.put(`http://localhost:8080/api/board/${selectedBoardId}/delete/executor/${task.id}`,
        {}
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
    setCurrentTask(null)
  }

  return {
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
  }
}