import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export function useUserProfile() {
  const [isEditing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      try {
        const response = await axios.get("http://localhost:8080/api/user/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { username, email } = response.data;
        setName(username);
        setEmail(email);
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

    fetchUserData();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleLogout =() => {
    localStorage.clear();
    router.push("/")
  }

  const handleCancel =() => {
    setEditing(false);
  }

  const handleClose =() => {
    router.push("/dashboard")
  }

  const handleEdit = () => setEditing(true);

  const handleSave = () => {
    console.log("Saving:", { name, password });
    setPassword("");
    setEditing(false);
  };

  return {
    isEditing,
    name,
    newName,
    setNewName,
    email,
    password,
    setPassword,
    preview,
    fileInputRef,
    handleImageChange,
    handleEdit,
    handleSave,
    handleLogout,
    handleCancel,
    handleClose,
  };
}
