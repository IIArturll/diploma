"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../globals.css"; 
import SearchInput from "./SearchInput";
import BoardCreateButton from "./BoardCreateButton";
import BoardList from "./BoardList";
import { useSidebar } from "../../features/useSidebar";  
import { BoardCreate } from "@/app/types/BoardCreate";
import { Board } from "@/app/types/Board";

type SideBarProps = {
  isCollapsed: boolean;
  selectedBoardId: string;
  handleBoardClicked: (id: string) => void;
  toggleSidebar: () => void;
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  boards: BoardCreate[];
  handleDeleteBoard: (id: string) => void;
  handleEditBoard: (id: string) => void;
  createBoard: (newBoard: BoardCreate) => void;
}

export default function Sidebar({
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
}:SideBarProps) {
  
  return (
    <aside className={`h-[calc(100vh-72px)] mt-18 bg-gray-800 p-4 transition-all duration-300 ${isCollapsed ? "w-16" : "w-1/5"}`}>

      <div className="flex justify-between items-center sticky bg-gray-800 z-10">
        {!isCollapsed && (
          <SearchInput searchTerm={searchTerm} onSearchChange={handleSearch} />
        )}
        <button onClick={toggleSidebar} className="bg-gray-500 p-2 rounded-full hover:bg-gray-300">
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="mt-5 overflow-y-auto h-[calc(100vh-150px)] scrollbar-hidden">
        {!isCollapsed && (
          <>
            <BoardCreateButton onCreateBoard={createBoard} />
            <BoardList
              boards={boards}
              selectedBoardId={selectedBoardId}
              onDeleteBoard={handleDeleteBoard}
              handleBoardClicked={handleBoardClicked}
              onEditBoard={handleEditBoard}
            />
          </>
        )}
      </div>
    </aside>
  );
}
