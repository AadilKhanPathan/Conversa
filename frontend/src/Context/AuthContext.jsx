
"use client";

import api from "@/lib/axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let active = true;
    let newSocket;

    async function checkAuth() {
      try {
        const { data } = await api.get("/auth/me");

        if (!data.success || !data.user) {
          router.replace("/login");
          return;
        }

        if (!active) return;

        setAuthUser(data.user);

        newSocket = io(
          process.env.NEXT_PUBLIC_SOCKET_URL,
          {
            withCredentials: true,
            query: {
              userId: data.user._id,
            },
          }
        );

        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (userIds) => {
          if (active) setOnlineUsers(userIds);
        });
      } catch (error) {
        console.error("Authentication failed:", error);

        if (active) {
          router.replace("/login");
        }
      }
    }

    checkAuth();

    return () => {
      active = false;
      newSocket?.disconnect();
    };
  }, [router]);

  const value = {
    authUser,
    setAuthUser,
    onlineUsers,
    socket,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
