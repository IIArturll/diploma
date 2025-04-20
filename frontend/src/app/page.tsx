"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/header/Header"
import { useAuth } from "./features/useAuth";
import "./globals.css";

export default function WelcomePage() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard"); 
    }
  }, [isLoggedIn, isLoading]);

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        setSelectedBoardId={()=>{}}
      />
      <div>
        <h1 className="mt-40 text-center text-4xl">Welcome to multi-format task planning system with multi-user mode support</h1>
        <div className="mt-10 text-3xl  text-center">
          <h1>Formats:</h1>
          <li>List</li>
          <li>Kanban-board</li>
          <li>Week</li>
        </div>
      </div>
    </>
  );
}

