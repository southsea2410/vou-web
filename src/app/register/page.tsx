"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCreateBrand, { CreateBrandRequest } from "@/services/brand/useCreateBrand";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import LabelledInput from "@/components/global/LabelledInput";
import useCreateAccount from "@/services/identity/useCreateAccount";
import { toast } from "@/components/ui/use-toast";
import usePostToken from "@/services/identity/usePostToken";
import httpClient from "@/services/httpClient";
import { TOKEN_KEY } from "@/providers/ClientAuthProvider";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accountId, setAccountId] = useState("");
  const [token, setToken] = useState("");

  const { mutate: createBasicBrand } = useCreateBrand({
    onSuccess(data, variables, context) {
      toast({
        title: "Brand created",
        description: "Your brand has been created successfully",
      });

      localStorage.setItem(TOKEN_KEY, token);

      window.location.href = "/brand/profile";
    },
  });

  const { mutate: postToken } = usePostToken({
    onSuccess(data, variables, context) {
      toast({
        title: "Token received",
        description: "Creating basic brand information...",
      });

      setToken(data.result?.token);

      httpClient.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${data.result.token}`;
        return config;
      });

      createBasicBrand({
        fullName: "",
        username,
        email: "",
        phone: "",
        brandName: "",
        field: "",
        latitude: 0,
        longitude: 0,
        status: true,
        address: "",
        accountId,
        role: "brand",
      });
    },
  });

  const { mutate: createAccount } = useCreateAccount({
    onSuccess(data, variables, context) {
      toast({
        title: "Account created",
        description: "\nGetting auth token...",
      });

      setAccountId(data.result?.id);

      postToken({ username, password });
    },
  });

  const handleSignup = (formData: FormData) => {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    setUsername(username);
    setPassword(password);
    createAccount({ username, password, roles: ["brand"] });
  };

  return (
    <Card className="mx-auto my-10 max-w-md">
      <CardHeader>
        <CardTitle>Signup VOU</CardTitle>
        <CardDescription>Register as a Brand</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSignup} id="brand-register-form">
          <LabelledInput label="Username" name="username" className="mb-2" />
          <LabelledInput label="Password" name="password" type="password" className="mb-3" />
        </form>
        {/* {step === 2 && (
          <Form {...createBrandForm}>
            <form onSubmit={handleSubmitBrandInfo} className="flex flex-col space-y-4">
              <Input {...createBrandForm.register("fullName")} placeholder="Full Name"></Input>
              <Input {...createBrandForm.register("username")} placeholder="Username"></Input>
              <Input
                type="email"
                {...createBrandForm.register("email")}
                placeholder="Email"
              ></Input>
              <Input {...createBrandForm.register("phone")} placeholder="Phone"></Input>
              <Input {...createBrandForm.register("brandName")} placeholder="Brand Name"></Input>
              <Input {...createBrandForm.register("field")} placeholder="Field"></Input>
              <Input {...createBrandForm.register("address")} placeholder="Address"></Input>
              <Input
                type="number"
                {...createBrandForm.register("latitude")}
                placeholder="Latitude"
              ></Input>
              <Input
                type="number"
                {...createBrandForm.register("longitude")}
                placeholder="Longitude"
              ></Input>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        )} */}
      </CardContent>

      <CardFooter>
        <Button type="submit" className="w-full" form="brand-register-form">
          Register
        </Button>
      </CardFooter>
    </Card>
  );
}
