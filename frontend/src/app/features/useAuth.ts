"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (accessToken && isTokenValid(accessToken)) {
        setIsLoggedIn(true);
      } else if (refreshToken) {
        await refreshTokens(refreshToken);
      } else {
        setIsLoggedIn(false);
      }
      console.log("токен проверен")
      setIsLoading(false);
    };

    checkAuth();

    const interval = setInterval(checkAuth, 60 * 1000); 

    return () => clearInterval(interval);
  }, []);

  async function refreshTokens(refreshToken: string) {
    try {
      const response = await axios.post("http://localhost:8080/api/user/refresh", null, {
        params: { refreshToken },
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      console.log("удалось обновить токены!");
      setIsLoggedIn(true);
    } catch (error: any) {
      console.log("Не удалось обновить токены:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
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

  function isTokenValid(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (e) {
      return false;
    }
  }

  return { isLoggedIn, isLoading };
}
