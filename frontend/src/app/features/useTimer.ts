import { useEffect, useState, useRef } from "react";
import { Task } from "../types/Task";
import axios from "axios";


export function useTimer(initialMinutes: number = 1, selectedBoardId: string, currentTask: Task | null, fetchBoardById: (boardId: string) => void) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(0);

  const totalSeconds = minutes * 60;
  const secondsLeft = totalSeconds - secondsElapsed;
  const progress = Math.min(1, secondsElapsed / totalSeconds);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const soundRef = useRef<HTMLAudioElement | null>(null);

  const start = () => setIsRunning(true);
  
  const pause = () => {
    setIsRunning(false);
  }

  const reset = () => {
    setTotalSecondsLeft(prev => prev + secondsElapsed);
    setSecondsElapsed(0);
    setIsRunning(false);
  };

  const playSound = () => {
    if (soundRef.current) {
      soundRef.current.play();
    }
  };

  const onCloseTimer = async () => {
    const finalTotalSeconds = totalSecondsLeft + secondsElapsed;
    console.log("Final totalSeconds:", finalTotalSeconds);
    
    if (finalTotalSeconds === 0) {
      setIsRunning(false);
      setIsTimerOpen(false);
      setSecondsElapsed(0);
      return;
    }

    if (!selectedBoardId || !currentTask) return;
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    try {
      await axios.put(`http://localhost:8080/api/board/add/execute/time`,
        null,
        {
          params: {
            board: selectedBoardId,
            task: currentTask.id,
            seconds: finalTotalSeconds
          },
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

    setIsTimerOpen(false);
    setIsRunning(false);
    setSecondsElapsed(0);
    setTotalSecondsLeft(0);
  };

  useEffect(() => {
    if (isRunning && secondsElapsed < totalSeconds) {
      intervalRef.current = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }

    if (isRunning && secondsElapsed >= totalSeconds) {
      setIsRunning(false);
      playSound();
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, secondsElapsed, totalSeconds]);

  // Инициализация звука
  useEffect(() => {
    soundRef.current = new Audio("https://www.soundjay.com/buttons/sounds/beep-06.mp3");
  }, []);

  return {
    minutes,
    setMinutes,
    secondsElapsed,
    secondsLeft,
    isRunning,
    start,
    pause,
    reset,
    progress,
    isTimerOpen,
    setIsTimerOpen,
    onCloseTimer
  };
}
