"use client";

import LabelledInput from "@/components/global/LabelledInput";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { TOKEN_KEY, useAuth } from "@/providers/ClientAuthProvider";
import httpClient from "@/services/httpClient";

import usePostToken from "@/services/identity/usePostToken";
import { useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = usePostToken({
    onError(e, variables, __) {
      toast({
        title: "Login failed",
        description: e.message,
        variant: "destructive",
      });
    },
    onSuccess(data) {
      toast({
        description: "Login success",
      });
      localStorage.setItem(TOKEN_KEY, data.result?.token);

      httpClient.defaults.headers.common["Authorization"] = `Bearer ${data.result?.token}`;

      const jwt = jwtDecode(data.result?.token);
      const role = (jwt as any).scope?.split("_")[1];

      console.log("Logging in as", role);
      queryClient.invalidateQueries();
      router.replace(`/${role}`);
    },
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    mutate({
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    });
  };
  return (
    <main className="flex h-screen flex-col items-center">
      <div className="h-1/4" />
      <div>
        <p className="mb-7 text-3xl">VOU - Management Center</p>
        <form onSubmit={handleLogin}>
          <LabelledInput label="Username" name="username" className="mb-2" />
          <LabelledInput label="Password" name="password" type="password" className="mb-3" />
          <Button className="w-full">Login</Button>
          <Button variant="link" asChild className="mt-2 px-0">
            <Link href="/register">Don&apos;t have an account?</Link>
          </Button>
        </form>
      </div>
    </main>
  );
}
