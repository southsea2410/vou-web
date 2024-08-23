"use client";

import LabelledInput from "@/components/global/LabelledInput";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { TOKEN_KEY } from "@/providers/ClientAuthProvider";

import usePostToken from "@/services/identity/usePostToken";
import Link from "next/link";

export default function LoginPage() {
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
      window.location.href = "/";
    },
  });

  const handleLogin = (formData: FormData) => {
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
        <form action={handleLogin}>
          <LabelledInput label="Username" name="username" className="mb-2" />
          <LabelledInput label="Password" name="password" type="password" className="mb-3" />
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="link" asChild className="mt-2 px-0">
            <Link href="/register">Don&apos;t have an account?</Link>
          </Button>
        </form>
      </div>
    </main>
  );
}
