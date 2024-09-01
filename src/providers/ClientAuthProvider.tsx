"use client";

import { toast } from "@/components/ui/use-toast";
import httpClient from "@/services/httpClient";
import useGetMyInfo from "@/services/identity/useGetMyInfo";
import { usePathname } from "next/navigation";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  accountId: string;
  logout: () => void;
};

export const TOKEN_KEY = "vou_token";

const publicRoutes = ["/", "/register"];

const defaultAuth: AuthContextType = {
  isAuthenticated: false,
  accountId: "",
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuth);

export default function ClientAuthProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    console.log("[Frontend] ClientAuthProvider mounted");
  }, []);

  const pathName = usePathname();
  const isPublicRoute = publicRoutes.includes(pathName);

  const [token, setToken] = useState<string | null>(null);

  const [auth, setAuth] = useState<AuthContextType>(defaultAuth);

  const callWarning = useCallback(() => {
    toast({
      title: "Session timeout",
      description: "You must login again",
      variant: "destructive",
    });

    if (!isPublicRoute) location.href = "/";
  }, [isPublicRoute]);

  // Response interceptor
  useEffect(() => {
    httpClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem(TOKEN_KEY);
          callWarning();
        }
        return Promise.reject(error);
      },
    );
  }, [callWarning]);

  // Request interceptor
  useEffect(() => {
    if (window) {
      const localToken = localStorage.getItem(TOKEN_KEY);

      if (localToken) {
        setToken(localToken);

        httpClient.defaults.headers.common["Authorization"] = `Bearer ${localToken}`;
      }
    }
  }, [setToken, callWarning]);

  const { data: accountInfo, isSuccess: isAccountSuccess } = useGetMyInfo({
    enabled: !!token,
  });

  useEffect(() => {
    if (isAccountSuccess && accountInfo) {
      console.log("[Frontend] Account info", accountInfo);

      setAuth({
        isAuthenticated: true,
        accountId: accountInfo?.id,
        logout: () => {
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
          location.href = "/";
        },
      });
    }
  }, [isAccountSuccess, accountInfo]);

  // Must stay behind all React hooks
  if (auth.isAuthenticated || isPublicRoute)
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
  else return <main className="h-screen"></main>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
