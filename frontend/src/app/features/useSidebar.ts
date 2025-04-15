import { use, useState } from "react";
import { BoardCreate } from "../types/BoardCreate";
import { Board } from "../types/Board"
import { useBoards } from "./useBoardList";
import axios from "axios";

export function useSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedBoardId,setSelectedBoardId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { boards, setBoards, fetchBoards } = useBoards(searchTerm);
  const [fullBoard, setFullBoard] = useState<Board|null>(null)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);  
  };

  const handleDeleteBoard = async (id: string) => {
    console.log('id', id)
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;  
    try {
      const response = await axios.delete(`http://localhost:8080/api/board/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
         }
        }
      );
      await fetchBoards();
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

  const handleEditBoard = async (id: string) => {
    const newName = prompt("Enter new board name:");
    if (newName) {
      
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;  
      try {
        const response = await axios.put("http://localhost:8080/api/board/update",
          {
            id,
            name: newName
          }
          ,{
            headers: {
              Authorization: `Bearer ${accessToken}`,
          },
        });
        await fetchBoards();  
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
  };

  const createBoard = async (newBoard: BoardCreate) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;  
    try {
      const response = await axios.post("http://localhost:8080/api/board",
        {
          name: newBoard.name,
          description: newBoard.description,
          type: newBoard.type
        }
        ,{
          headers: {
            Authorization: `Bearer ${accessToken}`,
        },
      });
      await fetchBoards();    
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

  const handleBoardClicked= async(id: string) => {
    if(!selectedBoardId) {
      setSelectedBoardId(id);
      const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;  
    try {
      const response = await axios.get(`http://localhost:8080/api/board/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
        },
      });
      const data: Board = response.data;
      console.log(data);
      setFullBoard(data);   
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
    } else {
      setSelectedBoardId("")
    }
  }

  return {
    isCollapsed,
    selectedBoardId,
    handleBoardClicked,
    toggleSidebar,
    searchTerm,
    handleSearch,
    boards,
    handleDeleteBoard,
    handleEditBoard,
    createBoard,
  };
}
