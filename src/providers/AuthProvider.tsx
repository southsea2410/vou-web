"use client";

import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useMemo } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  logout: () => void;
} & JWT_Payload;

type JWT_Payload = {
  id: string;
  role: "admin" | "brand";
};

const TOKEN_KEY = "vou_token";

const defaultAuth: AuthContextType = {
  isAuthenticated: false,
  id: "",
  role: "brand",
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuth);

export default function AuthProvider({ children }: { children: ReactNode }) {
  if (typeof window === "undefined") return;

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith(TOKEN_KEY))
    ?.split("=")[1];

  const handleNoToken = () => {
    console.error("Error token");
  };

  useEffect(() => {
    if (!token) handleNoToken();
  }, []);

  const currentAuth = useMemo(() => {
    if (!token) return defaultAuth;
    const decoded = jwtDecode<JWT_Payload>(token as string);
    if (!decoded?.id) handleNoToken();

    return {
      isAuthenticated: !!token,
      id: decoded.id,
      role: decoded.role,
      logout: () => {
        localStorage.removeItem(TOKEN_KEY);
      },
    };
  }, [token]);

  return <AuthContext.Provider value={currentAuth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
