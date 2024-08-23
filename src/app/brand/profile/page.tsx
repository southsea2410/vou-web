"use client";

import BrandNavbar from "../_components/BrandNavbar";
import useGetAccountInfo from "@/services/identity/useAccountInfo";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import LabelledInput from "@/components/global/LabelledInput";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/providers/ClientAuthProvider";
import useUpdateBrandProfile, {
  UpdateBrandProfileRequest,
} from "@/services/identity/useUpdateProfile";
import useGetProfileByAccountId from "@/services/brand/useGetProfileByAccountId";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BrandProfilePage() {
  const { isAuthenticated } = useAuth();

  const { data: account } = useGetAccountInfo({ enabled: isAuthenticated });
  const accountId = account?.result?.id;

  const { data: profileRes, isSuccess: isBrandProfileSuccess } = useGetProfileByAccountId(
    accountId ?? "",
    { enabled: !!accountId },
  );
  const userId = profileRes?.id;

  const f = useForm<UpdateBrandProfileRequest["profile"]>();

  useEffect(() => {
    isBrandProfileSuccess && f.reset(profileRes as never);
  }, [isBrandProfileSuccess, profileRes, f]);

  const { mutate: updateProfile } = useUpdateBrandProfile({
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

    if (userId) data.id = userId;
    else console.warn("[Profile] No userId to update profile");

    data.role = "brand";
    data.status = true;
    updateProfile({ profile: data, userId: userId ?? "" });
  });

  return (
    <div className="min-h-screen">
      <BrandNavbar />
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
                <LabelledInput type="text" label="Field" {...f.register("field")} />
                <LabelledInput type="text" label="Brand Name" {...f.register("brandName")} />
                <div className="flex flex-row space-x-4">
                  <LabelledInput label="Latitude" {...f.register("latitude")} />
                  <LabelledInput label="Longitude" {...f.register("longitude")} />
                </div>
                <LabelledInput type="text" label="Address" {...f.register("address")} />
                <Button type="submit">Save</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
