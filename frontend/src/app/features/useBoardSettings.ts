import React, { useState } from "react";
import { Board } from "../types/Board";
import axios from "axios";


export const useBoardSettings = (
    selectedBoardId: string,  
    board: Board,
    setIsBoardEditOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setIsInviteUserOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setIsKickUserOpen:  React.Dispatch<React.SetStateAction<boolean>>,
    fetchBoardById: (selectedBoardId:string) => void,
) => {
    const[boardName,setBoardName] = useState("");
    const[boardDescription,setBoardDescription] = useState("");
    const[invitedUserEmail,setInvitedUserEmail] = useState("");
    const[kickedUserEmail,setKickedUserEmail] = useState("");
    const[isMenuOpen, setIsMenuOpen] = useState(false)

    const onEditBaseInformationClicked = () =>{
        setBoardName(board.name);
        setBoardDescription(board.description);
        setIsBoardEditOpen(true);
    }

    const onEditBaseInformationButtonClicked = async () =>{
        if(!selectedBoardId ) return;
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) return;  
        try {
          const response = await axios.put(`http://localhost:8080/api/board/update`,
            {
              id: selectedBoardId,
              name: boardName,
              description: boardDescription
            }
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
        onCancelClicked()     
    }

    const onInviteButtonClicked = async () => {
        if(!selectedBoardId ) return;
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) return;  
        try {
          const response = await axios.post(`http://localhost:8080/api/board/invite`,
            null,
            {
                params: {
                    board: selectedBoardId,
                    email: invitedUserEmail,
                },
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
        onCancelClicked() 
    }

    const onKickButtonClicked = async () => {
        if(!selectedBoardId ) return;
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) return;  
        try {
          const response = await axios.delete(`http://localhost:8080/api/board/kick`,
            {
                params: {
                    board: selectedBoardId,
                    email: kickedUserEmail,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
            }
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
        onCancelClicked() 
    }

    const onMenuSettingsClick = () => {
        setIsMenuOpen((prev) => !prev);
    }

    const onCancelClicked = () => {
        setBoardName("");
        setBoardDescription("")
        setInvitedUserEmail("")
        setKickedUserEmail("")
        setIsBoardEditOpen(false);
        setIsInviteUserOpen(false);
        setIsKickUserOpen(false);
    }

    const onDeleteClicled = async () => {
        if(!selectedBoardId ) return;
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) return;  
        try {
          const response = await axios.delete(`http://localhost:8080/api/board/${selectedBoardId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
            }
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
        onCancelClicked() 
    }

    return{
        boardName,
        setBoardName,
        boardDescription,
        setBoardDescription,
        invitedUserEmail,
        setInvitedUserEmail,
        kickedUserEmail,
        setKickedUserEmail,
        onEditBaseInformationClicked,
        onEditBaseInformationButtonClicked,
        onInviteButtonClicked,
        onKickButtonClicked,
        onCancelClicked,
        onDeleteClicled,
        isMenuOpen,
        onMenuSettingsClick
    };
}