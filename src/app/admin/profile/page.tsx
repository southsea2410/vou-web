"use client";

import useGetMyInfo from "@/services/identity/useGetMyInfo";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import LabelledInput from "@/components/global/LabelledInput";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/providers/ClientAuthProvider";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminNavbar from "../_components/AdminNavbar";
import { GeneralProfileType } from "@/services/types";
import useUpdateAdminProfile, {
  UpdateAdminProfileRequest,
} from "@/services/admin/useUpdateAdminProfile";

export default function AdminProfilePage() {
  const { isAuthenticated } = useAuth();

  const { data: account, isSuccess: isAccountInfoSuccess } = useGetMyInfo({
    enabled: isAuthenticated,
  });
  const accountId = account?.id;

  const f = useForm<UpdateAdminProfileRequest["profile"]>();

  useEffect(() => {
    isAccountInfoSuccess && f.reset();
  }, [isAccountInfoSuccess, f, account]);

  const { mutate: updateProfile } = useUpdateAdminProfile({
    onSuccess(data, variables, context) {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    },
    onError(err, variables, context) {
      toast({
        title: "Profile update failed",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const handleUpdateProfile = f.handleSubmit((data) => {
    if (accountId) data.accountId = accountId;
    else console.warn("[Profile] No accountId to update profile");

    data.role = "admin";
    data.status = true;
    updateProfile({ profile: data, profileId: data.id });
  });

  return (
    <div className="min-h-screen">
      <AdminNavbar />
      <div className="flex h-full items-center justify-center bg-background p-4">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...f}>
              <form className="space-y-4" onSubmit={handleUpdateProfile}>
                <LabelledInput type="text" label="Full Name" {...f.register("fullName")} />
                <LabelledInput type="text" label="Username" {...f.register("username")} />
                <LabelledInput type="email" label="Email" {...f.register("email")} />
                <LabelledInput type="text" label="Phone" {...f.register("phone")} />
                <Button type="submit">Save</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
