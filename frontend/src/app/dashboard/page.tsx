"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../features/useAuth";
import Header from "../components/header/Header"
import SideBar from "../components/sideBar/SideBar";
import Main from "../components/main/Main";
import "../globals.css";

export default function Dashboard() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if(!isLoggedIn && !isLoading){
      router.push("/")
    }
  }, [isLoggedIn, isLoading]);
  
  return (
    <div className="flex">
      <Header isLoggedIn/>
      <SideBar/>
      <Main/>
    </div>
  );
}

