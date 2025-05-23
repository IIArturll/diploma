"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { BoardCreate } from "../types/BoardCreate";

const filterBoards = (boards: BoardCreate[], searchTerm: string): BoardCreate[] => {
  return boards.filter((board) =>
    board.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export function useBoards(searchTerm: string = "") {
  const [boards, setBoards] = useState<BoardCreate[]>([]);
  const [filteredBoards, setFilteredBoards] = useState<BoardCreate[]>([]);

  const fetchBoards = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.warn("Access token not found");
        return;
      }

      const response = await axios.get("http://localhost:8080/api/board", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data: BoardCreate[] = response.data;
      setBoards(data);
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

  useEffect(() => {
    fetchBoards(); 

    const interval = setInterval(() => {
      fetchBoards();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setFilteredBoards(filterBoards(boards, searchTerm));
  }, [boards, searchTerm]);

  return {
    boards: filteredBoards,
    setBoards,
    fetchBoards,
  };
}
