"use client"
import Image from "next/image";
import Globe from "../../favicon.ico";
import User from "../../user.png"
import AuthModals from "./AuthModals";
import { useRouter } from "next/navigation";
import { useAuth } from "../../features/useAuth"

type HeaderProps = {
  isLoggedIn: boolean;
};

export default function Header({ isLoggedIn }: HeaderProps) {
  const router = useRouter();

  const handleUserClick = () => {
    router.push("/account");
  };
  
  const handleLogoClick = () => {
    router.push("/dashboard");
  };

  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-between fixed top-0 left-0 w-full z-10">
      {isLoggedIn ? (
        <Image src={Globe} alt="Logo" width={40} height={40} onClick={handleLogoClick}/>
      ) : (
        <Image src={Globe} alt="Logo" width={40} height={40} />
      )}

      <div className="flex-grow text-center text-xl font-semibold">
        TASK PLANNING SYSTEM
      </div>

      {isLoggedIn ? (
        <Image src={User} alt="user" width={40} height={40} onClick={handleUserClick} />
      ) : (
        <AuthModals />
      )}
    </header>
  );
}