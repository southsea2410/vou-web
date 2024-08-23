"use client";

import { toast } from "@/components/ui/use-toast";
import httpClient from "@/services/httpClient";
import useGetAccountInfo from "@/services/identity/useAccountInfo";
import { jwtDecode } from "jwt-decode";
import { redirect, usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  logout: () => void;
};

export const TOKEN_KEY = "vou_token";

const publicRoutes = ["/", "/register"];

const defaultAuth: AuthContextType = {
  isAuthenticated: false,
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuth);

export default function ClientAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) setToken(token);
  }, []);

  const pathName = usePathname();
  const isPublicRoute = publicRoutes.includes(pathName);
  const router = useRouter();

  const handleNoToken = useCallback(() => {
    console.error("[Frontend] Token error");
    toast({
      title: "Token error",
      description: "You must login again",
      variant: "destructive",
    });
    if (!isPublicRoute) router.replace("/");
  }, [router, isPublicRoute]);

  useEffect(() => {
    console.log("[Frontend] AuthProvider mounted");
    if (!token) handleNoToken();
    else {
      console.log("[Frontend] Seting token to interceptor");
      httpClient.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
    }
  }, [token, handleNoToken]);

  const { data: accountInfo, isSuccess: isAccountSuccess } = useGetAccountInfo({
    enabled: !!token,
  });

  useEffect(() => {
    if (!isAccountSuccess) return;
    try {
      const role = accountInfo.result.roles[0].name;
      console.log("Logged in as ", role);
      router.replace("/" + role);
    } catch (e) {
      console.error("Error getting role", e);
    }
  }, [isAccountSuccess, accountInfo, token, handleNoToken, router]);

  const currentAuth = useMemo<AuthContextType>(() => {
    if (!token) return defaultAuth;

    return {
      isAuthenticated: !!token,
      sub: "",
      scope: "brand",
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
