"use client";

import LabelledInput from "@/components/global/LabelledInput";
import { Button } from "@/components/ui/button";

import { useLogin } from "../../services/login/useLogin";

export default function LoginPage() {
  const { mutate } = useLogin({
    onError(_, variables, __) {
      alert("Đăng nhập thất bại, username:" + variables.email + " password:" + variables.password);
    },
  });

  const handleLogin = (formData: FormData) => {
    mutate({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
  };
  return (
    <main className="flex h-screen flex-col items-center">
      <div className="h-1/4" />
      <p className="mb-5 text-3xl">VOU - Login page</p>
      <form action={handleLogin}>
        <LabelledInput label="Email" name="email" type="email" className="mb-2" />
        <LabelledInput label="Mật khẩu" name="password" type="password" className="mb-3" />
        <Button type="submit" className="w-full">
          Đăng nhập
        </Button>
      </form>
    </main>
  );
}
